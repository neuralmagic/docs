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

Neural Magic’s vision is no-hardware AI, shattering the hardware barriers that hold back the field of machine learning. With Neural Magic’s novel algorithms that enable convolutional neural networks to run on commodity CPUs – at GPU speeds and better – data scientists no longer have to compromise on model design and input size, or deal with scarce and costly GPU resources. Neural Magic is making the power of deep learning simple, accessible, and affordable for anyone. As a part of this next great unlock of machine learning, data scientists will ask bigger questions, challenge norms, and unleash a new class of AI applications that live at the edge of imagination.

To deliver on this vision, there are several components to the Deep Sparse Platform:

1. [Sparsify](https://docs.neuralmagic.com/sparsify): Easy-to-use UI for automatically sparsifying neural networks and creating sparsification recipes for better inference performance and a smaller footprint
2. [SparseML](https://docs.neuralmagic.com/sparseml): Libraries for applying sparsification recipes to neural networks with a few lines of code, enabling faster and smaller models
3. [SparseZoo](https://docs.neuralmagic.com/sparsezoo): Neural network model repository for highly sparse and sparse-quantized models with matching sparsification recipes
4. [DeepSparse Engine](https://docs.neuralmagic.com/deepsparse): Neural network inference engine that delivers GPU-class performance for sparsified models on CPUs

Our inference engine and model optimization technologies enable companies to use ubiquitous and unconstrained CPU resources to achieve performance breakthroughs, at scale, with all the flexibility of software.

## Supported Architectures & Frameworks

<table border="1">
  <tr>
   <td>
   </td>
   <td><strong>Computer Vision Applications</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Sample Models</strong>
   </td>
   <td>ResNets, MobileNets, EfficientNets, Single-Shot Detectors (SSDs)
   </td>
  </tr>
  <tr>
   <td><strong>Use Cases (Domains)</strong>
   </td>
   <td>Image Classification, Object Detection
   </td>
  </tr>
  <tr>
   <td><strong>Frameworks</strong>
   </td>
   <td>ONNX, Keras, PyTorch, TensorFlow
   </td>
  </tr>
</table>

Today, we offer support for convolutional neural network-based computer vision models, specifically classification and object detection model types such as [the models in SparseZoo](https://docs.neuralmagic.com/sparsezoo/models.html).

We are continuously exploring models to add to our supported [model list](https://docs.neuralmagic.com/sparsezoo/models.html) and SparseZoo including model architectures beyond computer vision. Popular NLP models such as BERT are on the Neural Magic roadmap; [subscribe for updates](http://neuralmagic.com/subscribe).

### Notes

#### PyTorch and ONNX

Sparsify and the DeepSparse Engine inputs are standardized on the ONNX format. PyTorch has native ONNX export and requires fewer steps than other supported frameworks, such as [Keras or TensorFlow](https://docs.neuralmagic.com/sparseml/quicktour.html#exporting-to-onnx). If you have flexibility in frameworks, consider PyTorch to start.

#### Model Considerations

Dynamic shape is currently not supported; be sure to use models with fixed inputs and compile the model for a particular batch size. Dynamic shape and dynamic batch sizes are on the Neural Magic roadmap; [subscribe for updates](http://neuralmagic.com/subscribe).

Model inferences are executed as a single stream; concurrent execution is unsupported at this time.
