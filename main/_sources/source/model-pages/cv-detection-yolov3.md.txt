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
- Compare the differences between the models for both accuracy and inference performance
- Run the models for inference in deployment or applications
- Train the models on new datasets

<div style="margin-bottom: 24px; display: flex; flex-direction: column;">
    <div style="width: 640px; max-width: 95%; position: relative;">
        <div style="position: relative; padding-bottom: 56.25%;">
            <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/o5qIYs47MPw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
    <div style="margin-top: 8px;">
        <i>Video not loading? View full video <a href="https://youtu.be/o5qIYs47MPw">here</a>.</i>
    </div>
</div>

## Sparse Models

<div style="margin-bottom: 24px; display: flex; flex-direction: column; width: auto;">
    <iframe style="width: 100%; max-width: 1024px; height: 256px;" src="https://sparsezoo.neuralmagic.com/widgets/models/model-card/cv%2Fdetection%2Fyolo_v3-spp%2Fpytorch%2Fultralytics%2Fcoco%2Fbase-none" title="SparseZoo Available Models" frameborder="0" ></iframe>
    <div style="margin-top: 8px;">
        <i>Table not loading? View full table <a href="https://sparsezoo.neuralmagic.com/widgets/models/model-card/cv%2Fdetection%2Fyolo_v3-spp%2Fpytorch%2Fultralytics%2Fcoco%2Fbase-none">here</a>.</i>
    </div>
</div>

## Sparse Inference

<div style="margin-bottom: 24px; display: flex; flex-direction: row;">
    <a href="https://github.com/neuralmagic/deepsparse/tree/main/examples/ultralytics-yolov3#benchmarking-example" class="model-page-button" style="display: flex; flex-direction: column; margin-right: 8px; align-items: center; max-width: 196px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-benchmark.png" alt="Benchmark" style="max-width: 160px; width: 100%;" />
        <div style="text-align: center;">Benchmark</div>
    </a>
    <a href="https://github.com/neuralmagic/deepsparse/tree/main/examples/ultralytics-yolov3#annotation-example" class="model-page-button" style="display: flex; flex-direction: column; margin-right: 8px; align-items: center; max-width: 196px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-example-application.png" alt="Example Application" style="max-width: 160px; width: 100%;" />
        <div style="text-align: center;">Example Application</div>
    </a>
    <a href="https://github.com/neuralmagic/deepsparse/tree/main/examples/ultralytics-yolov3#example-yolo-deepsparse-flask-server" class="model-page-button" style="display: flex; flex-direction: column; margin-right: 8px; align-items: center; max-width: 196px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-example-deployment.png" alt="Example Deployment" style="max-width: 160px; width: 100%;" />
        <div style="text-align: center;">Example Deployment</div>
    </a>
    <a href="https://neuralmagic.com/blog/benchmark-yolov3-on-cpus-with-deepsparse/" class="model-page-button" style="display: flex; flex-direction: column; margin-right: 8px; align-items: center; max-width: 196px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-comparison.png" alt="Performance Comparisons" style="max-width: 160px; width: 100%;" />
        <div style="text-align: center;">Performance Comparisons</div>
    </a>
</div>

## Sparse Training

<div style="margin-bottom: 24px; display: flex; flex-direction: row;">
    <a href="https://github.com/neuralmagic/sparseml/blob/main/integrations/ultralytics-yolov3/tutorials/sparsifying_yolov3_using_recipes.md" class="model-page-button" style="display: flex; flex-direction: column; margin-right: 8px; align-items: center; max-width: 196px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-train-transfer-learn.png" alt="Sparse Transfer Learning" style="max-width: 160px; width: 100%;" />
        <div style="text-align: center;">Sparse Transfer Learning</div>
    </a>
    <a href="https://github.com/neuralmagic/sparseml/blob/main/integrations/ultralytics-yolov3/tutorials/sparsifying_yolov3_using_recipes.md" class="model-page-button" style="display: flex; flex-direction: column; margin-right: 8px; align-items: center; max-width: 196px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-train-apply-recipe.png" alt="Applying a Recipe" style="max-width: 160px; width: 100%;" />
        <div style="text-align: center;">Applying a Recipe</div>
    </a>
    <a class="model-page-button disabled" style="display: flex; flex-direction: column; margin-right: 8px; align-items: center; max-width: 196px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-train-create-recipe.png" alt="Creating a Recipe" style="max-width: 160px; width: 100%;" />
        <div style="text-align: center;">Creating a Recipe</div>
        <div class="tooltip">Currently unavailable for this model</div>
    </a>
    <a style="pointer-events: none; margin-right: 8px; width: 100%; max-width: 196px;">
        <!-- placeholder for 4 column grid -->
    </a>
</div>
