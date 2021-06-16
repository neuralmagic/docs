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

Neural Magic’s ML team created recipes that allow anyone to plug in their data and leverage SparseML’s recipe-driven approach on top of Ultralytics’ robust training pipelines for the popular YOLOv3 Object Detection network. 
Sparsifying involves removing redundant information from neural networks using algorithms such as pruning and quantization, among others. 
This sparsification process results in many benefits for deployment environments, including faster inference and smaller file sizes.

<div style="margin-bottom: 32px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <iframe width="640px" height="360px" src="https://www.youtube.com/embed/o5qIYs47MPw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div style="align-self: center; justify-self: center; text-align: center; margin-top: 8px;">
        Video not loading? View full video <a href="https://youtu.be/o5qIYs47MPw">here</a>.
    </div>
</div>

## Pre-Trained Models

<div style="margin-bottom: 32px; display: flex; flex-direction: column; width: auto;">
    <iframe width="1024px" height="400px" style="max-width: 90%;" src="https://sparsezoo.neuralmagic.com/tables/models/cv/detection?repo=ultralytics" title="SparseZoo Available Models" frameborder="0" ></iframe>
    <div style="align-self: center; justify-self: center; text-align: center; margin-top: 8px;">
        Table not loading? View full table <a href="https://sparsezoo.neuralmagic.com/tables/models/cv/detection?repo=ultralytics">here</a>.
    </div>
</div>

## Try It Out

<div style="margin-bottom: 32px; display: flex; flex-direction: row;">
    <a href="https://github.com/neuralmagic/deepsparse/tree/main/examples/ultralytics-yolov3#annotation-example" style="padding-right: 8px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-example-application.png" alt="Example Application" style="height: 224px" />
    </a>
    <a href="https://github.com/neuralmagic/deepsparse/tree/main/examples/ultralytics-yolov3#example-yolo-deepsparse-flask-server" style="padding-right: 8px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-example-deployment.png" alt="Example Deployment" style="height: 224px" />
    </a>
</div>

## Train It

<div style="margin-bottom: 32px; display: flex; flex-direction: row;">
    <a href="https://github.com/neuralmagic/sparseml/blob/main/integrations/ultralytics-yolov3/tutorials/sparsifying_yolov3_using_recipes.md" style="padding-right: 8px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/images/icon-train-apply-recipe.png" alt="Applying a Recipe" style="height: 224px" />
    </a>
</div>

## Benchmark It

<div style="margin-bottom: 32px; display: flex; flex-direction: column;">
    <a href="https://neuralmagic.com/blog/benchmark-yolov3-on-cpus-with-deepsparse/" style="padding-right: 8px">
        <img src="https://docs.neuralmagic.com/docs/source/model-pages/charts/cv-detection-yolov3-bs1.png" alt="YOLOv3 Batch Size 1 Performance Comparisons" style="height: 702px" />
    </a>
    <div style="margin-top: 8px;">
        Batch size 1 performance comparisons for YOLOv3 on common deployments.
        Click the chart or <a href="https://neuralmagic.com/blog/benchmark-yolov3-on-cpus-with-deepsparse/">here</a> for more detailed information.
    </div>
</div>
