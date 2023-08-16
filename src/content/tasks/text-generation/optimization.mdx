---
title: "Optimization"
metaTitle: "Optimization with Sparsify"
metaDescription: "Create a sparse text generation model with Sparsify" 
index: 2000
---

# **Optimization with Sparsify**

In this guide, we will walk through an example of how to use Neural Magic's stack to sparsify a Text Generation model, using [`Salesforce/codegen-350M-mono`](https://huggingface.co/Salesforce/codegen-350M-mono) as an example.

There are a few steps:
- Export to ONNX
- Apply One Shot Pruning and Quantization
- Inject KV-Cache
- Deploy on CPU with DeepSparse

Make sure you have all the dependencies installed so we can dive in:

```bash
pip install sparsify-nightly==1.6.0.20230815
```

### **ONNX Export**

Start by downloading and exporting the model to ONNX.

```bash
git clone https://huggingface.co/Salesforce/codegen-350M-mono
```

```bash
sparseml.transformers.export_onnx --model_path ./codegen-350M-mono --task text-generation --sequence_length 256
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

### **Run One-Shot**

With the data setup, we are ready to apply `FastOBCQ`. Using Sparsify One-Shot.

First, login via your CLI token:

```bash
sparsify.login {YOUR_CLI_TOKEN}
```

Next, we will create a Recipe to run `FastOBCQ`. For CodeGen-350M-Mono, there is a [premade recipe](https://sparsezoo.neuralmagic.com/models/codegen_mono-350m-bigpython_bigquery_thepile-pruned50_quantized?hardware=deepsparse-c6i.12xlarge&comparison=codegen_mono-350m-bigpython_bigquery_thepile-base&tab=3) available in the SparseZoo:

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
	--model ./fp32-dense/model.onnx \
	--data ./data \
	--recipe ./recipe.yaml
```

### **Evaluate Model Accuracy**

We can evaluate the accuracy of the model using the `deepsparse.transformers.eval_downstream` CLI.
