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

# YOLOv3: Sparsifying to Improve Object Detection Performance

Neural Magic creates models and recipes that allow anyone to plug in their data and leverage SparseML’s recipe-driven approach on top of Ultralytics’ robust training pipelines for the popular YOLOv3 object detection network. 
Sparsifying involves removing redundant information from neural networks using algorithms such as pruning and quantization, among others. 
This sparsification process results in faster inference and smaller file sizes for deployments.

This page walks through the following use cases for trying out the sparsified YOLOv3 models:
- Run the models for inference in deployment or applications
- Train the models on new datasets
- Download the models from the SparseZoo
- Benchmark the models in the DeepSparse Engine

<div style="margin-bottom: 24px; display: flex; flex-direction: column;">
    <iframe width="640px" height="360px" src="https://www.youtube.com/embed/o5qIYs47MPw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div style="margin-top: 8px;">
        <i>Video not loading? View full video <a href="https://youtu.be/o5qIYs47MPw">here</a>.</i>
    </div>
</div>

## Run

<div style="margin-bottom: 24px; display: flex; flex-direction: row;">
    <a href="https://github.com/neuralmagic/deepsparse/tree/main/examples/ultralytics-yolov3#annotation-example" style="padding-right: 8px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-example-application.png" alt="Example Application" style="height: 224px" />
    </a>
    <a href="https://github.com/neuralmagic/deepsparse/tree/main/examples/ultralytics-yolov3#example-yolo-deepsparse-flask-server" style="padding-right: 8px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-example-deployment.png" alt="Example Deployment" style="height: 224px" />
    </a>
</div>

## Train

<div style="margin-bottom: 24px; display: flex; flex-direction: row;">
    <a href="https://github.com/neuralmagic/sparseml/blob/main/integrations/ultralytics-yolov3/tutorials/sparsifying_yolov3_using_recipes.md" style="padding-right: 8px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-train-apply-recipe.png" alt="Applying a Recipe" style="height: 224px" />
    </a>
</div>

## Download

<div style="margin-bottom: 24px; display: flex; flex-direction: column; width: auto;">
    <iframe width="1024px" height="400px" style="max-width: 90%;" src="https://sparsezoo.neuralmagic.com/tables/models/cv/detection?repo=ultralytics" title="SparseZoo Available Models" frameborder="0" ></iframe>
    <div style="margin-top: 8px;">
        <i>Table not loading? View full table <a href="https://sparsezoo.neuralmagic.com/tables/models/cv/detection?repo=ultralytics">here</a>.</i>
    </div>
</div>

The model stubs from the above table can be used with the SparseZoo Python API for downloading:
```python
from sparsezoo.models import Zoo
 
# change out the stub variable from the above table to download the desired model
stub = "zoo:cv/detection/yolo_v3-spp/pytorch/ultralytics/coco/pruned_quant-aggressive_94"
model = Zoo.download_model_from_stub(stub, override_parent_path="downloads")

# Prints the download path of the model
print(model.dir_path)
```

## Benchmark

<div style="margin-bottom: 24px; display: flex; flex-direction: column;">
    <a href="https://neuralmagic.com/blog/benchmark-yolov3-on-cpus-with-deepsparse/" style="padding-right: 8px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/charts/cv-detection-yolov3-bs1.png" alt="YOLOv3 Batch Size 1 Performance Comparisons" style="height: 702px" />
    </a>
    <div style="margin-top: 8px;">
        <i>
            Batch size 1 performance comparisons for YOLOv3 on common deployments.
            Click the chart or <a href="https://neuralmagic.com/blog/benchmark-yolov3-on-cpus-with-deepsparse/">here</a> for more detailed information.
        </i>
    </div>
</div>

Benchmarks within the [DeepSparse Engine](https://github.com/neuralmagic/deepsparse) can be run by using the appropriate stub for each model with the following code:
```python
from sparsezoo.models import Zoo
from deepsparse import compile_model

batch_size = 1
stub = "zoo:cv/detection/yolo_v3-spp/pytorch/ultralytics/coco/pruned_quant-aggressive_94"

# Download model and compile as optimized executable for your machine
model = Zoo.download_model_from_stub(stub, override_parent_path="downloads")
engine = compile_model(model, batch_size=batch_size)

# Fetch sample input and run a benchmark
inputs = model.data_inputs.sample_batch(batch_size=batch_size)
benchmarks = engine.benchmark(inputs)
print(benchmarks)
```