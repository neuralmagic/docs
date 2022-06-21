# Use a Sparse Model

The DeepSparse Engine takes advantage of sparsity within neural networks to reduce compute as well as accelerate memory-bound workloads, leveraging sparsification
methods such as [pruning](https://neuralmagic.com/blog/pruning-overview/) and [quantization](https://arxiv.org/abs/1609.07061). 
These techniques result in significantly more performant and smaller models with limited to no effect on the baseline metrics. 

You can skip the process of training your own model by searching for a pre-sparsified model for your task on [SparseZoo](https://sparsezoo.neuralmagic.com/). The SparseZoo stubs enable you to reference any model on the SparseZoo in a convenient and predictable way. All of the framework weights, recipes, and ONNX files ready for inference are available for use.

## Benchmark

After executing `pip install deepsparse`, the benchmark tool `deepsparse.benchmark` will be available on your command-line interface.

With this command you can easily compare the performance between any ONNX or SparseZoo models.

#### Sentiment Analysis with DistilBERT

Here we'll be showing the performance gain on a DistilBERT trained on the SST2 dataset, going from dense to sparse to sparse quantized:

```
deepsparse.benchmark zoo:nlp/sentiment_analysis/distilbert-none/pytorch/huggingface/sst2/base-none
```

```
deepsparse.benchmark zoo:nlp/sentiment_analysis/distilbert-none/pytorch/huggingface/sst2/pruned90-none
```

```
deepsparse.benchmark zoo:nlp/sentiment_analysis/distilbert-none/pytorch/huggingface/sst2/pruned80_quant-none-vnni
```

#### Object Detection with YOLOv5

Here we'll be showing the performance gain on a YOLOv5s trained on the COCO dataset, going from dense to sparse to sparse quantized:

```
deepsparse.benchmark zoo:cv/detection/yolov5-s/pytorch/ultralytics/coco/base-none
```

```
deepsparse.benchmark zoo:cv/detection/yolov5-s/pytorch/ultralytics/coco/pruned-aggressive_96
```

```
deepsparse.benchmark zoo:cv/detection/yolov5-s/pytorch/ultralytics/coco/pruned_quant-aggressive_94
```