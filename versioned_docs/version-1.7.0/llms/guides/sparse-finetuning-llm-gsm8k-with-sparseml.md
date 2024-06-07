---
tags:
- sparse fine-tuning
- Llama2 7B
- llm
- text generation
- sparseml
- optimization
- neural magic
- GSM8K dataset
keywords:
- sparse fine-tuning
- Llama2 7B
- SparseML
- GSM8K dataset
description: Guide on sparse fine-tuning Llama2 7B model on GSM8K dataset, including steps, commands, and recipes for optimization.
sidebar_label: Sparse Fine-Tuning LLMs on GSM8k
sidebar_position: 4
---

# Sparse Fine-Tuning Llama2 7B on GSM8k

This guide details the steps for going from a pre-trained, unoptimized Llama2 7B model to a 50% sparse Llama2 7B model that has been fine-tuned on the GSM8K dataset and recovers fully and goes beyond the dense baseline accuracy. 

## Overview
- [Dense fine-tuning](#dense-fine-tuning): Finetune the pre-trained, unoptimized Llama2 7B model on the [GSM8K dataset](https://huggingface.co/datasets/gsm8k) from HuggingFace.
- [Oneshot Sparsification](#oneshot-sparsification): Oneshot sparsify the dense fine-tuned model to 50% sparsity.
- [Sparse finetuning](#sparse-fine-tuning): Further fine-tune the oneshot 50% sparse model on the GSM8K dataset to recover some of the accuracy that is lost during the oneshot sparsification step.

## Prerequisites

- <b>Training Environment:</b> A system that meets the minimum hardware and software requirements as outlined in the [Install Guide](/get-started/install/sparseml#prerequisites). To replicate the setup used for fine-tuning in this guide, use 4 NVIDIA A100 80 GB GPUs for both dense and sparse fine-tuning steps and a system with at least 16 GB memory. 
- <b>SparseML LLM Installation:</b> An environment with SparseML for LLMs installed as outlined in the [Install Guide](/get-started/install/sparseml#generative-ai-hugging-face).
- <b>Background:</b> Familiarity with Generative AI and working with large language models is recommended.

## Base Model
To obtain an optimized sparse model trained on the GSM8K dataset, we first start with the pre-trained, unoptimized [Llama2 7B model from HuggingFace](https://huggingface.co/meta-llama/Llama-2-7b-hf): 
```
meta-llama/Llama-2-7b-hf
```

## Dense fine-tuning
We fine-tune the above pre-trained dense model on the GSM8K dataset to obtain a model that we can later optimize using sparsification.
```bash
accelerate launch \
    --config_file example_fsdp_config.yaml \
    --no_python sparseml.transformers.text_generation.finetune \
    --model meta-llama/Llama-2-7b-hf \
    --dataset "gsm8k" \
    --dataset_config_name "main" \
    --output_dir PATH_TO_OUTPUT \
    --splits "train" \
    --num_train_epochs 2 \
    --precision "bfloat16" \
    --gradient_checkpointing True \
    --bf16 True \
    --learning_rate 0.00005 \
    --lr_scheduler_type "linear" \
    --max_seq_length 1024 \
    --per_device_train_batch_size 32 \
    --max_grad_norm 2 \
    --warmup_steps 20
```
Note: *Some of these hyper-parameters may need further tuning to enhance the overall accuracy of the fine-tuned model. The values mentioned above were obtained through a quick hyper-parameter search. Parameters that could have a significant impact and are worth considering for tuning include: `learning_rate`, `max_grad_norm`, `warmup_steps`, `max_seq_length`.*

The example_fsdp_config.yaml used above contains the following setup for FSDP. Set the `num_processes` to the number of GPUs available. For our setup, we used 4 NVIDIA A100 80 GB GPUs so we set `num_processes` to `4`. 
```yaml
compute_environment: LOCAL_MACHINE
debug: false
distributed_type: FSDP
downcast_bf16: 'no'
fsdp_config:
  fsdp_auto_wrap_policy: TRANSFORMER_BASED_WRAP
  fsdp_backward_prefetch_policy: BACKWARD_PRE
  fsdp_cpu_ram_efficient_loading: false
  fsdp_forward_prefetch: false
  fsdp_offload_params: false
  fsdp_sharding_strategy: 1
  fsdp_state_dict_type: SHARDED_STATE_DICT
  fsdp_sync_module_states: true
  fsdp_use_orig_params: false
machine_rank: 0
main_training_function: main
mixed_precision: bf16
num_machines: 1
num_processes: 4
rdzv_backend: static
same_network: true
tpu_env: []
tpu_use_cluster: false
tpu_use_sudo: false
use_cpu: false
```

### Dense finetuned model accuracy
[Evaluating](#evaluation-setup) the dense fine-tuned model on the `gsm8k 0-shot` task, results in a baseline accuracy of `37.52%`. We'll consider this accuracy as our baseline for calculating recovery for the oneshot sparse and sparse fine-tuned models we'll get later. Detailed results are provided below:
```json
{
  "results": {
    "gsm8k": {
      "acc": 0.3752843062926459,
      "acc_stderr": 0.013337170545742932
    }
  },
  "versions": {
    "gsm8k": 0
  },
  "config": {
    "model": "sparseml",
    "model_args": "pretrained=/cache/shubhra/gsm8k_tutorial/scripts/models/llama7b_dense_gsm8k_linear_e2_gc2_lr5e-5_gpus4/,trust_remote_code=True",
    "num_fewshot": 0,
    "batch_size": "48",
    "batch_sizes": [],
    "device": "cuda:0",
    "no_cache": true,
    "limit": null,
    "bootstrap_iters": 100000,
    "description_dict": {}
  }
}
```

## Oneshot Sparsification
Use the dense fine-tuned model obtained above and sparsify it to 50% in a oneshot manner using the command and recipe specified below.

Command:
```bash
sparseml.transformers.text_generation.oneshot \
    --model PATH_TO_MODEL \
    --dataset "gsm8k" \
    --dataset_config_name "main" \
    --recipe PATH_TO_RECIPE \
    --output_dir PATH_TO_OUTPUT \
    --splits "train" \
    --pad_to_max_length False \
    --oneshot_device DEVICE \
    --num_calibration_samples 1024 \
    --max_seq_len 4096
```
Note: *You may wish to tweak the `num_calibration_samples` above to obtain better accuracy.*

Recipe:
```yaml
pruning_stage:
  obcq_modifiers:
    SparseGPTModifier:
      sparsity: 0.5
      block_size: 128
      sequential_update: False
      quantize: False
      targets: [
        "re:model.layers.\\d+$"
      ]
```
Note: *The recipe above uses SparseGPT to oneshot sparsify the model to a uniform sparsity of 50% as specified by the `sparsity` param.*

Alternatively, you could use non-uniform sparsity distribution centered around 50% to oneshot sparsify your model by using the modified recipe below.

```bash
pruning_stage:
  obcq_modifiers:
    SparseGPTModifier:
      sparsity: 0.5
      sparsity_profile: "OWL"
      owl_m: 5
      owl_lmbda: 0.08
      block_size: 128
      sequential_update: False
      quantize: False
      targets: [
        "re:model.layers.\\d+$"
      ]
```
To learn more about the OWL non-uniform sparsity profile method, visit [this link](https://github.com/luuyin/OWL/tree/main?tab=readme-ov-file#script-example-of-pruning-llama-7b-using-owl-sparsegpt).

### Oneshot 50% sparse model accuracy
[Evaluating](#evaluation-setup) the oneshot 50% sparse model on the `gsm8k 0-shot` task, results in an accuracy of `33.13%` and translates to a `88.29%` recovery over our [dense baseline](#dense-finetuned-model-accuracy). In the next step we'll see how to improve the recovery of this model using sparse fine-tuning. Detailed results for the oneshot 50% sparse model are provided below:
```json
{
  "results": {
    "gsm8k": {
      "acc": 0.33131159969673996,
      "acc_stderr": 0.012964999679688661,
    }
  },
  "versions": {
    "gsm8k": 0
  },
  "config": {
    "model": "sparseml",
    "model_args": "pretrained=/cache/shubhra/gsm8k_tutorial/scripts/models/llama7b_oneshot_sparse_oneshot_linear_e2_gc2_lr5e-5,trust_remote_code=True",
    "num_fewshot": 0,
    "batch_size": "48",
    "batch_sizes": [],
    "device": "cuda:0",
    "no_cache": true,
    "limit": null,
    "bootstrap_iters": 100000,
    "description_dict": {}
  }
}
```

## Sparse fine-tuning
The one-shot sparse model generated previously can undergo further sparse fine-tuning to enhance its overall accuracy. This process involves distilling information from the previously obtained dense fine-tuned model, which serves as the teacher model, to the one-shot sparse model, acting as the student. This can be achieved using the following command and recipe.

Command:
```bash
accelerate launch \
    --config_file example_fsdp_config.yaml \
    --no_python sparseml.transformers.text_generation.finetune \
    --model PATH_TO_MODEL \
    --dataset "gsm8k" \
    --dataset_config_name "main" \
    --output_dir PATH_TO_OUTPUT \
    --splits "train" \
    --num_train_epochs 2 \
    --precision "bfloat16" \
    --gradient_checkpointing True \
    --bf16 True \
    --learning_rate 0.00005 \
    --lr_scheduler_type "linear" \
    --max_seq_length 1024 \
    --per_device_train_batch_size 16 \
    --max_grad_norm 0 \
    --warmup_steps 20 \
    --distill_teacher PATH_TO_TEACHER \
    --recipe PATH_TO_RECIPE 
```

Recipe:
```yaml
test_stage:
  pruning_modifiers:
    ConstantPruningModifier:
      targets: [
        "re:.*self_attn.q_proj",
        "re:.*self_attn.k_proj",
        "re:.*self_attn.v_proj",
        "re:.*self_attn.o_proj",
        "re:.*mlp.gate_proj",
        "re:.*mlp.up_proj"
      ]
      start: 0
  distillation_modifiers:
    OutputDistillationModifier:
      targets: [
        "model.embed_tokens",
        "model.layers.0",
        "model.layers.1",
        "model.layers.2",
        "model.layers.3",
        "model.layers.4",
        "model.layers.5",
        "model.layers.6",
        "model.layers.7",
        "model.layers.8",
        "model.layers.9",
        "model.layers.10",
        "model.layers.11",
        "model.layers.12",
        "model.layers.13",
        "model.layers.14",
        "model.layers.15",
        "model.layers.16",
        "model.layers.17",
        "model.layers.18",
        "model.layers.19",
        "model.layers.20",
        "model.layers.21",
        "model.layers.22",
        "model.layers.23",
        "model.layers.24",
        "model.layers.25",
        "model.layers.26",
        "model.layers.27",
        "model.layers.28",
        "model.layers.29",
        "model.layers.30",
        "model"
      ]
      comparison: "square_head"
      start: 0
      orig_scale: 1.0
      distill_scale: 1.0
```
Note: *Some of these hyper-parameters may need further tuning to enhance the overall accuracy of the fine-tuned model. The values mentioned above were obtained through a quick hyper-parameter search. Parameters that could have a significant impact and are worth considering for tuning include: `learning_rate`, `max_grad_norm`, `warmup_steps`, `max_seq_length`.*

### Fine-tuned 50% sparse model accuracy
[Evaluating](#evaluation-setup) the fine-tuned 50% sparse model on the `gsm8k 0-shot` task, results in an accuracy of `38.05%` and shows clear improvement over the [oneshot accuracy](#oneshot-50%-sparse-model-accuracy). The sparse fine-tuning step not only helped improve over the oneshot accuracy but even surpassed the dense baseline model. Detailed results for the oneshot 50% sparse model are provided below:
```json
{
  "results": {
    "gsm8k": {
      "acc": 0.38059135708870356,
      "acc_stderr": 0.013373971277729818
    }
  },
  "versions": {
    "gsm8k": 0
  },
  "config": {
    "model": "sparseml",
    "model_args": "pretrained=/cache/shubhra/gsm8k_tutorial/scripts/models/llama7b_sparse_gsm8k_linear_e2_gc0_lr5e-5,trust_remote_code=True",
    "num_fewshot": 0,
    "batch_size": "48",
    "batch_sizes": [],
    "device": "cuda:0",
    "no_cache": true,
    "limit": null,
    "bootstrap_iters": 100000,
    "description_dict": {}
  }
}
```

## Evaluation Setup
To evaluate model performance we use [lm-evaluation-harness framework](https://github.com/neuralmagic/lm-evaluation-harness).
Make a fresh environment for evaluation and follow the steps below in the order specified: 
```bash
git clone https://github.com/neuralmagic/lm-evaluation-harness.git
cd lm-evaluation-harness
pip install -e .
pip uninstall transformers -y
pip install sparseml[transformers,torch]
```
Evaluate on the `gsm8k 0-shot` task:
```bash
MODEL_PATH=<MODEL_PATH>
TASK=gsm8k
python main.py \
 --model sparseml \
 --model_args pretrained=${MODEL_PATH},trust_remote_code=True \
 --tasks $TASK \
 --batch_size 48 \
 --no_cache \
 --write_out \
 --output_path "${MODEL_PATH}/${TASK}.json" \
 --device "cuda:0" \
 --num_fewshot 0
```
