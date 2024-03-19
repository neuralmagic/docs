---
title: Serving LLMs
sidebar_position: 1
---

# Deploy LLMs With DeepSparse

[DeepSparse](https://github.com/neuralmagic/deepsparse) is a CPU inference runtime that takes advantage of sparsity to accelerate neural network inference. Coupled with [SparseML](https://github.com/neuralmagic/sparseml), our optimization library for pruning and quantizing your models, DeepSparse delivers exceptional inference performance on CPU hardware.

Neural Magic supports performant LLM inference in DeepSparse with:
- Sparse kernels for faster inference and memory savings from unstructured sparse weights
- 8-bit weight and activation quantization support
- Efficient management of cached attention keys and values for minimal latency
- Continuous batching to optimize output tokens generation throughput
- Streaming outputs
- OpenAI-compatible API server

![mpt-chat-comparison](https://github.com/neuralmagic/deepsparse/assets/3195154/ccf39323-4603-4489-8462-7b103872aeb3)

Here's a minimal example showing how to use DeepSparse for text generation with `TinyStories-1M`, a very small model for generating stories. 
```python
from deepsparse import TextGeneration
pipeline = TextGeneration(model="hf:mgoin/TinyStories-1M-ds")
print(pipeline("Once upon a time, ").generations[0].text)
"""
One day, a little girl named Lily went to the park with her mommy. They saw a big slide and wanted to slide down the slide. Lily said, "Mommy, can I go on the slide?" Her mommy said, "Yes, you can go on the slide."
"""
```

> Check out the [`TextGeneration` documentation for usage details.](ADD LINK)

### Supported LLM Architectures 

DeepSparse supports many Hugging Face models through [ONNX export through SparseML](./guides/hf-llm-to-deepsparse.mdx), including the following architectures:

* LLaMA & LLaMA-2 - [neuralmagic/Llama2-7b-chat-pruned50-quant-ds](https://huggingface.co/neuralmagic/Llama2-7b-chat-pruned50-quant-ds), [neuralmagic/Nous-Hermes-llama-2-7b-pruned50-quant-ds](https://huggingface.co/neuralmagic/Nous-Hermes-llama-2-7b-pruned50-quant-ds), [neuralmagic/TinyLlama-1.1B-Chat-v0.4-pruned50-quant-ds](https://huggingface.co/neuralmagic/TinyLlama-1.1B-Chat-v0.4-pruned50-quant-ds) - [SparseZoo Models](https://sparsezoo.neuralmagic.com/?architectures=llama2&ungrouped=true)
* Mistral - [neuralmagic/OpenHermes-2.5-Mistral-7B-pruned50-quant-ds](https://huggingface.co/neuralmagic/OpenHermes-2.5-Mistral-7B-pruned50-quant-ds) - [SparseZoo Models](https://sparsezoo.neuralmagic.com/?architectures=mistral&ungrouped=true)
* MPT - [neuralmagic/mpt-7b-chat-pruned50-quant-ds](https://huggingface.co/neuralmagic/mpt-7b-chat-pruned50-quant-ds) - [SparseZoo Models](https://sparsezoo.neuralmagic.com/?architectures=mpt&ungrouped=true)
* OPT - facebook/opt-6.7b, etc. - [SparseZoo Models](https://sparsezoo.neuralmagic.com/?architectures=opt&ungrouped=true)
* SOLAR - [neuralmagic/Nous-Hermes-2-SOLAR-10.7B-pruned50-quant-ds](https://huggingface.co/neuralmagic/Nous-Hermes-2-SOLAR-10.7B-pruned50-quant-ds)


### Making New DeepSparse-Optimized Models

[See the guide for compressing LLMs with SparseGPT](./guides/one-shot-llms-with-sparseml.mdx)


## Offline Batched Inference

A notable feature of the DeepSparse `TextGeneration` class is the availability to specify `continuous_batch_sizes`, which allows for efficient batch processing of multiple prompts simultaneously, optimizing resource usage and accelerating token generation throughput.

This example includes a set of diverse prompts and uses `continuous_batch_sizes=[4]` in order to be able to generate output tokens for 4 of the prompt requests simultaneously.

```python
from deepsparse import TextGeneration

model = TextGeneration(
    model_path="hf:neuralmagic/TinyLlama-1.1B-Chat-v0.4-pruned50-quant-ds",
    continuous_batch_sizes=[4],
)

prompts = [
    "Beneath the ancient oak tree ",
    "In a world where time flows backwards ",
    "When the last star in the universe flickered ",
    "Inside the labyrinth of endless mirrors ",
    "Under the neon lights of a forgotten city ",
    "As the clock struck midnight in the enchanted forest ",
    "Amidst the whispers of a haunted library ",
    "On the edge of a dream, where reality blurs ",
]
outputs = model(prompt=prompts, max_new_tokens=50)

for i, gen in enumerate(outputs.generations):
    print(f"#{i}: {prompts[i]}{gen.text}")
```

## OpenAI-Compatible Server

DeepSparse LLM can be deployed as a server that implements the OpenAI API protocol. This allows DeepSparse to be used as a drop-in replacement for applications using OpenAI API.
By default, it starts the server at `http://localhost:5543`. You can specify the address with `--host` and `--port` arguments. The server currently hosts one model at a time (TinyLlama-Chat in the command below) and implements [list models](https://platform.openai.com/docs/api-reference/models/list), [create chat completion](https://platform.openai.com/docs/api-reference/chat/create), and [create completion](https://platform.openai.com/docs/api-reference/completions/create) endpoints.

Start the server:

```bash
deepsparse.server --task text-generation --integration openai --model_path hf:neuralmagic/TinyLlama-1.1B-Chat-v0.4-pruned50-quant-ds
```

This server can be queried in the same format as OpenAI API. For example, list the models:

```bash
curl http://localhost:5543/v1/models
```

#### Using OpenAI Completions API With DeepSparse

Query the model with input prompts:

```bash
curl http://localhost:5543/v1/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "hf:neuralmagic/TinyLlama-1.1B-Chat-v0.4-pruned50-quant-ds",
        "prompt": "San Francisco is a",
        "max_tokens": 7,
        "temperature": 0
    }'
```

Since this server is compatible with OpenAI API, you can use it as a drop-in replacement for any applications using OpenAI API. For example, another way to query the server is via the `openai` python package:

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:5543/v1", api_key="EMPTY")
model = client.models.list().data[0][1]
print(f"Accessing model API '{model}'")

completion = client.completions.create(model=model, prompt="San Francisco is a")
print("Completion result:", completion)
```

#### Using OpenAI Chat API With DeepSparse

The DeepSparse Server is designed to support the OpenAI Chat API, allowing you to engage in dynamic conversations with the model. The chat interface is a more interactive way to communicate with the model, allowing back-and-forth exchanges that can be stored in the chat history. This is useful for tasks that require context or more detailed explanations.

Querying the model using OpenAI Chat API:

You can use the [create chat completion](https://platform.openai.com/docs/api-reference/chat/create) endpoint to communicate with the model in a chat-like interface:

```bash
curl http://localhost:5543/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "hf:neuralmagic/TinyLlama-1.1B-Chat-v0.4-pruned50-quant-ds",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"}
        ]
    }'
```

For more in-depth examples and advanced features of the chat API, you can refer to the official OpenAI documentation.
