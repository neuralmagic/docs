"use strict";(self.webpackChunkdocs_neuralmagic_com=self.webpackChunkdocs_neuralmagic_com||[]).push([[74],{5197:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>a,toc:()=>g});var t=s(4848),i=s(8453);const r={tags:["DeepSparse","features","debugging"],keywords:["DeepSparse","features","numactl","debugging","troubleshooting"],description:"System and Data Logging With DeepSparse",sidebar_label:"DeepSparse Logging",sidebar_position:6},o="DeepSparse Logging",a={id:"guides/deepsparse-engine/logging",title:"DeepSparse Logging",description:"System and Data Logging With DeepSparse",source:"@site/docs/guides/deepsparse-engine/logging.mdx",sourceDirName:"guides/deepsparse-engine",slug:"/guides/deepsparse-engine/logging",permalink:"/next/guides/deepsparse-engine/logging",draft:!1,unlisted:!1,editUrl:"https://github.com/neuralmagic/docs/tree/main/docs/guides/deepsparse-engine/logging.mdx",tags:[{label:"DeepSparse",permalink:"/next/tags/deep-sparse"},{label:"features",permalink:"/next/tags/features"},{label:"debugging",permalink:"/next/tags/debugging"}],version:"current",sidebarPosition:6,frontMatter:{tags:["DeepSparse","features","debugging"],keywords:["DeepSparse","features","numactl","debugging","troubleshooting"],description:"System and Data Logging With DeepSparse",sidebar_label:"DeepSparse Logging",sidebar_position:6},sidebar:"autogenerated_docs",previous:{title:"numactl Utility",permalink:"/next/guides/deepsparse-engine/numactl-utility"},next:{title:"Deployment Options",permalink:"/next/guides/deploying-deepsparse/"}},l={},g=[{value:"Installation",id:"installation",level:2},{value:"Metrics",id:"metrics",level:2},{value:"System Logging Metrics",id:"system-logging-metrics",level:3},{value:"Data Logging Metrics",id:"data-logging-metrics",level:3},{value:"Configuration",id:"configuration",level:2},{value:"Logging YAML Syntax",id:"logging-yaml-syntax",level:3},{value:"Tangible Example",id:"tangible-example",level:3},{value:"Loggers",id:"loggers",level:2},{value:"Python Logger",id:"python-logger",level:3},{value:"Prometheus Logger",id:"prometheus-logger",level:3},{value:"Custom Logger",id:"custom-logger",level:3},{value:"Usage",id:"usage",level:2},{value:"Server Usage",id:"server-usage",level:3},{value:"Custom Data Logging Function",id:"custom-data-logging-function",level:4},{value:"Launching the Server and Logging Metrics",id:"launching-the-server-and-logging-metrics",level:4}];function c(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"deepsparse-logging",children:"DeepSparse Logging"}),"\n",(0,t.jsx)(n.p,{children:"This page explains how to use DeepSparse Logging to monitor your deployment."}),"\n",(0,t.jsx)(n.p,{children:"There are many types of monitoring tasks that you may want to perform to confirm your production system is working correctly.\nThe difficulty of the tasks varies from relatively easy (simple system performance analysis) to challenging\n(assessing the accuracy of the system in the wild by manually labeling the input data distribution post-factum). Examples include:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"System performance:"})," what is the latency/throughput of a query?"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Data quality:"})," is there an issue getting data to my model?"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Data distribution shift:"})," does the input data distribution deviates over time to the point where the model stops to deliver reliable predictions?"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Model accuracy:"})," what is the percentage of correct predictions that a model achieves?"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"DeepSparse Logging is designed to provide maximum flexibility for you to extract whatever data is needed from a\nproduction inference pipeline into the logging system of your choice."}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsxs)(n.p,{children:["This page requires the ",(0,t.jsx)(n.a,{href:"/get-started/install/deepsparse",children:"DeepSparse Server Install"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"metrics",children:"Metrics"}),"\n",(0,t.jsx)(n.p,{children:"DeepSparse Logging provides access to two types of metrics."}),"\n",(0,t.jsx)(n.h3,{id:"system-logging-metrics",children:"System Logging Metrics"}),"\n",(0,t.jsx)(n.p,{children:"System Logging gives you access to granular performance metrics for quick and efficient diagnosis of system health."}),"\n",(0,t.jsx)(n.p,{children:"There is one group of System Logging Metrics currently available: Inference Latency. For each inference request, DeepSparse Server logs the following:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Pre-processing Time - seconds in the pre-processing step"}),"\n",(0,t.jsx)(n.li,{children:"Engine Time - seconds in the engine forward pass step"}),"\n",(0,t.jsx)(n.li,{children:"Post-processing Time - seconds in the post-processing step"}),"\n",(0,t.jsx)(n.li,{children:"Total Time - second for the end-to-end response time (sum of the prior three)"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"data-logging-metrics",children:"Data Logging Metrics"}),"\n",(0,t.jsx)(n.p,{children:"Data Logging gives you access to data at each stage of an inference pipeline.\nThis facilitates inspection of the data, understanding of its properties, detecting edge cases, and possible data drift."}),"\n",(0,t.jsx)(n.p,{children:"There are four stages in the inference pipeline where Data Logging can occur:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"pipeline_inputs"}),": raw input passed to the inference pipeline by the user"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"engine_inputs"}),": pre-processed tensors passed to the engine for the forward pass"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"engine_outputs"}),": result of the engine forward pass (e.g., the raw logits)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"pipeline_outputs"}),": final output returned to the pipeline caller"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"At each stage, you can specify functions to be applied to the data before logging. Example functions include the identity function\n(for logging the raw input/output) or the mean function (e.g., for monitoring the mean pixel value of an image)."}),"\n",(0,t.jsx)(n.p,{children:"There are three types of functions that can be applied to target data at each stage:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Built-in functions: pre-written functions provided by DeepSparse (",(0,t.jsx)(n.a,{href:"https://github.com/neuralmagic/deepsparse/blob/main/src/deepsparse/loggers/metric_functions/built_ins.py",children:"see list on GitHub"}),")."]}),"\n",(0,t.jsxs)(n.li,{children:["Framework functions: functions from ",(0,t.jsx)(n.code,{children:"torch"})," or ",(0,t.jsx)(n.code,{children:"numpy"}),"."]}),"\n",(0,t.jsx)(n.li,{children:"Custom functions: custom user-provided functions."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,t.jsx)(n.p,{children:"The YAML-based Server Config file is used to configure both System and Data Logging."}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["System Logging is ",(0,t.jsx)(n.em,{children:"enabled"})," by default. If no logger is specified, Python Logger is used."]}),"\n",(0,t.jsxs)(n.li,{children:["Data Logging is ",(0,t.jsx)(n.em,{children:"disabled"})," by default. The config allows you to specify what data to log."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["See ",(0,t.jsx)(n.a,{href:"/guides/deploying-deepsparse/deepsparse-server",children:"the Server documentation"})," for more details on the Server Config file."]}),"\n",(0,t.jsx)(n.h3,{id:"logging-yaml-syntax",children:"Logging YAML Syntax"}),"\n",(0,t.jsx)(n.p,{children:"There are two key elements that should be added to the Server Config to setup logging."}),"\n",(0,t.jsxs)(n.p,{children:["First is ",(0,t.jsx)(n.code,{children:"loggers"}),". This element configures the loggers that are used by the Server. Each element is a dictionary of the form ",(0,t.jsx)(n.code,{children:"{logger_name: {arg_1: arg_value}}"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["Second is ",(0,t.jsx)(n.code,{children:"data_logging"}),". This element identifies which/how data should be logged for an endpoint. It is a dictionary of the form ",(0,t.jsx)(n.code,{children:"{identifier: [log_config]}"}),"."]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"identifier"})," specifies the stages where logging should occur. It can either be a pipeline ",(0,t.jsx)(n.code,{children:"stage"})," (see stages above) or ",(0,t.jsx)(n.code,{children:"stage.property"})," if the data type\nat a particular stage has a property. If the data type at a ",(0,t.jsx)(n.code,{children:"stage"})," is a dictionary or list, you can access via slicing, indexing, or dict access,\nfor example ",(0,t.jsx)(n.code,{children:"stage[0][:,:,0]['key3']"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"log_config"})," specifies which function to apply, which logger(s) to use, and how often to log. It is a dictionary of the form\n",(0,t.jsx)(n.code,{children:"{func: name, frequency: freq, target_loggers: [logger_names]}"}),"."]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"tangible-example",children:"Tangible Example"}),"\n",(0,t.jsx)(n.p,{children:"Here's an example for an image classification server:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"# example-config.yaml\nloggers:\n  python:         # logs to stdout\n  prometheus:     # logs to prometheus on port 6100\n    port: 6100\n\nendpoints:\n  - task: image_classification\n    route: /image_classification/predict\n    model: zoo:cv/classification/resnet_v1-50/pytorch/sparseml/imagenet/pruned95_quant-none\n    data_logging:\n      pipeline_inputs.images:   # applies to the images (of the form stage.property)\n        - func: np.shape        # framework function\n          frequency: 1\n          target_loggers:\n            - python          \n\n      pipeline_inputs.images[0]:          # applies to the first image (of the form stage.property[idx])\n        - func: mean_pixels_per_channel   # built-in function\n          frequency: 2\n          target_loggers:\n            - python        \n        - func: fraction_zeros  # built-in function\n          frequency: 2\n          target_loggers:\n            - prometheus\n      \n      engine_inputs:            # applies to the engine_inputs data (of the form stage)\n        - func: np.shape        # framework function\n          frequency: 1\n          target_loggers:\n            - python\n"})}),"\n",(0,t.jsx)(n.p,{children:"This configuration does the following data logging at each respective stage of the pipeline:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"System logging is enabled by default and logs to Prometheus and StdOut"}),"\n",(0,t.jsx)(n.li,{children:"Logs the shape of the input batch provided by the user to stdout"}),"\n",(0,t.jsx)(n.li,{children:"Logs the mean pixels and % of 0 pixels of the first image in the batch to Prometheus"}),"\n",(0,t.jsx)(n.li,{children:"Logs the raw data and shape of the input passed to the engine to Python"}),"\n",(0,t.jsx)(n.li,{children:"No logging occurs at any other pipeline stages"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"loggers",children:"Loggers"}),"\n",(0,t.jsx)(n.p,{children:"DeepSparse Logging includes options to log to Standard Output and to Prometheus out of the box as well as\nthe ability to create a Custom Logger."}),"\n",(0,t.jsx)(n.h3,{id:"python-logger",children:"Python Logger"}),"\n",(0,t.jsx)(n.p,{children:"Python Logger logs data to Standard Output. It is useful for debugging and inspecting an inference pipeline. It\naccepts no arguments and is configured with the following:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"loggers:\n  python:\n"})}),"\n",(0,t.jsx)(n.h3,{id:"prometheus-logger",children:"Prometheus Logger"}),"\n",(0,t.jsx)(n.p,{children:"DeepSparse is integrated with Prometheus, enabling you to easily instrument your model service.\nThe Prometheus Logger accepts some optional arguments and is configured as follows:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"loggers:\n  prometheus:\n    port: 6100\n    text_log_save_frequency: 10             # optional\n    text_log_save_dir: text/log/save/dir    # optional\n    text_log_file_name: text_log_file_name  # optional\n"})}),"\n",(0,t.jsxs)(n.p,{children:["There are four types of metrics in Prometheus (Counter, Gauge, Summary, and Histogram). DeepSparse uses\n",(0,t.jsx)(n.a,{href:"https://prometheus.io/docs/concepts/metric_types/#summary",children:"Summary"})," under the hood, so make sure the data you\nare logging to Prometheus is an Int or a Float."]}),"\n",(0,t.jsx)(n.h3,{id:"custom-logger",children:"Custom Logger"}),"\n",(0,t.jsxs)(n.p,{children:["If you need a custom logger, you can create a class that inherits from the ",(0,t.jsx)(n.code,{children:"BaseLogger"}),"\nand implements the ",(0,t.jsx)(n.code,{children:"log"})," method. The ",(0,t.jsx)(n.code,{children:"log"})," method is called at each pipeline stage and should handle exposing the metric to the Logger."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'from deepsparse.loggers import BaseLogger\nfrom typing import Any, Optional\n\nclass CustomLogger(BaseLogger):\n    def log(self, identifier: str, value: Any, category: Optional[str]=None):\n        """\n        :param identifier: The name of the item that is being logged.\n            By default, in the simplest case, that would be a string in the form\n            of "<pipeline_name>/<logging_target>"\n            e.g. "image_classification/pipeline_inputs"\n        :param value: The item that is logged along with the identifier\n        :param category: The metric category that the log belongs to. \n            By default, we recommend sticking to our internal convention\n            established in the MetricsCategories enum.\n        """\n        print("Logging from a custom logger")\n        print(identifier)\n        print(value)\n'})}),"\n",(0,t.jsx)(n.p,{children:"Once a custom logger is implemented, it can be referenced from a config file:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"# server-config-with-custom-logger.yaml\nloggers:\n  custom_logger:\n    path: example_custom_logger.py:CustomLogger\n    # arg_1: your_arg_1\n\nendpoints:\n  - task: sentiment_analysis\n    route: /sentiment_analysis/predict\n    model: zoo:nlp/sentiment_analysis/bert-base/pytorch/huggingface/sst2/12layer_pruned80_quant-none-vnni\n    name: sentiment_analysis_pipeline\n    data_logging:\n      pipeline_inputs:\n        - func: identity\n          frequency: 1\n          target_loggers:\n            - custom_logger\n"})}),"\n",(0,t.jsx)(n.p,{children:"Download the following for an example of a custom logger:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"wget https://raw.githubusercontent.com/neuralmagic/docs/rs/embedding-extraction-feature/files-for-examples/user-guide/deepsparse/logging/example_custom_logger.py\nwget https://raw.githubusercontent.com/neuralmagic/docs/rs/embedding-extraction-feature/files-for-examples/user-guide/deepsparse/logging/server-config-with-custom-logger.yaml\n"})}),"\n",(0,t.jsx)(n.p,{children:"Launch the server:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"deepsparse.server --config-file server-config-with-custom-logger.yaml\n"})}),"\n",(0,t.jsx)(n.p,{children:"Submit a request:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'import requests\nurl = "http://0.0.0.0:5543/sentiment_analysis/predict"\nobj = {"sequences": "Snorlax loves my Tesla!"}\nresp = requests.post(url=url, json=obj)\nprint(resp.text)\n'})}),"\n",(0,t.jsx)(n.p,{children:"You should see data printed to the Server's standard output."}),"\n",(0,t.jsxs)(n.p,{children:["See ",(0,t.jsx)(n.a,{href:"https://github.com/neuralmagic/deepsparse/blob/main/src/deepsparse/loggers/prometheus_logger.py",children:"our Prometheus logger implementation"}),"\nfor inspiration on implementing a logger."]}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(n.p,{children:"DeepSparse Logging is currently supported for usage with DeepSparse Server."}),"\n",(0,t.jsx)(n.h3,{id:"server-usage",children:"Server Usage"}),"\n",(0,t.jsxs)(n.p,{children:["The Server startup CLI command accepts a YAML configuration file (which contains both logging-specific and general\nconfiguration details) via the ",(0,t.jsx)(n.code,{children:"--config-file"})," argument."]}),"\n",(0,t.jsx)(n.p,{children:"Data Logging is configured at the endpoint level. The configuration file below creates a Server with two endpoints\n(one for image classification and one for sentiment analysis):"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"# server-config.yaml\nloggers:\n  python:\n  prometheus:\n    port: 6100\n \nendpoints:\n  - task: image_classification\n    route: /image_classification/predict\n    model: zoo:cv/classification/resnet_v1-50/pytorch/sparseml/imagenet/pruned95_quant-none\n    name: image_classification_pipeline\n    data_logging:\n      pipeline_inputs.images:\n        - func: np.shape\n          frequency: 1\n          target_loggers:\n            - python\n\n      pipeline_inputs.images[0]:\n        - func: max_pixels_per_channel\n          frequency: 1\n          target_loggers:\n            - python\n        - func: mean_pixels_per_channel\n          frequency: 1\n          target_loggers:\n            - python\n        - func: fraction_zeros\n          frequency: 1\n          target_loggers:\n            - prometheus\n      \n      pipeline_outputs.scores[0]:\n        - func: identity\n          frequency: 1\n          target_loggers:\n            - prometheus\n\n  - task: sentiment_analysis\n    route: /sentiment_analysis/predict\n    model: zoo:nlp/sentiment_analysis/bert-base/pytorch/huggingface/sst2/12layer_pruned80_quant-none-vnni\n    name: sentiment_analysis_pipeline\n    data_logging:\n      engine_inputs:\n        - func: example_custom_fn.py:sequence_length\n          frequency: 1\n          target_loggers:\n            - python\n            - prometheus\n          \n      pipeline_outputs.scores[0]:\n        - func: identity\n          frequency: 1\n          target_loggers:\n            - python\n            - prometheus\n"})}),"\n",(0,t.jsx)(n.h4,{id:"custom-data-logging-function",children:"Custom Data Logging Function"}),"\n",(0,t.jsx)(n.p,{children:"The example above included a custom function for computing sequence lengths. Custom\nFunctions should be defined in a local Python file. They should accept one argument\nand return a single output."}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"example_custom_fn.py"})," file could look like the following:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"import numpy as np\nfrom typing import List\n\n# Engine inputs to transformers is 3 lists of np.arrays representing\n# the encoded input, the attention mask, and token types.\n# Each of the np.arrays is of shape (batch, max_seq_len), so\n# engine_inputs[0][0] gives the encodings of the first item in the batch.\n# The number of non-zeros in this slice is the sequence length.\ndef sequence_length(engine_inputs: List[np.ndarray]):\n  return np.count_nonzero(engine_inputs[0][0])\n"})}),"\n",(0,t.jsx)(n.h4,{id:"launching-the-server-and-logging-metrics",children:"Launching the Server and Logging Metrics"}),"\n",(0,t.jsxs)(n.p,{children:["Download the ",(0,t.jsx)(n.code,{children:"server-config.yaml"}),", ",(0,t.jsx)(n.code,{children:"example_custom_fn.py"}),", and ",(0,t.jsx)(n.code,{children:"goldfish.jpeg"})," for the demo."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"wget https://raw.githubusercontent.com/neuralmagic/docs/rs/embedding-extraction-feature/files-for-examples/user-guide/deepsparse/logging/server-config.yaml\nwget https://raw.githubusercontent.com/neuralmagic/docs/rs/embedding-extraction-feature/files-for-examples/user-guide/deepsparse/logging/example_custom_fn.py\nwget https://raw.githubusercontent.com/neuralmagic/docs/rs/embedding-extraction-feature/files-for-examples/user-guide/deepsparse/logging/goldfish.jpg\n\n"})}),"\n",(0,t.jsx)(n.p,{children:"Launch the Server with the following:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"deepsparse.server --config-file server-config.yaml\n"})}),"\n",(0,t.jsx)(n.p,{children:"Submit a request to the image classification endpoint."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'import requests\nurl = "http://0.0.0.0:5543/image_classification/predict/from_files"\npaths = ["goldfish.jpg"]\nfiles = [("request", open(img, \'rb\')) for img in paths]\nresp = requests.post(url=url, files=files)\nprint(resp.text)\n'})}),"\n",(0,t.jsx)(n.p,{children:"Submit a request to the sentiment analysis endpoint with the following:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'import requests\nurl = "http://0.0.0.0:5543/sentiment_analysis/predict"\nobj = {"sequences": "Snorlax loves my Tesla!"}\nresp = requests.post(url=url, json=obj)\nprint(resp.text)\n'})}),"\n",(0,t.jsxs)(n.p,{children:["You should see the metrics logged to the Server's standard output and to Prometheus (see at ",(0,t.jsx)(n.code,{children:"http://localhost:6100"})," to quickly inspect the exposed metrics)."]})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var t=s(6540);const i={},r=t.createContext(i);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);