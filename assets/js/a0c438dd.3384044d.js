"use strict";(self.webpackChunkdocs_neuralmagic_com=self.webpackChunkdocs_neuralmagic_com||[]).push([[432],{5089:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>s,default:()=>p,frontMatter:()=>t,metadata:()=>l,toc:()=>m});var i=r(4848),a=r(8453);const t={sidebar_position:0},s="nm-vllm",l={id:"products/nm-vllm/index",title:"nm-vllm",description:"GitHub",source:"@site/versioned_docs/version-1.7.0/products/nm-vllm/index.mdx",sourceDirName:"products/nm-vllm",slug:"/products/nm-vllm/",permalink:"/products/nm-vllm/",draft:!1,unlisted:!1,editUrl:"https://github.com/neuralmagic/docs/tree/main/docs/products/nm-vllm/index.mdx",tags:[],version:"1.7.0",sidebarPosition:0,frontMatter:{sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Products",permalink:"/products/"},next:{title:"Releases",permalink:"/products/nm-vllm/releases"}},o={},m=[{value:"GitHub",id:"github",level:2},{value:"Documentation",id:"documentation",level:2},{value:"Overview",id:"overview",level:2},{value:"Installation",id:"installation",level:2},{value:"Quickstart",id:"quickstart",level:2},{value:"Model Inference with Marlin (4-bit Quantization)",id:"model-inference-with-marlin-4-bit-quantization",level:4},{value:"Model Inference with Weight Sparsity",id:"model-inference-with-weight-sparsity",level:4},{value:"Integration with OpenAI-Compatible Server",id:"integration-with-openai-compatible-server",level:4},{value:"Quantized Inference Performance",id:"quantized-inference-performance",level:2},{value:"Sparse Inference Performance",id:"sparse-inference-performance",level:2}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h4:"h4",p:"p",pre:"pre",...(0,a.R)(),...e.components},{DocCardList:r}=n;return r||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("DocCardList",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"nm-vllm",children:"nm-vllm"}),"\n",(0,i.jsx)(n.h2,{id:"github",children:"GitHub"}),"\n",(0,i.jsx)(r,{children:(0,i.jsxs)("a",{href:"https://github.com/neuralmagic/nm-vllm",children:[(0,i.jsx)("h3",{children:"nm-vllm"}),(0,i.jsx)("p",{children:"nm-vllm is a high-throughput and memory-efficient inference and serving engine for LLMs."})]})}),"\n",(0,i.jsx)(n.h2,{id:"documentation",children:"Documentation"}),"\n",(0,i.jsx)(r,{}),"\n",(0,i.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/vllm-project/vllm",children:"vLLM"})," is a fast and easy-to-use library for LLM inference that Neural Magic regularly contributes upstream improvements to. This fork, ",(0,i.jsx)(n.code,{children:"nm-vllm"})," is our opinionated focus on incorporating the latest LLM optimizations like quantization and sparsity for enhanced performance."]}),"\n",(0,i.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.a,{href:"https://pypi.org/project/nm-vllm/",children:"nm-vllm PyPi package"})," includes pre-compiled binaries for CUDA (version 12.1) kernels, streamlining the setup process. For other PyTorch or CUDA versions, please compile the package from source."]}),"\n",(0,i.jsx)(n.p,{children:"Install it using pip:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"pip install nm-vllm\n"})}),"\n",(0,i.jsxs)(n.p,{children:["For utilizing weight-sparsity kernels, such as through ",(0,i.jsx)(n.code,{children:'sparsity="sparse_w16a16"'}),", you can extend the installation with the ",(0,i.jsx)(n.code,{children:"sparsity"})," extras:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"pip install nm-vllm[sparse]\n"})}),"\n",(0,i.jsxs)(n.p,{children:["You can also build and install ",(0,i.jsx)(n.code,{children:"nm-vllm"})," from source (this will take ~10 minutes):"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/neuralmagic/nm-vllm.git\r\ncd nm-vllm\r\npip install -e .\n"})}),"\n",(0,i.jsx)(n.h2,{id:"quickstart",children:"Quickstart"}),"\n",(0,i.jsxs)(n.p,{children:["Neural Magic maintains a variety of sparse models on our Hugging Face organization profiles, ",(0,i.jsx)(n.a,{href:"https://huggingface.co/neuralmagic",children:"neuralmagic"})," and ",(0,i.jsx)(n.a,{href:"https://huggingface.co/nm-testing",children:"nm-testing"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["A collection of ready-to-use SparseGPT and GPTQ models in inference optimized marlin format are ",(0,i.jsx)(n.a,{href:"https://huggingface.co/collections/neuralmagic/compressed-llms-for-nm-vllm-65e73e3d51d3200e34b77431",children:"available on Hugging Face"})]}),"\n",(0,i.jsx)(n.h4,{id:"model-inference-with-marlin-4-bit-quantization",children:"Model Inference with Marlin (4-bit Quantization)"}),"\n",(0,i.jsx)(n.p,{children:"Marlin is an extremely optimized FP16xINT4 matmul kernel aimed at LLM inference that can deliver close to ideal (4x) speedups up to batchsizes of 16-32 tokens.\r\nTo use Marlin within nm-vllm, simply pass the Marlin quantized directly to the engine. It will detect the quantization from the model's config."}),"\n",(0,i.jsxs)(n.p,{children:["Here is a demonstraiton with a ",(0,i.jsx)(n.a,{href:"https://huggingface.co/neuralmagic/OpenHermes-2.5-Mistral-7B-marlin",children:"4-bit quantized OpenHermes Mistral"})," model:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from vllm import LLM, SamplingParams\r\nfrom transformers import AutoTokenizer\r\n\r\nmodel_id = "neuralmagic/OpenHermes-2.5-Mistral-7B-marlin"\r\nmodel = LLM(model_id, max_model_len=4096)\r\ntokenizer = AutoTokenizer.from_pretrained(model_id)\r\nsampling_params = SamplingParams(max_tokens=100, temperature=0.8, top_p=0.95)\r\n\r\nmessages = [\r\n    {"role": "user", "content": "What is synthetic data in machine learning?"},\r\n]\r\nformatted_prompt =  tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)\r\noutputs = model.generate(formatted_prompt, sampling_params=sampling_params)\r\nprint(outputs[0].outputs[0].text)\n'})}),"\n",(0,i.jsx)(n.h4,{id:"model-inference-with-weight-sparsity",children:"Model Inference with Weight Sparsity"}),"\n",(0,i.jsxs)(n.p,{children:["For a quick demonstration, here's how to run a small ",(0,i.jsx)(n.a,{href:"https://huggingface.co/nm-testing/llama2.c-stories110M-pruned50",children:"50% sparse llama2-110M"})," model trained on storytelling:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from vllm import LLM, SamplingParams\r\n\r\nmodel = LLM(\r\n    "neuralmagic/llama2.c-stories110M-pruned50",\r\n    sparsity="sparse_w16a16",   # If left off, model will be loaded as dense\r\n)\r\n\r\nsampling_params = SamplingParams(max_tokens=100, temperature=0)\r\noutputs = model.generate("Hello my name is", sampling_params=sampling_params)\r\nprint(outputs[0].outputs[0].text)\n'})}),"\n",(0,i.jsx)(n.p,{children:"Here is a more realistic example of running a 50% sparse OpenHermes 2.5 Mistral 7B model finetuned for instruction-following:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from vllm import LLM, SamplingParams\r\nfrom transformers import AutoTokenizer\r\n\r\nmodel_id = "neuralmagic/OpenHermes-2.5-Mistral-7B-pruned50"\r\nmodel = LLM(model_id, sparsity="sparse_w16a16", max_model_len=4096)\r\ntokenizer = AutoTokenizer.from_pretrained(model_id)\r\nsampling_params = SamplingParams(max_tokens=100, temperature=0.8, top_p=0.95)\r\n\r\nmessages = [\r\n    {"role": "user", "content": "What is sparsity in deep learning?"},\r\n]\r\nformatted_prompt =  tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)\r\noutputs = model.generate(formatted_prompt, sampling_params=sampling_params)\r\nprint(outputs[0].outputs[0].text)\n'})}),"\n",(0,i.jsxs)(n.p,{children:["There is also support for semi-structured 2:4 sparsity using the ",(0,i.jsx)(n.code,{children:'sparsity="semi_structured_sparse_w16a16"'})," argument:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from vllm import LLM, SamplingParams\r\n\r\nmodel = LLM("neuralmagic/llama2.c-stories110M-pruned2.4", sparsity="semi_structured_sparse_w16a16")\r\nsampling_params = SamplingParams(max_tokens=100, temperature=0)\r\noutputs = model.generate("Once upon a time, ", sampling_params=sampling_params)\r\nprint(outputs[0].outputs[0].text)\n'})}),"\n",(0,i.jsx)(n.h4,{id:"integration-with-openai-compatible-server",children:"Integration with OpenAI-Compatible Server"}),"\n",(0,i.jsx)(n.p,{children:"You can also quickly use the same flow with an OpenAI-compatible model server:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"python -m vllm.entrypoints.openai.api_server \\\r\n    --model neuralmagic/OpenHermes-2.5-Mistral-7B-pruned50 \\\r\n    --sparsity sparse_w16a16 \\\r\n    --max-model-len 4096\n"})}),"\n",(0,i.jsx)(n.h2,{id:"quantized-inference-performance",children:"Quantized Inference Performance"}),"\n",(0,i.jsxs)(n.p,{children:["Developed in collaboration with IST-Austria, ",(0,i.jsx)(n.a,{href:"https://arxiv.org/abs/2210.17323",children:"GPTQ"})," is the leading quantization algorithm for LLMs, which enables compressing the model weights from 16 bits to 4 bits with limited impact on accuracy. nm-vllm includes support for the recently-developed Marlin kernels for accelerating GPTQ models. Prior to Marlin, the existing kernels for INT4 inference failed to scale in scenarios with multiple concurrent users."]}),"\n",(0,i.jsx)("p",{align:"center",children:(0,i.jsx)("img",{alt:"Marlin Performance",src:"https://github.com/neuralmagic/nm-vllm/assets/3195154/6ac9f5b0-667a-41f3-8e6d-ca51c268bec5",width:"60%"})}),"\n",(0,i.jsx)(n.h2,{id:"sparse-inference-performance",children:"Sparse Inference Performance"}),"\n",(0,i.jsxs)(n.p,{children:["Developed in collaboration with IST-Austria, ",(0,i.jsx)(n.a,{href:"https://arxiv.org/abs/2301.00774",children:"SparseGPT"})," and ",(0,i.jsx)(n.a,{href:"https://arxiv.org/abs/2310.06927",children:"Sparse Fine-tuning"})," are the leading algorithms for pruning LLMs, which enables removing at least half of model weights with limited impact on accuracy."]}),"\n",(0,i.jsx)(n.p,{children:"nm-vllm includes support for newly-developed sparse inference kernels, which provides both memory reduction and acceleration of sparse models leveraging sparsity."}),"\n",(0,i.jsxs)("p",{align:"center",children:[(0,i.jsx)("img",{alt:"Sparse Memory Compression",src:"https://github.com/neuralmagic/nm-vllm/assets/3195154/2fdd2212-3081-4b97-b492-a809ce23fdd3",width:"40%"}),(0,i.jsx)("img",{alt:"Sparse Inference Performance",src:"https://github.com/neuralmagic/nm-vllm/assets/3195154/3448e3ee-535f-4c50-ac9b-00645673cc8c",width:"40%"})]})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>s,x:()=>l});var i=r(6540);const a={},t=i.createContext(a);function s(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);