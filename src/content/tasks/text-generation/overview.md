---
title: "Text Generation"
metaTitle: "Text Generation Overview"
metaDescription: "Overview of how to optimize and deploy a text-generation model on CPUs with DeepSparse"
index: 0
---

# **Overview**

Neural Magic's stack unlocks LLM inference on CPUs.

The stack has three components:
- DeepSparse is a CPU inference runtime which runs sparse-quantized LLMs very fast on CPUs
- Sparsify is a toolkit for applying state of the art model optimization techniques to your LLMs
- SparseZoo is a repository of pre-sparsified LLMs

We currently have end-to-end support the following models and are rapidly expanding the catalog:
- [`salesforce/codegen`](https://huggingface.co/Salesforce/codegen-350M-mono)
- [`facebook/opt`](https://huggingface.co/facebook/opt-6.7b)

### **Get Started**
- [Inference with DeepSparse](inference.md)
- [Optimization with Sparsify](optimization.md)
- [Check out pre-sparsified LLMs in the SparseZoo](https://sparsezoo.neuralmagic.com/?useCase=text_generation)

### **Examples**

<a target="_blank" href="https://colab.research.google.com/github/neuralmagic/docs/blob/docs-refactor-phase1/src/content/tasks/text-generation/codegen-example.ipynb">
  CodeGen Example<img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
