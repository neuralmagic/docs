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
sidebar_label: Sparse Fine-Tuning LLMs
sidebar_position: 4
---

# Sparse Fine-Tuning Llama2 7B

## Overview
 - Finetune Llama2 7B using a dataset from HuggingFace - GSM8K in this example
 - Oneshot sparsify the dense fine-tuned model
 - Fine-tune the sparsified model

## Step 0
For obtaining an optimized sparse model that has been trained on the GSM8K dataset, we first start with the pretrained dense Llama2 7B model. 
This model can be obtained using the following SparseZoo stub: 
```
zoo:llama2-7b-llama2_pretrain-base
```

## Step 1
We then fine-tune the above pretrained dense model on the GSM8K dataset to obtain a model that we can later optimize using sparsification.
```bash
accelerate launch 
    --config_file example_fsdp_config.yaml 
    --no_python sparseml.transformers.text_generation.finetune
    --model PATH_TO_MODEL or ZOO_STUB
    --dataset gsm8k
    --dataset_config_name "main"
    --output_dir PATH_TO_OUTPUT
    --splits "train"
    --num_train_epochs 2
    --precision "bfloat16"
    --gradient_checkpointing True
    --bf16 True
    --learning_rate 0.00005
    --lr_scheduler_type "linear"
    --max_seq_length 1024
    --per_device_train_batch_size 32
    --max_grad_norm 2
    --warmup_steps 20
```
Note: *Some of these hyper-parameters may need further tuning to enhance the overall accuracy of the fine-tuned model. The values mentioned above were obtained through a quick hyper-parameter search. Parameters that could have a significant impact and are worth considering for tuning include: `learning_rate`, `max_grad_norm`, `warmup_steps`, `max_seq_length`.*

The example_fsdp_config.yaml used above contains the following setup for FSDP. Set the `num_processes` to the number of GPUs available. 
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
num_processes: NUM_GPUS
rdzv_backend: static
same_network: true
tpu_env: []
tpu_use_cluster: false
tpu_use_sudo: false
use_cpu: false
```

## Step 2
Use the dense fine-tuned model obtained above and sparsify it to 50% in a oneshot manner using the command and recipe specified below.

Command:
```bash
accelerate launch 
    --config_file example_fsdp_config.yaml 
    --no_python sparseml.transformers.text_generation.oneshot
    --model PATH_TO_MODEL
    --dataset gsm8k
    --dataset_config_name "main"
    --concatenate_data OPTIONAL
    --recipe PATH_TO_RECIPE
    --output_dir PATH_TO_OUTPUT
    --splits "train"
    --pad_to_max_length False
    --num_calibration_samples 1024
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

## Step 3
The one-shot sparse model generated previously can undergo further sparse fine-tuning to enhance its overall accuracy. This process involves distilling information from the previously obtained dense fine-tuned model, which serves as the teacher model, to the one-shot sparse model, acting as the student. This can be achieved using the following command and recipe.
Command:
```bash
accelerate launch 
    --config_file example_fsdp_config.yaml 
    --no_python sparseml.transformers.text_generation.finetune
    --model PATH_TO_MODEL
    --dataset gsm8k
    --dataset_config_name "main"
    --output_dir PATH_TO_OUTPUT
    --splits "train"
    --num_train_epochs 2
    --precision "bfloat16"
    --gradient_checkpointing True
    --bf16 True
    --learning_rate 0.00005
    --lr_scheduler_type "linear"
    --max_seq_length 1024
    --per_device_train_batch_size 32
    --max_grad_norm None
    --warmup_steps 20
    --distill_teacher PATH_TO_TEACHER
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


