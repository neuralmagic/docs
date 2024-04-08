"use strict";(self.webpackChunkdocs_neuralmagic_com=self.webpackChunkdocs_neuralmagic_com||[]).push([[1798],{4278:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>m,frontMatter:()=>l,metadata:()=>i,toc:()=>s});var o=r(4848),t=r(8453);const l={},c="Deploying with Docker",i={id:"products/nm-vllm/deploying_with_docker",title:"Deploying with Docker",description:"nm-vllm offers official docker image for deployment.",source:"@site/docs/products/nm-vllm/deploying_with_docker.mdx",sourceDirName:"products/nm-vllm",slug:"/products/nm-vllm/deploying_with_docker",permalink:"/next/products/nm-vllm/deploying_with_docker",draft:!1,unlisted:!1,editUrl:"https://github.com/neuralmagic/docs/tree/main/docs/products/nm-vllm/deploying_with_docker.mdx",tags:[],version:"current",frontMatter:{},sidebar:"autogenerated_docs",previous:{title:"Releases",permalink:"/next/products/nm-vllm/releases"},next:{title:"OpenAI Compatible Server",permalink:"/next/products/nm-vllm/openai_compatible_server"}},a={},s=[];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"deploying-with-docker",children:"Deploying with Docker"}),"\n",(0,o.jsxs)(n.p,{children:["nm-vllm offers official docker image for deployment.\nThe image can be used to run OpenAI compatible server.\nThe image is available on Github Packages as ",(0,o.jsx)(n.a,{href:"https://github.com/neuralmagic/nm-vllm/pkgs/container/nm-vllm-openai",children:(0,o.jsx)(n.code,{children:"neuralmagic/nm-vllm-openai"})}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:'docker run --runtime nvidia --gpus all \\\n    -v ~/.cache/huggingface:/root/.cache/huggingface \\\n    --env "HUGGING_FACE_HUB_TOKEN=<secret>" \\\n    -p 8000:8000 \\\n    --ipc=host \\\n    ghcr.io/neuralmagic/nm-vllm-openai:latest \\\n    --model mistralai/Mistral-7B-v0.1\n'})}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["You can either use the ",(0,o.jsx)(n.code,{children:"ipc=host"})," flag or ",(0,o.jsx)(n.code,{children:"--shm-size"})," flag to allow the container to access the host's shared memory. nm-vllm uses PyTorch, which uses shared memory to share data between processes under the hood, particularly for tensor parallel inference."]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"You can build and run nm-vllm from source via the provided dockerfile. To build nm-vllm:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"DOCKER_BUILDKIT=1 docker build . --target vllm-openai --tag neuralmagic/nm-vllm-openai # optionally specifies: --build-arg max_jobs=8 --build-arg nvcc_threads=2\n"})}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["By default nm-vllm will build for all GPU types for widest distribution. If you are just building for the current GPU type the machine is running on, you can add the argument ",(0,o.jsx)(n.code,{children:'--build-arg torch_cuda_arch_list=""'})," for nm-vllm to find the current GPU type and build for that."]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"To run nm-vllm:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:'docker run --runtime nvidia --gpus all \\\n    -v ~/.cache/huggingface:/root/.cache/huggingface \\\n    -p 8000:8000 \\\n    --env "HUGGING_FACE_HUB_TOKEN=<secret>" \\\n    neuralmagic/nm-vllm-openai <args...>\n'})})]})}function m(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>c,x:()=>i});var o=r(6540);const t={},l=o.createContext(t);function c(e){const n=o.useContext(l);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),o.createElement(l.Provider,{value:n},e.children)}}}]);