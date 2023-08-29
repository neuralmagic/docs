---
title: "Inference"
metaTitle: "Inference with DeepSparse"
metaDescription: "Run inference on a sparse text generation model with DeepSparse" 
index: 1000
---

# **Inference With DeepSparse**

This guide walks through an example of how to use Neural Magic's stack to run text generation inference with DeepSparse. Using [`Salesforce/codegen-350M-mono`](https://huggingface.co/Salesforce/codegen-350M-mono) as an example, we will review three APIs:
- **[DeepSparse Pipeline](#deepsparse-pipeline)** exposes a simple API for generating text with DeepSparse
- **[DeepSparse Server](#deepsparse-server)** enables you to spin up a REST server running DeepSparse
- **[DeepSparse Benchmarking](#deepsparse-benchmarking)** demonstrates the performance speedup from running sparse-quantized models with DeepSparse

Make sure you have all the dependencies installed before diving in:

```bash
pip install deepsparse-nightly==1.6.0.20230817[transformers,server]
```

## **DeepSparse Pipelines**

DeepSparse Pipelines expose a similiar high-level API to Hugging Face Pipelines for generating text. Under the hood, however, DeepSparse Pipelines use the DeepSparse Runtime to accelerate inference. Developed by Neural Magic's HPC engineers, DeepSparse Runtime is highly optimized to accelerate performance by taking advantage of sparsity and quantization.

**[DeepSparse Benchmarking](#deepsparse-benchmarking)** shows the performance advantage from running sparse-quantized models with DeepSparse.

### **Reviewing Basic Usage**

DeepSparse Pipelines have two steps: construction and inference.

You construct a pipeline by passing a task and model path:

```python
from deepsparse import Pipeline

pipeline = Pipeline.create(
    task="text-generation", 
    model_path="zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none")
```

You can then generate text by passing a prompt to the pipeline:

```python
prompt = "def fibonacci(n):"
output = pipeline(sequences=[prompt])

print(f"{prompt}{output.sequences[0]}")
```
```bash
>> def fibonacci(n):
>>   if n < 2:
>>       return n
>>   else:
>>       return fibonacci(n-1) + fibonacci(n-2)
```

### **Configuring Text Generation**

Text generation inference is somewhat simple:
- A prompt is passed by the user to the model and processed ("Prefill")
- The model then predicts a sequence of tokens, one at a time, stopped by reaching a stop token or a maximum length ("Decode").

Given an iterative process with multple passes through the engine, DeepSparse uses separate engines for the Prefill and Decode stages. DeepSparse implements an important optimization called KV-caching, which re-uses the intermediate key and value states during the Decode phase of inference.

Let's walk through `Pipeline.create()` arguments that can control the KV-cache/Prefill setup and generation strategy.

#### **KV Cache / Prefill Configuration**

- `sequence_length` controls the maximum size of the KV-cache buffers inside DeepSparse. The total tokens in a prompt plus the number of tokens generated should not exceed the `sequence_length`.
- `prompt_processing_sequence_length` controls the sequence length at which the Prefill task is run by DeepSparse. For a large prompt, the prompt is processed in chunks of this length. The default is 64. In general, this argument should not be modified except for debugging.
- `use_deepsparse_cache` controls whether the KV-cache is managed internally by DeepSparse Runtime or externally in Python. The default is True to manage the KV-cache with DeepSparse Runtime. In general, this argument should not be modified except for debugging.

#### **Generation Strategy**

In addition to the configurations above, you can control the generation strategy with these arguments:

- `deterministic` controls whether or not to use randomness during generation. If False, the pipeline will sample from the probability distribution computed from the logits. If True, the pipeline will get the next token by applying an argmax function to the logits.
- `sampling_temperature`, for non-deterministic sampling, controls temperature to use when sampling from the probability distribution computed from the logits. Higher values will result in more random samples. The value should be greater than 0.0.
- `max_generated_tokens` indicates the maximum number of tokens to generate given the input sequence. Otherwise, it will generate up to the maximum number of tokens or until the end of sequence is reached.
- `force_max_tokens`, if True, indicates the pipeline will generate the maximum number of tokens supplied even if the stop token is reached.

#### **Example Usage**

This example configures some of these arguments:

```python
from deepsparse import Pipeline

pipeline = Pipeline.create(
    task="text-generation", 
    model_path="zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none",
    sequence_length=128,        # kv cache buffers up to 128
    max_generated_tokens=64,    # max tokens generated up to 64
    force_max_tokens=True       # enforces we generate exactly 64 inferences
)

prompts = ["def fibonacci(n):"]
output = pipeline(sequences=prompts)
print(f"{prompts[0]}{output.sequences[0]}")
```
```bash
>> def fibonacci(n):
>>    if n < 2:
>>        return n
>>    else:
>>        return fibonacci(n-1) + fibonacci(n-2)
>>
>> def fibonacci(n):
>>    if n < 2:
>>       return n
>>    else:
>>        return fibon        << stopped at exactly 64 tokens generated >>
```

### **Inference API**

Let's walk through the arguments that can be passed to the `TextGenerationPipeline` for inference.

#### **Input and Output Formats**

`TextGenerationInput` is a data class that can be passed to the pipeline to run inference. It has the following fields:
- `sequences` (`str` or `List[str]`) is a required string or list of strings to provide as prompts to the generative model and return generated text.
- `return_logits` (`bool`), if True, indicates the pipeline will return the logits for the generated text in addition to the generated text. The default is False.
- `fixed_sequences_length` (`bool`), if True, indicates the pipeline will pad all sequences to the same length as the longest sequence in the batch. If False, no padding is applied, resulting in variable length sequences across multiple sequences.
- `streamer` (`TextStreamer`) is a `TextStreamer` instance to use for streaming text generation. Currently, this field has limited support and is being phased out in the next release.

`TextGenerationOutput` is a data class that holds the results of a pipeline:
- `sequences` (`str` or `List[str]`) is a single string or list of strings of generated text for the provided prompts.
- `logits` (`None` or `np.ndarray`) is a numpy array of logits for the generated text for the provided prompts if `return_logits` is set.
- `session_id` is not currently supported

#### **Example Usage**

Here's an example using some of these arguments:

```python
from deepsparse import Pipeline

pipeline = Pipeline.create(
    task="text-generation", 
    model_path="zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none",
    max_generated_tokens=64,
)

# passing a single prompt, get back list of sequences of length 1
output = pipeline(sequences="def fib()")
print(output.__dict__.keys())   # dict_keys(['sequences', 'logits', 'session_id'])
print(type(output.sequences))   # <class 'list'>
print(len(output.sequences))    # 1
print(type(output.logits))      # <class 'NoneType'>

# passing N prompts, get back list of sequences of length N
output = pipeline(sequences=["def fib()"]*5)
print(len(output.sequences))    # 5

# pass return_logits=True, get back the logits in the output
output = pipeline(sequences=["def fib()"]*2, return_logits=True)
print(output.logits.shape)      # (2, 66, 51200)
```

#### **Streamer Usage**

A `TextStreamer` can be passed to DeepSparse to enable printing tokens iteratively to the command line. An example is:

```python
from transformers import TextStreamer
from deepsparse import Pipeline

pipeline = Pipeline.create(
    task="text-generation", 
    model_path="zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none",
    max_generated_tokens=64,
)

output = pipeline(sequences="fib(n):", streamer=TextStreamer(pipeline.tokenizer))

# >>> prints tokens to command line as they are generated
```

## **DeepSparse Server**

DeepSparse Server wraps the DeepSparse Pipeline API with a FastAPI REST Server, making it easy to stand up a model serving endpoint running DeepSparse.

### **Reviewing Basic Usage**

You spin up a server by passing a task and model path, which can be a path to a local deployment directory or a SparseZoo stub:

```bash
deepsparse.server --task text-generation --model_path zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none
```

Run `deepsparse.server --help` to see the full list of arguments.

Make a request over HTTP:

```bash
curl -X POST "http://localhost:5543/predict" -H "Content-Type: application/json" -d '{"sequences": "def fib(n):"}'
```

### **Configuring the Server**

You can use a Server configuration file to pass configuration arguments to the constructor. A configuration file looks like:

```yaml
# config.yaml

endpoints:
    - task: text-generation
      model: zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none
      route: /generate
      name: text-generation
      kwargs:
        sequence_length: 256
        max_generated_tokens: 32
        force_max_tokens: True
        deterministic: False
```

Spin up with:

```bash
deepsparse.server --config-file config.yaml
```

Request with the following (note that you call the `/generate` endpoint):

```bash
curl -X POST "http://localhost:5543/generate" -H "Content-Type: application/json" -d '{"sequences": "def fib(n):"}'
```

## **DeepSparse Benchmarking**

Let's do some benchmarking to quantify the performance gains from running a sparse-quantized model with DeepSparse using the `deepsparse.benchmark` CLI script. 

SparseZoo hosts both `dense-fp32` and `50sparse-int8` versions of CodeGen, identified by the following stubs ([model cards](https://sparsezoo.neuralmagic.com/?useCase=text_generation&datasets=bigpython_bigquery_thepile&architectures=codegen_mono&subArchitectures=350m&ungrouped=true&sort=null)):

```bash
# dense-fp32 model
zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/base-none

# 50pruned-int8 model
zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none
```

Dense FP32 throughput:
```bash
deepsparse.benchmark zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/base-none
```
```bash
>> Original Model Path: zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/base-none
>> Batch Size: 1
>> Scenario: sync
>> Throughput (items/sec): 24.1546
>> Latency Mean (ms/batch): 41.3132
```

50Sparse-INT8 throughput:
```bash
deepsparse.benchmark zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none
```
```bash
>> Original Model Path: zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none
>> Batch Size: 1
>> Scenario: sync
>> Throughput (items/sec): 60.6657
>> Latency Mean (ms/batch): 16.4035
```

Running the optimized `50sparse-int8` model increased the number of tokens/sec from 24 to 61&mdash;a **2.5x throughput increase**!

## **Learn More About ...**
- [Optimizing an LLM with Sparsify](optimization.md)
- [N pre-sparsified LLMs in SparseZoo](https://sparsezoo.neuralmagic.com/?useCase=text_generation)

## **Examples**

|Model      | Description  | Link |
|-----------|--------------|------|
|CodeGen    | Apply pruning and quantization with one-shot; run inference with DeepSparse |<a target="_blank" href="https://colab.research.google.com/github/neuralmagic/docs/blob/docs-refactor-phase1/src/content/tasks/text-generation/codegen-example.ipynb"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a> |
|OPT | Apply pruning and quantization with one-shot; run inference with DeepSparse | Coming soon |
