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

# FAQs

## General Product FAQs

**What is Neural Magic?**

Founded by a team of award-winning MIT computer scientists and funded by Comcast Ventures, Andreessen Horowitz, NEA, Pillar VC, and Amdocs, Neural Magic is the creator and maintainer of the Deep Sparse Platform. It has several components, including the [DeepSparse Engine](https://docs.neuralmagic.com/deepsparse), a CPU runtime that runs sparse models at GPU speeds. To enable companies the ability to use ubiquitous and unconstrained CPU resources, Neural Magic includes [Sparsify](https://docs.neuralmagic.com/sparsify), [SparseML](https://docs.neuralmagic.com/sparseml), and the [SparseZoo](https://docs.neuralmagic.com/sparsezoo), open-sourced model optimization technologies that allow users to achieve performance breakthroughs, at scale, with all the flexibility of software.

**What is the DeepSparse Engine?**

The DeepSparse Engine, created by Neural Magic, is a general purpose engine for machine learning, enabling machine learning to be practically run in new places, on new kinds of workloads. It delivers state of art, GPU-class performance for the deep learning applications running on x86 CPUs. The DeepSparse Engine achieves its performance using breakthrough algorithms that reduce the computation needed for neural network execution and accelerate the resulting memory-bound computation.

**Why Neural Magic?**

Learn more about Neural Magic and the DeepSparse Engine (formerly known as the Neural Magic Inference Engine).

[![Watch the Why Neural Magic video](why-nm.jpg)](https://youtu.be/zJy_8uPZd0o)

**How does Neural Magic make it work?**

This is an older webinar (50m) where we went through the process of optimizing and deploying a model; we’ve enhanced our software since the recording went out but this will give you some background: [https://youtu.be/UhmmHTsfrzI](https://youtu.be/UhmmHTsfrzI)

**Does Neural Magic support training of learning models?**

Neural Magic does not support training of deep learning models at this time. We do see value in providing a consistent CPU environment for our end users to train and infer on for their deep learning needs, and have added this to our engineering backlog.

**Do you have version compatibility on TensorFlow?**

Our inference engine supports all versions of TensorFlow <= 2.0; support for the Keras API is through TensorFlow 2.0.

**Do you run on AMD hardware?**

The DeepSparse Engine is validated to work on x86 Intel (Haswell generation and later) and AMD CPUs running Linux. It is highly recommended to run on a CPU with AVX-512 instructions available for optimal algorithms to be enabled. Specific support details for some algorithms over different microarchitectures [is available](https://docs.neuralmagic.com/deepsparse/source/hardware.html).

We are open to opportunities to expand our support footprint for different CPU-based processor architectures, based on market adoption and deep learning use cases.

**Do you run on ARM architecture?**

We currently do not support ARM and it’s on the Neural Magic roadmap; however, we’d still like to hear your use cases. [Contact us to continue the conversation](https://neuralmagic.com/contact/).

**To what use cases is the Deep Sparse Platform best suited?**

We focus on the models and use cases related to computer vision and NLP due to cost sensitivity and both real time and throughput constraints. The belief now is GPUs are required for deployment.

**What types of models does Neural Magic support?**

Today, we offer support for CNN-based computer vision models, specifically classification and object detection model types. We are continuously adding models to [our supported model list and SparseZoo](https://docs.neuralmagic.com/sparsezoo). Additionally, we are investigating model architectures beyond computer vision. As of June 2021, NLP models like BERT are now available.

**Is dynamic shape supported?**

Dynamic shape is currently not supported; be sure to use models with fixed inputs and compile the model for a particular batch size. Dynamic shape and dynamic batch sizes are on the Neural Magic roadmap; [subscribe for updates](https://neuralmagic.com/subscribe/).

**Can multiple model inferences be executed?**

Model inferences are executed as a single stream by default; concurrent execution [can be enabled depending on the engine execution strategy](https://docs.neuralmagic.com/deepsparse/main/source/scheduler.html). 

___

## Benchmarking FAQs

**Do you have benchmarks to compare and contrast?**

Yes. Check out our [benchmark demo video](https://neuralmagic.com/blog/neural-magic-demo/) or [contact us](https://neuralmagic.com/contact/) to discuss your particular performance requirements. If you’d rather observe performance for yourself, [head over to the Neural Magic GitHub repo](https://github.com/neuralmagic) to check out our tools and generate your own benchmarks in your environment.

**Do you publish ML Perf inference benchmarks?**

We are in the process of building the test harness to support ML Perf tests.

___

## Infrastructure FAQs

**Which instruction sets are supported and do we have to enable certain settings?**

AVX-512, AVX2, and VNNI. The DeepSparse Engine will automatically utilize the most effective available instruction set for the task. Generally, if AVX-512 is available then we have no reason to use AVX2 instruction set. AVX-512 VNNI only comes into use for quantized models i.e., INT8 or UINT8.

**Are you suitable for edge deployments (i.e., in-store devices, cameras)?**

Yes, absolutely. We can run anywhere you have a CPU with x86 instructions, including on bare metal, in the cloud, on-prem, or at the edge. Additionally, our model optimization tools are able to reduce the footprint of models across all architectures. We only guarantee performance in the DeepSparse Engine.

We’d love to hear from users highly interested in ML performance. If you want to chat about your use cases or how others are leveraging the Deep Sparse Platform, [please contact us](https://neuralmagic.com/contact/). Or simply head over to the [Neural Magic GitHub repo](https://github.com/neuralmagic) and check out our tools.

**Do you have available solutions or applications on the Microsoft/Azure platform?**

We deploy extremely easily. We are completely infrastructure-agnostic. As long as it has the "right" CPUs (80% of the entire Intel offering today), we can run on any cloud platform. For a Microsoft/Azure platform, we would just have to run Neural Magic on a Microsoft instance with the appropriate CPUs.

**Can the inference engine run on Kubernetes? How do you containerize and take advantage of underlying infrastructure?**

The DeepSparse Engine becomes a component of your model serving solution. As a result, it can simply plug into an existing CI/CD deployment pipeline. How you deploy, where you deploy, and what you deploy on becomes abstracted to the DeepSparse Engine so you  can tailor your experiences. For example, you can run the DeepSparse Engine on a CPU VM environment, deployed via a Docker file and managed through a Kubernetes environment.

___

## Model Compression FAQs

**Can you comment on how you do pruning and effects on accuracy?**

Neural networks are extremely over-parameterized, allowing most weights to be iteratively removed from the network without effect on accuracy. Eventually, though, pruning will begin affecting the overall capacity of the network, the degree of which varies based on the use case. However, this is something entirely under the data scientist control to choose whether to recover fully or to prune more for even better performance.

For example, Neural Magic has been successful in removing 90% of ResNet-50 weights with no loss in accuracy. For more background on techniques that have informed our methodologies, check out this paper co-written by Neural Magic, _[WoodFisher: Efficient Second-Order Approximation for Neural Network Compression](https://arxiv.org/abs/2004.14340)_.

**When does sparsification actually happen?**

In a scenario in which you want to sparsify and then run your own model in the DeepSparse Engine, you would first sparsify your model to achieve the desired level of performance and accuracy using Neural Magic’s [Sparsify](https://docs.neuralmagic.com/sparseml/ and [SparseML](https://docs.neuralmagic.com/sparseml/) tooling.

**What does the sparsification process look like?**

Neural Magic’s Sparsify and SparseML tooling, at its core, uses well-established state-of-the-art research principles such as [Gradual Magnitude Pruning](https://neuralmagic.com/blog/pruning-gmp/) (GMP) to sparsify models. This is an iterative process in which groups of important weights are pruned away and then the network is allowed to recover. To significantly simplify the process, we offer tools and guidance for you to achieve the best performance possible. To peruse research papers contributed by Neural Magic staff, [check them out](https://neuralmagic.com/resources/technical-papers/). Or head over to the [Neural Magic GitHub repo](https://github.com/neuralmagic) to get started!

**How does sparsification work in relation to TensorFlow?**

Today, we are able to sparsify models trained in popular deep learning libraries like TensorFlow. Our unique approach works with the output supplied by the model library and provides layer sparsification techniques that then can be compiled in the existing library framework, within the user environment.

**When using your software to transfer learn, what about other hyperparameters? Are you just freezing other layers?**

For transfer learning, our tooling allows you to save the sparse architecture learned from larger datasets. Other hyperparameters are fully under your control and allow you the flexibility to easily freeze layers as well.

**Do you support INT8 and INT16 (quantized) operations?**

Currently, the DeepSparse Engine runs at FP32 and has some support for INT8. With the release of the Intel Cascade Lake generation chips and later, Intel CPUs now include VNNI instructions and support both INT8 and INT16 operations. On machines with VNNI support, the engine has INT8 support for the ONNX operators QLinearConv, QuantizeLinear, DequantizeLinear, and QLinearMatMul with constant weights. The DeepSparse Engine also supports 8-bit QLinearAdd, an ONNX Runtime custom operator.

**Do you support FP16 (half precision) operations?**

Neural Magic is waiting on support from Intel; we will assess inclusion into our roadmap at the appropriate time.

___

## Runtime FAQs

**Do users have to do any model conversion before using the DeepSparse Engine?**

DeepSparse Engine executes on an ONNX (Open Neural Network Exchange) representation of a deep learning model. Our software allows you to produce an ONNX representation. If working with PyTorch, we use the built-in ONNX export and for TensorFlow, we convert from a standard exported protobuf file to ONNX. Outside of those frameworks, you would need to convert your model to ONNX first before passing it to the DeepSparse Engine.

**Why is ONNX the file format used by Neural Magic?**

ONNX (Open Neural Network Exchange) is emerging as a standard, open-source format for model representation. Based on the breadth of vendors supporting ONNX as well as the health of open-source community contributions, we believe ONNX offers a compelling solution for the market.

**Are your users using ONNX runtime already?**

End users are using a wide variety of runtimes, both open source and proprietary. Neural Magic is focused on ensuring we are open and flexible, to allow our users to achieve deep learning performance regardless of how they choose to build, deploy, and run their models.

**What is the accuracy loss, if any, on the numbers Neural Magic demonstrates?**

Results will depend on your use case and specific requirements. We are capable of maintaining 100% baseline accuracy. In cases where accuracy is not as important as performance, you can use our model optimization tools to further speed up the model at the expense of accuracy and weigh the tradeoffs.

If you need sparsification, we provide the tooling for tradeoffs between accuracy and performance based on your specific requirements.

**For the runtime engine, is Neural Magic modifying the architecture in any way or just optimizing the instruction set at that level?**

Specifically for sparsification, our software keeps the architecture intact and changes the weights. For running dense, we do not change anything about the model.

**For a CPU are you using all the cores?**

The DeepSparse Engine optimizes _how_ the model is run on the infrastructure resources applied to it. But, the Neural Magic does not optimize for the number of cores. You are in control to specify how much of the system Neural Magic will use and run on. Depending on your goals (latency, throughput, and cost constraints), you can optimize your pipeline for maximum efficiency.
