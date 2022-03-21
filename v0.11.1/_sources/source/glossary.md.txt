<!--
Copyright (c) 2021 - present / Neuralmagic, Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License athttp://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

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

# Glossary

The machine learning community includes a vast array of terminology that can have variations in meaning depending on context. This glossary is not intended as a comprehensive list, but rather a clarification of terms you may encounter with Neural Magic and machine learning.

<table>
<tr>
   <td>AutoML</td>
   <td>Automated Machine Learning. Platform that aims to reduce or eliminate the need for skilled data scientists to build ML and deep learning models. Google AutoML, for example, is a suite of cloud-based ML products.</td>
  </tr>
  <tr>
   <td>AVX2</td>
   <td>Advanced Vector Extensions 2. Instruction set used for applications on an Intel CPU.</td>
  </tr>
  <tr>
   <td>AVX-512</td>
   <td>Advanced Vector Extensions. Instruction set on Intel CPUs that impacts compute, storage, and network instructions. AVX-512 yields higher performance for demanding computational tasks.</td>
  </tr>
  <tr>
   <td>Cascade Lake Chips</td>
   <td>Intel CPU chips up to 28 cores that are improved for machine learning and added VNNI instructions. Cascade Lake Chips support FP16 and INT8 floating point operations.</td>
  </tr>
  <tr>
   <td>Convolutional Neural Network (CNN)</td>
   <td>Artificial neural network used in image recognition and object detection as well as processing that is specifically designed to process pixel data.</td>
  </tr>
  <tr>
   <td>Deep Learning (DL)</td>
   <td>Subset of machine learning in which artificial neural networks (algorithms inspired by the human brain) learn from large amounts of data.</td>
  </tr>
  <tr>
   <td>Deep Learning Frameworks</td>
   <td>Interface, library, or tool that allows one to build deep learning models more easily and quickly without getting into details of underlying algorithms.</td>
  </tr>
  <tr>
   <td>DLRM</td>
   <td>Open-source Deep Learning Recommendation Model from Facebook.</td>
  </tr>
  <tr>
   <td>Fully Connected Network</td>
   <td>Network in which every node in a layer (except the input and output layer) is connected to every node in the previous layer and following layer.</td>
  </tr>
  <tr>
   <td>Image Classification</td>
   <td>Supervised learning problem to define a set of target classes (objects to identify in images) and train a model to recognize them using labeled example photos.</td>
  </tr>
  <tr>
   <td>Image Segmentation</td>
   <td>In computer vision, the process of partitioning a digital image into multiple segments to simplify and/or change the representation of an image into something more meaningful and easier to analyze.</td>
  </tr>
  <tr>
   <td>Inference</td>
   <td>Process of using a trained machine learning algorithm to make predictions (done by machine learning engineers).</td>
  </tr>
  <tr>
   <td>MobileNets</td>
   <td>A family of mobile-first computer vision models for TensorFlow, designed to effectively maximize accuracy while being mindful of the restricted resources for an on-device or embedded application.</td>
  </tr>
  <tr>
   <td>Model pipelines</td>
   <td>In machine learning deployment, multiple models chained together to achieve business goals (such as a detection model to select regions from an image for a later visual search model).</td>
  </tr>
  <tr>
   <td>Model serving</td>
   <td>In machine learning deployment, makes serving of models less expensive and faster to run by better using resources on the machine.</td>
  </tr>
  <tr>
   <td>Multilayer Perceptron (MLP)</td>
   <td>A feedforward artificial neural network (ANN) model, composed of more than one perceptron, that maps sets of input data onto a set of appropriate outputs.</td>
  </tr>
  <tr>
   <td>Neural Network</td>
   <td>System of hardware and/or software patterned after the operation of neurons in the human brain.</td>
  </tr>
  <tr>
   <td>Object Detection</td>
   <td>Categorization of an image based on the number of objects in the image and/or the location of the objects.</td>
  </tr>
  <tr>
   <td>ONNX</td>
   <td>Open Neural Network Exchange. Open-source inference engine that is a performance-focused complete scoring engine for ONNX models.</td>
  </tr>
  <tr>
   <td>Quantization</td>
   <td>The process of approximating a neural network that uses floating-point numbers by a neural network of low bit width numbers. Quantization dramatically reduces the memory requirement and computational cost of using neural networks.</td>
  </tr>
  <tr>
   <td>Recommendations</td>
   <td>Categorization of an image based on relevant suggestions. This class of machine learning algorithms finds similarity between different images.</td>
  </tr>
  <tr>
   <td>ResNet</td>
   <td>Image classification model that is structurally dense.</td>
  </tr>
  <tr>
   <td>Sparsification</td>
   <td>A model optimization technique used to improve performance by reducing the number of nonperformance critical elements, vectors, and matrices.</td>
  </tr>
  <tr>
   <td>SSD</td>
   <td>Single Shot Detector. Convolutional neural network (CNN) algorithm for object detection that provides better balance between swiftness and precision. SSD runs CNN on an input image only one time and computes a feature map.</td>
  </tr>
  <tr>
   <td>Structured pruning</td>
   <td>A method for compressing a neural network. Structured pruning alternates between removing channel connections and fine-tuning to reduce overall width of the network. Structured pruning severely limits the maximum sparsity that can be imposed on a network when compared with unstructured pruning.</td>
  </tr>
  <tr>
   <td>Tensor</td>
   <td>The input to a convolutional layer. Tensor is a 3 or 4 dimensional representation of a 2D image.</td>
  </tr>
  <tr>
   <td>Training</td>
   <td>The process of feeding an ML algorithm with data to help identify and learn good values for all attributes involved.</td>
  </tr>
  <tr>
   <td>U-Net</td>
   <td>Fully convolutional network that does image segmentation (originally designed for medical image segmentation). The U-Net goal is to predict each pixel class.</td>
  </tr>
  <tr>
   <td>Unstructured pruning</td>
   <td>A method for compressing a neural network. Unstructured pruning removes individual weight connections from a trained network. Software like Neural Magic's DeepSparse Engine runs these pruned networks faster.</td>
  </tr>
  <tr>
   <td>VNNI</td>
   <td>Vector Neural Network Instructions. New versions of Intel's CPU chips are optimized with VNNI, making them faster and more efficient for certain types of machine learning applications.</td>
  </tr>
  <tr>
   <td>YOLO</td>
   <td>You Only Look Once. Open-source type of CNN method of object detection that can recognize objects in images and videos swiftly.</td>
  </tr>
  </table>
