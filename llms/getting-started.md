# **Getting Started**

Get up and running with Neural Magic LLMs! 

This quick tour will show you how to use Neural Magic's stack to run LLMs performantly on CPUs.

## **Installation**
Before your begin, make sure you have all the necessary libraries installed:

```bash
pip install deepsparse[transformers]
```

## **`deepsparse.Pipeline`**

`deepsparse.Pipeline` is the easiest way to use a trained LLM for inference.

We start by creating an instance of `deepsparse.Pipeline` and specifying a model we want to use. For this guide, we will use the `salesforce/codegen-350m-mono` model.
```python
from deepsparse import Pipeline

zoo_stub = "zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none"

pipeline = Pipeline.create(task="text-generation", model_path=zoo_stub)
```

`Pipeline.create()` first downloads a tokenizer and model in ONNX format. Here, we passed a SparseZoo stub as the `model_path`, identifying the relevant model artifacts hosted in [SparseZoo](zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none), Neural Magic's repository of pre-optimized models. Once the artifacts are downloaded, DeepSparse compiles the model to machine code and is now ready to run inference.

We can then use `deepsparse.Pipeline` to generate text:
```python
prompt = "def fibonacci(n):"
output = pipeline(sequences=[prompt])

print(f"{prompt}{output.sequences[0]}")

# >> def fib():
# >>    a, b = 0, 1
# >>    while True:
# >>        yield a
# >>        a, b = b, a + b
```

>> Check out the API reference for more details on using `deepsparse.Pipeline` for text generation

### **Speeding up Inference with Sparsity**

You might be wondering: How is this any different from just running Hugging Face pipelines on CPUs?

`deepsparse.Pipeline` exposes a similiar high-level interface as Hugging Face pipelines, but under the hood uses the DeepSparse Runtime, developed by Neural Magic's HPC engineers, to accelerate inference. The DeepSparse Runtime is especially optimized to gain a performance increase from running sparse-quantized LLMs.

Let's do some benchmarking to quantify the performance gains from running a sparse-quantized model with DeepSparse, using the `deepsparse.benchmark` CLI script. 

SparseZoo hosts both a `dense-fp32` and `50sparse-int8` version of CodeGen, identified by the following stubs ([check out the model cards](https://sparsezoo.neuralmagic.com/?useCase=text_generation&datasets=bigpython_bigquery_thepile&architectures=codegen_mono&subArchitectures=350m&ungrouped=true&sort=null)):

```bash
# dense-fp32 model
zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/base-none
# 50pruned-int8 model
zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none
```

Dense FP32 Throughput:
```bash
deepsparse.benchmark zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/base-none

>> Original Model Path: zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/base-none
>> Batch Size: 1
>> Scenario: sync
>> Throughput (items/sec): 24.1546
>> Latency Mean (ms/batch): 41.3132
```

50Sparse-INT8 Throughput:
```bash
deepsparse.benchmark zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none

>> Original Model Path: zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none
>> Batch Size: 1
>> Scenario: sync
>> Throughput (items/sec): 60.6657
>> Latency Mean (ms/batch): 16.4035
```

We can see that running the optimized `50sparse-int8` model increased the number of tokens/sec from 24 to 61, a **2.5x throughput increase**!