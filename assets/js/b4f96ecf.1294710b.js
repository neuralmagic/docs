"use strict";(self.webpackChunkdocs_neuralmagic_com=self.webpackChunkdocs_neuralmagic_com||[]).push([[8897],{2655:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var t=s(4848),i=s(8453);const r={},l="LLM Serving on Windows",o={id:"llms/guides/llm-serving-on-windows",title:"LLM Serving on Windows",description:"Here is a guide for running a large language model (LLM) for text generation on Windows using Windows Subsystem for Linux (WSL) and DeepSparse Server",source:"@site/docs/llms/guides/llm-serving-on-windows.mdx",sourceDirName:"llms/guides",slug:"/llms/guides/llm-serving-on-windows",permalink:"/next/llms/guides/llm-serving-on-windows",draft:!1,unlisted:!1,editUrl:"https://github.com/neuralmagic/docs/tree/main/docs/llms/guides/llm-serving-on-windows.mdx",tags:[],version:"current",frontMatter:{},sidebar:"autogenerated_docs",previous:{title:"Sparse Fine-Tuning LLMs on GSM8k",permalink:"/next/llms/guides/sparse-finetuning-llm-gsm8k-with-sparseml"},next:{title:"Computer Vision",permalink:"/next/computer-vision/"}},a={},d=[{value:"Prerequisites",id:"prerequisites",level:3},{value:"Step 1: Install Windows Subsystem for Linux (WSL)",id:"step-1-install-windows-subsystem-for-linux-wsl",level:2},{value:"Step 2: Set Up Python Environment",id:"step-2-set-up-python-environment",level:2},{value:"Step 3: Install DeepSparse and OpenAI",id:"step-3-install-deepsparse-and-openai",level:2},{value:"Step 4: Start DeepSparse Server",id:"step-4-start-deepsparse-server",level:2},{value:"Step 5: Interact With the Model",id:"step-5-interact-with-the-model",level:2},{value:"Notes",id:"notes",level:2},{value:"Troubleshooting",id:"troubleshooting",level:3}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"llm-serving-on-windows",children:"LLM Serving on Windows"}),"\n",(0,t.jsx)(n.p,{children:"Here is a guide for running a large language model (LLM) for text generation on Windows using Windows Subsystem for Linux (WSL) and DeepSparse Server"}),"\n",(0,t.jsx)(n.h3,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Windows 10 or 11 Operating System"}),"\n",(0,t.jsx)(n.li,{children:"Basic familiarity with command-line operations"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"step-1-install-windows-subsystem-for-linux-wsl",children:"Step 1: Install Windows Subsystem for Linux (WSL)"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Enable WSL"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["See the ",(0,t.jsx)(n.a,{href:"https://learn.microsoft.com/en-us/windows/wsl/install",children:"official documentation"})," for the most up-to-date instructions"]}),"\n",(0,t.jsxs)(n.li,{children:["Open PowerShell as Administrator and run: ",(0,t.jsx)(n.code,{children:"wsl --install"}),". This command will install WSL and a Linux distribution (usually Ubuntu)."]}),"\n",(0,t.jsx)(n.li,{children:"After the installation, set up your Linux distribution following the on-screen instructions."}),"\n",(0,t.jsx)(n.li,{children:"Restart your computer if required."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"step-2-set-up-python-environment",children:"Step 2: Set Up Python Environment"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Open your Linux distribution (e.g., Ubuntu) from the Start Menu."})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Install Python"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Update package lists: ",(0,t.jsx)(n.code,{children:"sudo apt update"})]}),"\n",(0,t.jsxs)(n.li,{children:["Install Python: ",(0,t.jsx)(n.code,{children:"sudo apt install python3-pip python3-venv"})]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Create a Virtual Environment"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Navigate to the desired directory: ",(0,t.jsx)(n.code,{children:"cd /path/to/your/directory"})]}),"\n",(0,t.jsxs)(n.li,{children:["Create a virtual environment: ",(0,t.jsx)(n.code,{children:"python3 -m venv llm-env"})]}),"\n",(0,t.jsxs)(n.li,{children:["Activate the environment: ",(0,t.jsx)(n.code,{children:"source llm-env/bin/activate"})]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"step-3-install-deepsparse-and-openai",children:"Step 3: Install DeepSparse and OpenAI"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Install DeepSparse with LLM and Server dependencies and OpenAI for easy integration"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["In your virtual environment, run: ",(0,t.jsx)(n.code,{children:"pip install deepsparse[llm,server] openai"})]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"step-4-start-deepsparse-server",children:"Step 4: Start DeepSparse Server"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Run the DeepSparse Server"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Execute: ",(0,t.jsx)(n.code,{children:"deepsparse.server --task text-generation --integration openai --model_path hf:neuralmagic/mpt-7b-chat-pruned50-quant"})]}),"\n",(0,t.jsx)(n.li,{children:"This command downloads and starts a server hosting the model as a RESTful endpoint with an OpenAI API compatible endpoint."}),"\n",(0,t.jsxs)(n.li,{children:["If you want to run other models, explore the ",(0,t.jsx)(n.a,{href:"https://sparsezoo.neuralmagic.com/?task=text_generation",children:"other optimized models on SparseZoo"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:["If you would like to learn about non-server inference, ",(0,t.jsx)(n.a,{href:"https://github.com/neuralmagic/deepsparse/blob/main/docs/llms/text-generation-pipeline.md",children:"check out the text generation pipeline documentation"}),"."]}),"\n",(0,t.jsx)(n.li,{children:"Keep this terminal open. The server must remain running to handle requests."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://github.com/neuralmagic/examples/assets/3195154/8ea079a1-b7c8-40e0-9e65-920f8d820a3d",alt:"Screenshot 2023-11-12 142904"})}),"\n",(0,t.jsx)(n.h2,{id:"step-5-interact-with-the-model",children:"Step 5: Interact With the Model"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Open Another Terminal"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Ensure that your virtual environment is activated in this new terminal as well."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Python Script to Interact With the DeepSparse OpenAI Server"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'from openai import OpenAI\n\nclient = OpenAI(base_url="http://localhost:5543/v1", api_key="EMPTY")\n\n# List models API\nmodels = client.models.list()\n# Choose the first model\nmodel = models.data[0][1]\nprint(f"Accessing model API \'{model}\'")\n\nprompt = "Write a recipe for banana bread"\ntemplate = f"### Instruction:\\n{prompt}\\n### Response:\\n"\n\nprint(f"Prompt:\\n{template}")\n\n# Chat API\nstream = False\ncompletion = client.chat.completions.create(\n    model=model,\n    messages=template,\n    stream=stream,\n    temperature=1,\n    max_tokens=200,\n)\n\nprint("Response:")\nif stream:\n    for c in completion:\n        print(c)\nelse:\n    print(completion.choices[0].message.content)\n'})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Run the Python Script"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Copy the provided Python code into a file, say ",(0,t.jsx)(n.code,{children:"llm_client.py"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:["Run the script: ",(0,t.jsx)(n.code,{children:"python llm_client.py"})]}),"\n",(0,t.jsx)(n.li,{children:"This script interacts with the DeepSparse Server and generates text based on your prompt."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://github.com/neuralmagic/examples/assets/3195154/b3247a24-e810-414c-90e6-7e8f30502385",alt:"Screenshot 2023-11-12 150608"})}),"\n",(0,t.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"WSL Version"}),": Ensure you have WSL 2 for better performance and compatibility."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Virtual Environment"}),": Using a virtual environment is recommended to avoid conflicts with system-wide Python packages."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"DeepSparse Server"}),": The server command might require adjustments depending on the model you wish to use or any updates to the DeepSparse package."]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["If you encounter issues, check the Python version (",(0,t.jsx)(n.code,{children:"python3 --version"}),") and ensure all dependencies are correctly installed (",(0,t.jsx)(n.code,{children:"pip list"}),")."]}),"\n",(0,t.jsxs)(n.li,{children:["For WSL-related problems, refer to the ",(0,t.jsx)(n.a,{href:"https://docs.microsoft.com/en-us/windows/wsl/",children:"Microsoft WSL documentation"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"By following these steps, you should be able to run a large language model for text generation on your Windows system using WSL and DeepSparse Server."})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>o});var t=s(6540);const i={},r=t.createContext(i);function l(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);