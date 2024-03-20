"use strict";(self.webpackChunkdocs_neuralmagic_com=self.webpackChunkdocs_neuralmagic_com||[]).push([[5835],{6895:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>t,default:()=>c,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var s=i(4848),r=i(8453);const a={tags:["deepsparse","installation","setup","inference engine"],keywords:["DeepSparse installation","CPU inference","ONNX"],description:"Install DeepSparse, Neural Magic's high-performance inference engine, for optimized deep learning model deployment on CPUs.",sidebar_label:"DeepSparse",sidebar_position:1},t="Installing DeepSparse",l={id:"get-started/install/deepsparse",title:"Installing DeepSparse",description:"Install DeepSparse, Neural Magic's high-performance inference engine, for optimized deep learning model deployment on CPUs.",source:"@site/versioned_docs/version-1.7.0/get-started/install/deepsparse.mdx",sourceDirName:"get-started/install",slug:"/get-started/install/deepsparse",permalink:"/docs-v2/get-started/install/deepsparse",draft:!1,unlisted:!1,editUrl:"https://github.com/neuralmagic/docs-v2/tree/main/docs/get-started/install/deepsparse.mdx",tags:[{label:"deepsparse",permalink:"/docs-v2/tags/deepsparse"},{label:"installation",permalink:"/docs-v2/tags/installation"},{label:"setup",permalink:"/docs-v2/tags/setup"},{label:"inference engine",permalink:"/docs-v2/tags/inference-engine"}],version:"1.7.0",sidebarPosition:1,frontMatter:{tags:["deepsparse","installation","setup","inference engine"],keywords:["DeepSparse installation","CPU inference","ONNX"],description:"Install DeepSparse, Neural Magic's high-performance inference engine, for optimized deep learning model deployment on CPUs.",sidebar_label:"DeepSparse",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Install",permalink:"/docs-v2/get-started/install/"},next:{title:"SparseML",permalink:"/docs-v2/get-started/install/sparseml"}},o={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Hardware Requirements",id:"hardware-requirements",level:3},{value:"Software Requirements",id:"software-requirements",level:3},{value:"Community Installation",id:"community-installation",level:2},{value:"PyPI",id:"pypi",level:3},{value:"GitHub (Advanced)",id:"github-advanced",level:3},{value:"Enterprise Installation",id:"enterprise-installation",level:2},{value:"PyPI",id:"pypi-1",level:3},{value:"Specialized Installations",id:"specialized-installations",level:2},{value:"Generative AI: HuggingFace",id:"generative-ai-huggingface",level:3},{value:"Object Detection: YOLOv8",id:"object-detection-yolov8",level:3},{value:"Image Classification: TorchVision",id:"image-classification-torchvision",level:3},{value:"Natural Language Processing: HuggingFace",id:"natural-language-processing-huggingface",level:3},{value:"DeepSparse Server",id:"deepsparse-server",level:3},{value:"ONNX Runtime",id:"onnx-runtime",level:3},{value:"Development",id:"development",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components},{VersionInjector:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("VersionInjector",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"installing-deepsparse",children:"Installing DeepSparse"}),"\n",(0,s.jsx)(n.p,{children:"DeepSparse is Neural Magic's inference engine, empowering you to run deep learning models on CPUs with exceptional performance and efficiency.\nThis guide covers various installation methods, including PyPI, Docker, and installation from the GitHub source code for advanced use cases."}),"\n",(0,s.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,s.jsx)(n.h3,{id:"hardware-requirements",children:"Hardware Requirements"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)("b",{children:"CPU"}),": x86 with AVX2 instructions (Intel Haswell or newer, AMD Zen 2 or newer) or ARM v8.2 or newer."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)("b",{children:"RAM"}),": Minimum 1GB (model and configuration dependent)"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"software-requirements",children:"Software Requirements"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)("b",{children:"OS:"})," Linux (Ubuntu, CentOS, RedHat, etc.). MacOS (beta)."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)("b",{children:"Python:"})," 3.8 - 3.11"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)("b",{children:"ONNX:"})," Version 1.5.0 - 1.15.0 (opset 11 or higher)"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"community-installation",children:"Community Installation"}),"\n",(0,s.jsx)(n.h3,{id:"pypi",children:"PyPI"}),"\n",(0,s.jsx)(n.p,{children:"For the most common use case, install the current release version of DeepSparse using PyPI:"}),"\n",(0,s.jsx)(i,{targetProduct:"deepsparse",targetVersion:"==VERSION",prepend:"==",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pip install deepsparse==VERSION\n"})})}),"\n",(0,s.jsx)(n.h3,{id:"github-advanced",children:"GitHub (Advanced)"}),"\n",(0,s.jsx)(n.p,{children:"For development purposes or advanced use cases, install directly from the GitHub repository:"}),"\n",(0,s.jsx)(i,{targetProduct:"deepsparse",prepend:"v",currentTag:"main",ignoreNightly:!0,ignoreLastVersion:!0,children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pip install git+https://github.com/neuralmagic/deepsparse.git@VERSION\n"})})}),"\n",(0,s.jsx)(n.p,{children:"Or from a locally cloned repository:"}),"\n",(0,s.jsx)(i,{targetProduct:"deepsparse",prepend:"tags/v",currentTag:"main",ignoreNightly:!0,ignoreLastVersion:!0,children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/neuralmagic/deepsparse.git\ncd deepsparse\ngit checkout VERSION\npip install -e .[dev]\n"})})}),"\n",(0,s.jsx)(n.h2,{id:"enterprise-installation",children:"Enterprise Installation"}),"\n",(0,s.jsx)(n.h3,{id:"pypi-1",children:"PyPI"}),"\n",(0,s.jsxs)(n.p,{children:["DeepSparse Enterprise provides enhanced features and production-grade support.\nSee our ",(0,s.jsx)(n.a,{href:"/guides/enterprise",children:"Enterprise Guide"})," for obtaining a license key and more information."]}),"\n",(0,s.jsx)(i,{targetProduct:"deepsparse-ent",ignoreNightly:!0,targetVersion:"==VERSION",prepend:"==",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pip install deepsparse-ent==VERSION\n"})})}),"\n",(0,s.jsx)(n.h2,{id:"specialized-installations",children:"Specialized Installations"}),"\n",(0,s.jsx)(n.p,{children:"Install DeepSparse with tailored support with the following extras for domain-specific use cases and tasks."}),"\n",(0,s.jsx)(n.h3,{id:"generative-ai-huggingface",children:"Generative AI: HuggingFace"}),"\n",(0,s.jsx)(n.p,{children:"For generative AI, particularly transformer architectures, this extra supports models like Llama, Mistral, MPT, GPT, and others.\nIt enables compatibility of HuggingFace's transformers pipelines and models to DeepSparse allowing performant and memory-efficient inference."}),"\n",(0,s.jsx)(i,{targetProduct:"deepsparse[llm]",targetVersion:"==VERSION",prepend:"==",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pip install deepsparse[llm]==VERSION\n"})})}),"\n",(0,s.jsx)(n.h3,{id:"object-detection-yolov8",children:"Object Detection: YOLOv8"}),"\n",(0,s.jsx)(n.p,{children:"For object detection, this extra provides built-in support for YOLOv8 models.\nIt enables compatibility of YOLOv8 models and pipelines to DeepSparse, allowing performant and memory-efficient inference."}),"\n",(0,s.jsx)(i,{targetProduct:"deepsparse[yolov8]",targetVersion:"==VERSION",prepend:"==",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pip install deepsparse[yolov8]==VERSION\n"})})}),"\n",(0,s.jsx)(n.h3,{id:"image-classification-torchvision",children:"Image Classification: TorchVision"}),"\n",(0,s.jsx)(n.p,{children:"For image classification, this extra provides built-in support for TorchVision models.\nIt enables compatibility of TorchVision models and pipelines to DeepSparse, allowing performant and memory-efficient inference."}),"\n",(0,s.jsx)(i,{targetProduct:"deepsparse[image_classification]",targetVersion:"==VERSION",prepend:"==",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pip install deepsparse[image_classification]==VERSION\n"})})}),"\n",(0,s.jsx)(n.h3,{id:"natural-language-processing-huggingface",children:"Natural Language Processing: HuggingFace"}),"\n",(0,s.jsx)(n.p,{children:"This extra provides built-in support for HuggingFace's transformers models for natural language processing.\nIt enables compatibility of HuggingFace's transformers pipelines and models to DeepSparse allowing performant and memory-efficient inference."}),"\n",(0,s.jsx)(i,{targetProduct:"deepsparse[transformers]",targetVersion:"==VERSION",prepend:"==",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pip install deepsparse[transformers]==VERSION\n"})})}),"\n",(0,s.jsx)(n.h3,{id:"deepsparse-server",children:"DeepSparse Server"}),"\n",(0,s.jsx)(n.p,{children:"For HTTP serving of deep learning models, this extra provides built-in support for DeepSparse Server.\nIt enables serving any DeepSparse pipelines via HTTP and can be combined with other extras for additional model support."}),"\n",(0,s.jsx)(i,{targetProduct:"deepsparse[server]",targetVersion:"==VERSION",prepend:"==",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pip install deepsparse[server]==VERSION\n"})})}),"\n",(0,s.jsx)(n.h3,{id:"onnx-runtime",children:"ONNX Runtime"}),"\n",(0,s.jsx)(n.p,{children:"This extra provides built-in support for ONNX Runtime for benchmarking and comparison purposes.\nIt enables running any DeepSparse pipelines via ONNX Runtime and can be combined with other extras for additional model support."}),"\n",(0,s.jsx)(i,{targetProduct:"deepsparse[onnxruntime]",targetVersion:"==VERSION",prepend:"==",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pip install deepsparse[onnxruntime]==VERSION\n"})})}),"\n",(0,s.jsx)(n.h3,{id:"development",children:"Development"}),"\n",(0,s.jsx)(n.p,{children:"For development purposes, this extra provides built-in support for development tools."}),"\n",(0,s.jsx)(i,{targetProduct:"deepsparse[dev]",targetVersion:"==VERSION",prepend:"==",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"pip install deepsparse[dev]==VERSION\n"})})})]})}function c(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>l});var s=i(6540);const r={},a=s.createContext(r);function t(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);