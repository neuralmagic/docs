# Deploy your model: Custom Pipelines

The DeepSparse Engine takes advantage of sparsity within neural networks to reduce compute as well as accelerate memory-bound workloads, leveraging sparsification
methods such as [pruning](https://neuralmagic.com/blog/pruning-overview/) and [quantization](https://arxiv.org/abs/1609.07061). 
These techniques result in significantly more performant and smaller models with limited to no effect on the baseline metrics. 

You can skip the process of training your own model by searching for a pre-sparsified model for your task on [SparseZoo](https://sparsezoo.neuralmagic.com/). The SparseZoo stubs enable you to reference any model on the SparseZoo in a convenient and predictable way. All of the framework weights, recipes, and ONNX files ready for inference are available for use.

Optimizing large accurate models for the best speed is great, but that isn't enough on its own. 
Models are just a part of the full deployment **pipeline** needed in order use them for your application.
Pipelines are the default interface for running deployment inference with the DeepSparse Engine.

Once a model is obtained, either through SparseML training or directly from SparseZoo, `deepsparse.Pipeline` can be used to easily facilitate end-to-end inference and deployment of the sparsified transformers model.

## Sentiment Analysis Example

The sentiment analysis task takes in a sentence and classifies its sentiment. The following example
uses a pruned and quantized text sentiment analysis BERT model trained on the `sst2` dataset downloaded
from the SparseZoo. This `sst2` model classifies sentences as positive or negative.

```python
from deepsparse import Pipeline

sa_pipeline = Pipeline.create(task="sentiment-analysis")

inference = sa_pipeline("Snorlax loves my Tesla!")

>> labels=['LABEL_1'] scores=[0.9884248375892639]  # positive sentiment

inference = sa_pipeline("Snorlax hates pineapple pizza!")

>> labels=['LABEL_0'] scores=[0.9981569051742554]  # negative sentiment
```

We can also do this task at a larger batched scale, showing an offline inference use-case.
Here we show the DeepSparse Text Classification Pipeline crunching through the LIAR dataset at batch size 16.
LIAR is a dataset for fake news detection with 12.8K human labeled short statements, and each statement is evaluated by a politifact.com editor for its truthfulness.
Make sure to have installed extra dependencies using `pip install datasets`.

```python
from datasets import load_dataset
from deepsparse import Pipeline

# Load model
model_path = "zoo:nlp/sentiment_analysis/distilbert-none/pytorch/huggingface/sst2/pruned80_quant-none-vnni"
classifier = Pipeline.create(
    "sentiment-analysis", model_path=model_path, batch_size=16, sequence_length=32
)

# Load dataset
liar_ds = load_dataset("liar")

def predict(batch):
    pred = classifier(batch["statement"])
    batch["pred_labels"] = pred.labels
    batch["pred_scores"] = pred.scores
    batch["liar_label"] = liar_ds["train"].features["label"].int2str(batch["label"])
    return batch

# Infer predictions over the liar dataset
liar_train_ds = (
    liar_ds["train"].select(range(10256)).map(predict, batched=True, batch_size=16)
)
```

## Object Detection Example

```pip install deepsparse[yolo]```

If you don't have an image ready, pull a sample image down with

```
wget -O basilica.jpg https://raw.githubusercontent.com/neuralmagic/deepsparse/main/src/deepsparse/yolo/sample_images/bascilica.jpg
```

```python
from deepsparse.pipeline import Pipeline

model_stub = "zoo:cv/detection/yolov5-l/pytorch/ultralytics/coco/pruned-aggressive_98"
images = ["basilica.jpg"]

yolo_pipeline = Pipeline.create(
    task="yolo",
    model_path=model_stub,
)

pipeline_outputs = yolo_pipeline(images=images, iou_thres=0.6, conf_thres=0.001)
```

#### Annotate CLI
You can also use the annotate command to have the engine save an annotated photo on disk.
```bash
deepsparse.object_detection.annotate --source basilica.jpg #Try --source 0 to annotate your live webcam feed
```

Running the above command will create an `annotation-results` folder and save the annotated image inside.

## Supported Tasks

Development of new Pipelines for tasks is always ongoing. Currently supported tasks include:

| Domain |         Task         |
|--------|:--------------------:|
| NLP    | [text-classification](https://github.com/neuralmagic/deepsparse/blob/main/src/deepsparse/transformers/README.md)  |
| NLP    | [token-classification](https://github.com/neuralmagic/deepsparse/blob/main/src/deepsparse/transformers/README.md) |
| NLP    | [question-answering](https://github.com/neuralmagic/deepsparse/blob/main/src/deepsparse/transformers/README.md)  |
| CV     | [image-classification](https://github.com/neuralmagic/deepsparse/blob/main/src/deepsparse/image_classification/README.md) |
| CV     | [object-detection](https://github.com/neuralmagic/deepsparse/blob/main/src/deepsparse/yolo/README.md)   |