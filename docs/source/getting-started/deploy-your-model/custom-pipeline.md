# Deploy your model: Custom Pipelines

The DeepSparse Engine made for easy integration into your inference environment and pipeline of choice. 
If there isn't an existing pipeline for your specific task or model, this page will help you learn how to leverage DeepSparse for loading and deploying sparse models with ONNX. 

ONNX is an open format built to represent machine learning models and gives us flexibility to serve your model in a framework-agnostic environment. 
Support includes exporting from training frameworks such as [PyTorch,](https://pytorch.org/docs/stable/onnx.html) [TensorFlow,](https://github.com/onnx/tensorflow-onnx) [Keras,](https://github.com/onnx/keras-onnx) and [many other frameworks](https://github.com/onnx/onnxmltools).

Once you have an ONNX file, it is as simple as plugging it into the DeepSparse Engine and into your pipeline.


Here is an example writing an image classification pipeline around a MobileNetV2 ONNX file with an example image.

Make sure you install the dependencies for this example:
```bash
pip install deepsparse pillow torchvision
```

You can download the ONNX file and image like this:

```bash
wget https://github.com/onnx/models/raw/main/vision/classification/mobilenet/model/mobilenetv2-7.onnx
wget https://github.com/EliSchwartz/imagenet-sample-images/raw/master/n01440764_tench.JPEG
```

Then here is the example pipeline code:

```python
import numpy
import onnx
from PIL import Image
from torchvision import transforms

from deepsparse import compile_model

onnx_model_path = "mobilenetv2-7.onnx"
image_path = "n01440764_tench.JPEG"


def load_and_preprocess(image_path: str) -> List[numpy.ndarray]:
    # load image from string filepath
    image = Image.open(image_path)

    # torchvision transforms for raw inputs
    resize_scale = 256.0 / 224.0  # standard used
    image_size = (224, 224)
    pre_normalization_transforms = transforms.Compose(
        [
            transforms.Resize(
                tuple([round(resize_scale * size) for size in image_size])
            ),
            transforms.CenterCrop(image_size),
        ]
    )

    # apply resize and center crop
    image = pre_normalization_transforms(image)
    image_numpy = numpy.array(image)
    image.close()

    # make channel first dimension
    image_numpy = image_numpy.transpose(2, 0, 1)
    image_numpy = numpy.expand_dims(image_numpy, axis=0)
    image_numpy = numpy.ascontiguousarray(image_numpy, dtype=numpy.float32)

    return [image_numpy]


print("Processing the model '{}' and image '{}'".format(onnx_model_path, image_path))
model = compile_model(onnx_model_path)
input_data = load_and_preprocess(image_path)
output_data = model(input_data)
labels = numpy.argmax(output_data[0], axis=1).tolist()
print("Sucessfully inferenced the image!")
print("Label: {}".format(numpy.argmax(output_data[0], axis=1).tolist()))
print("Score: {}".format(numpy.max(output_data[0], axis=1).tolist()))
```

Output:
```
Processing the model 'mobilenetv2-7.onnx' and image 'n01440764_tench.JPEG'
DeepSparse Engine, Copyright 2021-present / Neuralmagic, Inc. version: 0.13.0.20220614 (89e23256) (release) (optimized) (system=avx512, binary=avx512)
Sucessfully inferenced the image!
Label: [836]
Score: [20.610153198242188]
```