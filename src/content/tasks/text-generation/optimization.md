---
title: "Optimization"
metaTitle: "Optimization with Sparsify"
metaDescription: "Create a sparse text generation model with Sparsify" 
index: 2000
---

# **Optimization with Sparsify**

In this guide, we will walk through an example of how to use Neural Magic's stack to sparsify a text generation model, using [`Salesforce/codegen-350M-mono`](https://huggingface.co/Salesforce/codegen-350M-mono) as an example.

There are a few steps:
- Export to ONNX
- Apply One Shot Pruning and Quantization
- Evaluate Accuracy
- Inject KV Cache to Run Inference

Make sure you have all the dependencies installed:

```bash
pip install sparsify-nightly==1.6.0.20230817
pip install deepsparse-nightly==1.6.0.20230817[transformers] --upgrade
pip install torch --index-url https://download.pytorch.org/whl/cpu
```

Authenticate via the CLI:
```bash
sparsify.login {YOUR_CLI_TOKEN}
```

If you have not made a Sparsify account, sign up on the [web app](https://account.neuralmagic.com/signup) to obtain your CLI credentials.

## **ONNX Export**

Start by downloading and exporting the model to ONNX.

```bash
git clone https://huggingface.co/Salesforce/codegen-350M-mono
```

```bash
sparseml.transformers.export_onnx --model_path ./codegen-350M-mono --task text-generation --sequence_length 256
mv ./deployment ./dense-fp32
```

## **Apply One-Shot**

We will next optimize the model by applying pruning and quantization, using Sparsify, Neural Magic's model optimization toolkit.

For compressing LLMs, we will use a post-training algorithm called `FastOBCQ`, which we can apply using the `sparsify.run one-shot` pathway.

### **Format Dataset**

`FastOBCQ` uses calibration data during the pruning and quantization process. In this case, we will use the [`codeparrot/apps`](https://huggingface.co/datasets/codeparrot/apps) dataset as the calibration data.

The Sparsify One-Shot pathway requires preprocessed data to be passed as a folder holding `.npz` files.

Run the following to pre-process the dataset:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from datasets import load_dataset
import json

SAMPLES = 1000
SEQUENCE_LENGTH = 256

model_path = "./codegen-350M-mono"
model = AutoModelForCausalLM.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(model_path)

dataset = load_dataset("codeparrot/apps")
def preprocess_function(examples):
    text = ""
    for solution in json.loads(examples["solutions"]):
      text += solution
      text += "\n"
    
    return tokenizer(text, truncation=True, max_length=256, return_tensors="pt")

ds_sampled = dataset["train"].shuffle(seed=42).select(range(SAMPLES + 100)).with_format("torch")
tokenized_dataset = ds_sampled.map(
    preprocess_function,
    batched=False,
).filter(lambda example: example["input_ids"].shape[1] == SEQUENCE_LENGTH).select(range(SAMPLES))

print(tokenized_dataset["input_ids"].shape)

# >>> 1000,256
```

Run the following to format and save the data as NPZ:

```bash
mkdir data
```

```python
import numpy as np
import torch
from torch import Tensor

# numpy exporter helper
class NumpyExportWrapper(torch.nn.Module):
    def __init__(self, model):
        super(NumpyExportWrapper, self).__init__()
        self.model = model
        self.model.eval()  # Set model to evaluation mode
        self.numpy_data = []

    def forward(self, *args, **kwargs):
        with torch.no_grad():
            inputs = {}
            batch_size = 0

            for index, arg in enumerate(args):
                if isinstance(arg, Tensor):
                    inputs[f"input_{index}"] = arg
                    batch_size = arg.size[0]

            for key, val in kwargs.items():
                if isinstance(val, Tensor):
                    inputs[key] = val
                    batch_size = val.shape[0]

            start_index = len(self.numpy_data)
            for _ in range(batch_size):
                self.numpy_data.append({})

            for input_key in iter(inputs):
              for idx, input in enumerate(inputs[input_key]):
                  self.numpy_data[start_index+idx][input_key] = input

            # return self.model(*args, **kwargs)

    def save(self, path: str = "data"):
        for index, item in enumerate(self.numpy_data):
            npz_file_path = f'{path}/input{str(index).zfill(4)}.npz'
            np.savez(npz_file_path, **item)

        print(f'Saved {len(self.numpy_data)} npz files to {path}')


# wrap model with numpy exporter
model = NumpyExportWrapper(model)

# format as numpy
for data in tokenized_dataset:
    input_ids = data["input_ids"]
    attention_mask = data["attention_mask"]
    model(input_ids=input_ids, attention_mask=attention_mask)

# save to ./data
model.save()

# Saved 1000 npz files to data
```

### **Run FastOBCQ**

With the data setup, we are ready to apply `FastOBCQ` using Sparsify One-Shot.

First, we will create a Recipe to run `FastOBCQ`. Recipes specify the algorithm to apply as well as the hyperparameters to use during the pruning and quantization process. For CodeGen-350M-Mono, there is a [premade recipe](https://sparsezoo.neuralmagic.com/models/codegen_mono-350m-bigpython_bigquery_thepile-pruned50_quantized?hardware=deepsparse-c6i.12xlarge&comparison=codegen_mono-350m-bigpython_bigquery_thepile-base&tab=3) available in the SparseZoo:

```yaml
!FastOBCQModifier
  target_sparsity: 0.5
  block_size: 128
  layers_per_gpu: 8
  supported_ops: ['MatMul']
  omit_edge_layers: True
  mse:
      norm: 2.4
      grid: 100
      max_shrink: 0.8
  scheme:
      input_activations:
          num_bits: 8
          symmetric: False
      weights:
          num_bits: 8
          symmetric: True
  scheme_overrides:
      Gemm:
          input_activations:
              num_bits: 8
              symmetric: True
  ignore: ['ReduceMean', 'Tanh', 'Softmax', 'Equal', 'Pow', 'Add', 'Sub', 'Div', 'Neg', 'Softmax', 'ConstantOfShape', 'Constant', 'Sqrt', 'Mul', 'Gather']
  quantize_non_obq_weights: False
```

Save the recipe to a YAML file called `recipe.yaml`. Apply the recipe with the following:

```bash
sparsify.run one-shot \
    --use-case text-generation \
	--model ./dense-fp32/model.onnx \
	--data ./data \
	--recipe ./recipe.yaml
```

This will take a couple hours to run. The resulting ONNX model will be saved in a directory called `./deployment`.

Let's copy over the tokenizer and configuration files from `./dense-fp32`:

```bash
cp -r dense-fp32 50sparse-int8
mv deployment/model.onnx 50sparse-int8/model.onnx
rm -rf deployment
```

## **Evaluate Model Accuracy**

We can evaluate the accuracy of the model using the `deepsparse.transformers.eval_downstream` CLI, which allows us to compute perplexity.

Run the following to evaluate the dense-fp32 model:

```bash
deepsparse.transformers.eval_downstream ./dense-fp32 --dataset openai_humaneval
```

We can see it achieves perplexity of 3.61


Run the following to evaluate the 50sparse-int8 model:
```bash
deepsparse.transformers.eval_downstream ./50sparse-int8 --dataset openai_humaneval
```

We can see that it remains accurate, with perpelxity of 3.90

## **Inject KV Cache to Run Inference With DeepSparse**

With validation complete, we can now inject the KV-caching mechanism into the ONNX graph to enable performant inference with DeepSparse.

We can use the following script to do so:

```python
# inject-kv-cache.py

import click
import os
import onnx
from sparseml.exporters.kv_cache_injector import KeyValueCacheInjector
@click.command()
@click.option('--input-file', help='Path to the input ONNX model file')
@click.option('--output-file', help='Output path for the modified model')
def modify_model(input_file, output_file):
    model = onnx.load(input_file, load_external_data=False)
    model = KeyValueCacheInjector(os.path.dirname(input_file)).apply(model)
    onnx.save(model, output_file)
    print(f"Modified model saved to: {output_file}")
if __name__ == '__main__':
    modify_model()
```

Run the following:

```bash
cp -r 50sparse-int8 50sparse-int8-kv_cache
python3 inject-kv-cache.py --input_file 50sparse-int8/model.onnx 50sparse-int8-kv_cache/model.onnx
```

Now, we can run inference with DeepSparse using the following:

```python
from deepsparse import Pipeline

pipeline = Pipeline.create(
    task="text-generation", 
    model_path="./50sparse-int8-kv_cache",
    max_generated_tokens=128)

prompt = "def fib(n):"
output = pipeline(sequences=prompt)
print(f"{prompt}{output.sequences[0]}")
```

```bash
>> def fib(n):
>>    if n == 0:
>>        return 0
>>    if n == 1:
>>        return 1
>>    return fib(n-1) + fib(n-2)
```

## **Next Steps**
- [Run LLM inference with DeepSparse](inference.md)
- [Check out our pre-sparsified LLMs in SparseZoo](https://sparsezoo.neuralmagic.com/?useCase=text_generation)

<a target="_blank" href="https://colab.research.google.com/github/neuralmagic/docs/blob/docs-refactor-phase1/src/content/tasks/text-generation/codegen-example.ipynb">
  CodeGen Example <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>