<!--
Copyright (c) 2021 - present / Neuralmagic, Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

# Get Started

## Overview

Neural Magic’s novel algorithms enable convolutional neural networks to run on commodity CPUs – at GPU speeds and better. Data scientists no longer have to compromise on model design and input size, or deal with scarce and costly GPU resources. Neural Magic is making the power of deep learning simple, accessible, and affordable for anyone.

Neural Magic’s Deep Sparse architecture is designed to mimic, on commodity hardware, the way brains compute. It uses neural network sparsity combined with locality of communication by utilizing the CPU’s large fast caches and its very large memory.

Sparsification through pruning is a broadly studied ML technique, allowing reductions of 10x or more in the size and the theoretical compute needed to execute a neural network, without losing much accuracy. So, while a GPU runs networks faster using more FLOPs, Neural Magic runs them faster via a reduction in the necessary FLOPs.


## Sparsification

Sparsification is the process of taking a trained deep learning model and removing redundant information from the overprecise and over-parameterized network resulting in a faster and smaller model. Techniques for sparsification are all encompassing including everything from inducing sparsity using [pruning](https://neuralmagic.com/blog/pruning-overview/) and [quantization](https://arxiv.org/abs/1609.07061) to enabling naturally occurring sparsity using [activation sparsity](http://proceedings.mlr.press/v119/kurtz20a.html) or [winograd/FFT](https://arxiv.org/abs/1509.09308). When implemented correctly, these techniques result in significantly more performant and smaller models with limited to no effect on the baseline metrics.

## Software Components

The Deep Sparse product suite builds on top of sparsification enabling you to easily apply the techniques to your datasets and models using recipe-driven approaches. Recipes encode the directions for how to sparsify a model into a simple, easily editable format.

- Download a sparsification recipe and sparsified model from the [SparseZoo](https://github.com/neuralmagic/sparsezoo).
- Alternatively, create a recipe for your model using [Sparsify](https://github.com/neuralmagic/sparsify).
- Apply your recipe with only a few lines of code using [SparseML](https://github.com/neuralmagic/sparseml).
- Finally, for GPU-level performance on CPUs, deploy your sparse-quantized model with the [DeepSparse Engine](https://github.com/neuralmagic/deepsparse).

Our Sparsify and SparseML tools allow us to easily reach industry leading levels of sparsity while preserving baseline accuracy, and the DeepSparse Engine’s breakthrough sparse kernels execute this computation effectively.

**Full Deep Sparse Platform flow:**

<img src="https://docs.neuralmagic.com/archive/docs/source/sparsification/flow-overview.svg" width="960px">

## Supported Architectures & Frameworks

<table cellspacing="3" cellpadding="3" border="1">
  <tr>
   <td>
   </td>
   <td><strong>Computer Vision Applications</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Sample Models</strong>
   </td>
   <td>BERT, YOLO, YOLACT, ResNet, MobileNet, EfficientNet, Single-Shot Detectors (SSDs)
   </td>
  </tr>
  <tr>
   <td><strong>Use Cases (Domains)</strong>
   </td>
   <td>NLP, Image Classification, Image Segmentation, Object Detection
   </td>
  </tr>
  <tr>
   <td><strong>Frameworks</strong>
   </td>
   <td>ONNX, Keras, PyTorch, TensorFlow
   </td>
  </tr>
</table>
<p></p>

Today, we offer support for NLP and convolutional neural network-based computer vision models, specifically classification, segmentation, and object detection model types such as [the models in SparseZoo](https://sparsezoo.neuralmagic.com).

We are continuously exploring models to add to the SparseZoo including model architectures beyond computer vision and NLP; [Subscribe for updates](http://neuralmagic.com/subscribe).

### Notes

#### PyTorch and ONNX

Sparsify and the DeepSparse Engine inputs are standardized on the ONNX format. PyTorch has native ONNX export and requires fewer steps than other supported frameworks, such as [Keras or TensorFlow](https://docs.neuralmagic.com/archive/sparseml/source/onnx_export.html). If you have flexibility in frameworks, consider PyTorch to start.

#### Model Considerations

Dynamic shape is currently not supported; be sure to use models with fixed inputs and compile the model for a particular batch size. Dynamic shape and dynamic batch sizes are on the Neural Magic roadmap; [subscribe for updates](http://neuralmagic.com/subscribe).

Model inferences are executed as a single stream by default; concurrent execution [can be enabled depending on the engine execution strategy](https://docs.neuralmagic.com/archive/deepsparse/main/source/scheduler.html).

## Try it Out

Not sure where to start? Here are several sparsified models with hands-on experiences you can work through, from deployment to training:

- [BERT](https://sparsezoo.neuralmagic.com/getting-started/bert) - a popular NLP model.
- [YOLOv5](https://sparsezoo.neuralmagic.com/getting-started/yolov5) - a popular object detection network.
- [YOLOv3](https://sparsezoo.neuralmagic.com/getting-started/yolov3) - a popular object detection network.
- [ResNet-50](https://sparsezoo.neuralmagic.com/getting-started/resnet_v1-50) - a popular image classification network.
- [MobileNetV1](https://sparsezoo.neuralmagic.com/getting-started/mobilenet_v1-1.0) - a popular image classification network for edge deployments.



