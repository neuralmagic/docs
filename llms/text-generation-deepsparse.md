# **Text-Generation: Deploy a Model**

In this guide, we will walk through an example of how to use Neural Magic's stack to run LLM infernece with DeepSparse, using [`Salesforce/codegen-350M-mono`](https://huggingface.co/Salesforce/codegen-350M-mono) as an example.

We will walk through two APIs:
- DeepSparse Pipeline
- DeepSparse Server

Make sure you have all the dependencies installed so we can dive in:

```bash
pip install deepsparse-nightly[transformers,server]==1.6.0.20230815
```

## **DeepSparse Pipeline**

DeepSparse Pipelines exposes a similiar high-level interface as Hugging Face pipelines for running LLM inference, but under the hood uses the DeepSparse Runtime, developed by Neural Magic's HPC engineers, to accelerate inference. The DeepSparse Runtime is especially optimized to gain a performance increase from running sparse-quantized LLMs.

### **Basic Usage**

DeepSparse Pipelines has two steps (a) construction and (b) inference.

We construct a Pipeline by passing a task and model path:

```python
from deepsparse import Pipeline

pipeline = Pipeline.create(
    task="text-generation", 
    model_path="zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none")
```

We can then generate text by passing a prompt to the Pipeline:

```python
prompt = "def fibonacci(n):"
output = pipeline(sequences=[prompt])

print(f"{prompt}{output.sequences[0]}")

# >> def fibonacci(n):
# >>   if n < 2:
# >>       return n
# >>   else:
# >>       return fibonacci(n-1) + fibonacci(n-2)
```

### **Configuring Text Generation**

Text generation inference is somewhat simple:
- A prompt (sequence of tokens) is passed to the model and processed (often called "Prefill")
- The model predicts a sequence of tokens one at a time, stopping only by reaching a stop token or a specified maximum length (often called "Decode").

Given this iterative process where we make multple passes through the engine, DeepSparse uses multiple engines for the Prefill and Decode and implements an important optimization called KV-caching, which re-uses the intermediate key and value states during the "Decode" phase of inference.

Let's walk through some arguments to `Pipeline.create()` that can control the KV-cache/Prefill setup and Generation Strategy.

#### **KV Cache / Prefill Configuration**

- `sequence_length` argument controls the maximum size of the KV-cache buffers inside DeepSparse. The total tokens in a prompt + the number of tokens generated should not exceed the `sequence_length`.
- `prompt_processing_sequence_length` controls the sequence length at which the "Prefill" task is run by DeepSparse. For large prompt, the prompt is processed in chunks of this length. The default is 64.In general, this argument should not be modified except for debugging.
- `use_deepsparse_cache` argument controls whether the KV-cache is managed internally by DeepSparse's Runtime or externally in Python. The default is True. In general, this argument should not be modified except for debugging.

#### **Generation Strategy**

In addition to configs above, you can control the generation strategy with the following arguments:

- `deterministic`: controls whether to use randomness during generation. If False, the pipeline will sample from the probability distribution computed from the logits. If True, the pipeline will get the next token by applying an argmax function to the logits.
- `sampling_temperature`: for non-deterministic sampling, this controls temperature to use when sampling from the probability distribution computed from the logits. Higher values will result in more random samples. Should be greater than 0.0.
- `max_generated_tokens`: the maximum number of tokens to generate given the input sequence. Otherwise, it will generate up to the maximum number of tokens or end of sequence is reached.
- `force_max_tokens`: if True, the pipeline will generate the maximum number of tokens supplied even if the stop token is reached.

#### **Example Usage**

Here's a quick example configuring some of these arguments:

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

# >> def fibonacci(n):
# >>    if n < 2:
# >>        return n
# >>    else:
# >>        return fibonacci(n-1) + fibonacci(n-2)
# >>
# >> def fibonacci(n):
# >>    if n < 2:
# >>       return n
# >>    else:
# >>        return fibon        << stopped at exactly 64 tokens generated >>
```

### **Inference API**

#### **Input and Output Formats**

`TextGenerationInput` is a data class which can be passed to the Pipeline to run inference. It has the following fields:
- `sequences` (`str` or `List[str]`): A string or list of strings to provide as prompts to the generative model and return generated text for. Required.
- `return_logits` (`bool`): If True, the pipeline will return the logits for the generated text in addition to the generated text. Default False.
- `fixed_sequences_length` (`bool`): If True, the pipeline will pad all sequences to the same length as the longest sequence in the batch. If False, no padding is applied resulting in variable length sequences across multiple sequences.
- `streamer` (`TextStreamer`): A `TextStreamer` instance to use for streaming text generation. Limited support currently and being phased out in the next release.


`TextGenerationOutput` is a data class which holds the results of a Pipeline:
- `sequences` (`str` or `List[str]`): A single string or list of strings of generated text for the provided prompts.
- `logits` (`None` or `np.ndarray`): A numpy array of logits for the generated text for the provided prompts if `return_logits` is set.
- `session_id`: Not currently supported

#### **Example Usage**

Here's a quick example configuring some of these arguments:

```python
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

A `TextStreamer` can be passed to DeepSparse to enable printing tokens iteratively to the command line.

Here's a quick example:

```python
from transformers import TextStreamer

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

### **Basic Usage**

We spin up a server by passing a task and model path (which can be a path to a local deployment directory or a SparseZoo stub):

```bash
deepsparse.server --task text-generation --model_path zoo:nlg/text_generation/codegen_mono-350m/pytorch/huggingface/bigpython_bigquery_thepile/pruned50_quant-none
```

Run `deepsparse.server --help` to see the full list of arguments.

Make a request over HTTP:

```bash
curl -X POST "http://localhost:5543/predict" -H "Content-Type: application/json" -d '{"sequences": "def fib(n):"}'
```

### **Configuring The Server**

We can use a Server configuration file to pass configuration arguments to the constructor.

A configuration file looks like the following:

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

Spin up with the following:

```bash
deepsparse.server --config-file config.yaml
```

Request with the following (note that we call the `/generate` endpoint):

```bash
curl -X POST "http://localhost:5543/generate" -H "Content-Type: application/json" -d '{"sequences": "def fib(n):"}'
```

## **Next Steps**
- [Learn more about how to sparsify an LLM with Sparsify One-Shot]() **--UPDATE-- WITH LINK**
- [Check out our pre-sparsified LLMs in SparseZoo](https://sparsezoo.neuralmagic.com/?useCase=text_generation)