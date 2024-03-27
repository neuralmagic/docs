"use strict";(self.webpackChunkdocs_neuralmagic_com=self.webpackChunkdocs_neuralmagic_com||[]).push([[9074],{6112:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var i=a(4848),t=a(8453);const s={tags:["optimization","llm","sparsification","sparsezoo","performance","neural magic"],keywords:["LLM optimization","model sparsification","sparse inference","efficient LLMs"],description:"Optimize large language models (LLMs) for efficient inference using one-shot pruning and quantization. Learn how to improve model performance and reduce costs without sacrificing accuracy.",sidebar_label:"Optimize",sidebar_position:3},r="Optimizing LLMs",o={id:"get-started/optimize",title:"Optimizing LLMs",description:"Optimize large language models (LLMs) for efficient inference using one-shot pruning and quantization. Learn how to improve model performance and reduce costs without sacrificing accuracy.",source:"@site/versioned_docs/version-1.7.0/get-started/optimize.mdx",sourceDirName:"get-started",slug:"/get-started/optimize",permalink:"/get-started/optimize",draft:!1,unlisted:!1,editUrl:"https://github.com/neuralmagic/docs/tree/main/docs/get-started/optimize.mdx",tags:[{label:"optimization",permalink:"/tags/optimization"},{label:"llm",permalink:"/tags/llm"},{label:"sparsification",permalink:"/tags/sparsification"},{label:"sparsezoo",permalink:"/tags/sparsezoo"},{label:"performance",permalink:"/tags/performance"},{label:"neural magic",permalink:"/tags/neural-magic"}],version:"1.7.0",sidebarPosition:3,frontMatter:{tags:["optimization","llm","sparsification","sparsezoo","performance","neural magic"],keywords:["LLM optimization","model sparsification","sparse inference","efficient LLMs"],description:"Optimize large language models (LLMs) for efficient inference using one-shot pruning and quantization. Learn how to improve model performance and reduce costs without sacrificing accuracy.",sidebar_label:"Optimize",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Deploy",permalink:"/get-started/deploy"},next:{title:"Sparse Fine-Tuning",permalink:"/get-started/finetune"}},l={},d=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Sparsifying a Llama Model",id:"sparsifying-a-llama-model",level:2},{value:"Data Preparation",id:"data-preparation",level:3},{value:"One Shot",id:"one-shot",level:3},{value:"Inference",id:"inference",level:3}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components},{Details:a,TabItem:s,Tabs:r}=n;return a||m("Details",!0),s||m("TabItem",!0),r||m("Tabs",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"optimizing-llms",children:"Optimizing LLMs"}),"\n",(0,i.jsx)(n.p,{children:"This guide delves into optimizing large language models (LLMs) for efficient text generation using neural network compression techniques like sparsification and quantization.\nYou'll learn how to:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)("b",{children:"Sparsify Models:"})," Apply pruning techniques to eliminate redundant parameters from an LLM, reducing its size and computational requirements."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)("b",{children:"Quantize Models:"})," Lower the numerical precision of model weights and activations for faster inference with minimal impact on accuracy."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)("b",{children:"Evaluate Performance:"})," Measure the impact of sparsification and quantization on model performance and accuracy."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)("b",{children:"Training Environment:"})," A system that meets the minimum hardware and software requirements as outlined in the ",(0,i.jsx)(n.a,{href:"./install/#prerequisites",children:"Install Guide"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)("b",{children:"SparseML LLM Installation:"})," An environment with DeepSparse for LLMs installed as outlined in the ",(0,i.jsx)(n.a,{href:"./install#llms---causal-language-modeling",children:"Install Guide"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)("b",{children:"Background:"})," Familiarity with Generative AI and working with large language models is recommended."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"sparsifying-a-llama-model",children:"Sparsifying a Llama Model"}),"\n",(0,i.jsx)(n.p,{children:"We'll use a pre-trained, unoptimized Llama 2 7B chat model from the SparseZoo.\nThe model is referenced by the following SparseZoo stub:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"zoo:llama2-7b-llama2_chat_llama2_pretrain-base\n"})}),"\n",(0,i.jsx)(n.p,{children:"For additional models that work with SparseML, consider the following options:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Explore pre-sparsified ",(0,i.jsx)(n.a,{href:"https://sparsezoo.neuralmagic.com/?modelSet=generative_ai",children:"Generative AI models in the SparseZoo"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Try out popular LLMs from the ",(0,i.jsx)(n.a,{href:"https://huggingface.co/models?pipeline_tag=causal-lm",children:"Hugging Face Model Hub"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"data-preparation",children:"Data Preparation"}),"\n",(0,i.jsx)(n.p,{children:"SparseML requires a dataset to be used for calibration during the sparsification process.\nFor this example, we'll use the Open Platypus dataset, which is available in the Hugging Face dataset hub and can be loaded as follows:"}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)(s,{value:"python",label:"Python",default:!0,children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from datasets import load_dataset\n\ndataset = load_dataset("garage-bAInd/Open-Platypus")\n'})})}),(0,i.jsx)(s,{value:"bash",label:"Bash",default:!0,children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'--dataset "garage-bAInd/Open-Platypus"\n'})})})]}),"\n",(0,i.jsxs)(n.p,{children:["For comprehensive data preparation guidelines, including formats like CSV and JSONL, refer to our ",(0,i.jsx)(n.a,{href:"../llms/data",children:"detailed datasets guide"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"one-shot",children:"One Shot"}),"\n",(0,i.jsxs)(n.p,{children:["Applying pruning and quantization to an LLM without fine-tuning can be done utilizing recipes, the SparseGPT algorithm, and the ",(0,i.jsx)(n.code,{children:"compress"})," command in SparseML.\nThis combination enables a quick and easy way to sparsify a model, resulting in medium compression levels with minimal accuracy loss, enabling efficient inference."]}),"\n",(0,i.jsx)(n.p,{children:"The code below demonstrates applying one-shot sparsification to the Llama chat model utilizing a recipe.\nThe recipe specifies using the SparseGPTModifier to apply 50% sparsity and quantization (int8 weights and activations) to the targeted layers within the model."}),"\n",(0,i.jsx)(r,{children:(0,i.jsx)(s,{value:"python",label:"Python",default:!0,children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from sparseml.transformers import (\n    SparseAutoModelForCausalLM, SparseAutoTokenizer, load_dataset, compress\n)\n\nmodel = SparseAutoModelForCausalLM.from_pretrained(\n    "zoo:llama2-7b-llama2_chat_llama2_pretrain-base",\n    device_map="auto"\n)\ntokenizer = SparseAutoTokenizer.from_pretrained(\n    "zoo:llama2-7b-llama2_chat_llama2_pretrain-base"\n).to(model.device)\ndataset = load_dataset("garage-bAInd/Open-Platypus")\n\ndef format_data(data):\n    return {\n        "text": data["instruction"] + data["output"]\n    }\n\ndataset = dataset.map(format_data)\n\nrecipe = """\ncompression_stage:\n    run_type: oneshot\n    oneshot_modifiers:\n        QuantizationModifier:\n            ignore: [LlamaRotaryEmbedding, LlamaRMSNorm, SiLUActivation, MatMulOutput_QK, MatMulOutput_PV]\n            post_oneshot_calibration: true\n            scheme_overrides:\n                Linear:\n                    weights:\n                        num_bits: 8\n                        symmetric: true\n                        strategy: channel\n                MatMulLeftInput_QK:\n                    input_activations:\n                        num_bits: 8\n                        symmetric: true\n                Embedding:\n                    input_activations: null\n                    weights:\n                        num_bits: 8\n                        symmetric: false\n        SparseGPTModifier:\n            sparsity: 0.5\n            quantize: True\n            targets: [model.layers.0, model.layers.1, model.layers.2, model.layers.3, model.layers.4, model.layers.5, model.layers.6, model.layers.7, model.layers.8, model.layers.9, model.layers.10, model.layers.11, model.layers.12, model.layers.13, model.layers.14, model.layers.15, model.layers.16, model.layers.17, model.layers.18, model.layers.19, model.layers.20, model.layers.21, model.layers.22, model.layers.23, model.layers.24, model.layers.25, model.layers.26, model.layers.27, model.layers.28, model.layers.29, model.layers.30, model.layers.31, lm_head]\n"""\n\ncompress(\n    model=model,\n    tokenizer=tokenizer,\n    dataset=dataset,\n    recipe=recipe,\n    output_dir="./one-shot-example/stage_compression",\n)\n'})})})}),"\n",(0,i.jsx)(n.p,{children:"After running the above code, the model is pruned to 50% sparsity and quantized, resulting in a smaller model ready for efficient inference."}),"\n",(0,i.jsx)(n.h3,{id:"inference",children:"Inference"}),"\n",(0,i.jsxs)(a,{children:[(0,i.jsx)("summary",{children:"Evaluating Accuracy"}),(0,i.jsx)(n.p,{children:"Evaluating the model's accuracy is important to ensure it meets the desired performance requirements.\nTo do so, we can use the following code to evaluate the model's perplexity on a sample dataset:"}),(0,i.jsxs)(r,{children:[(0,i.jsx)(s,{value:"python",label:"Python",default:!0,children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from sparseml import evaluate\n\neval = evaluate(\n    "./one-shot-example/stage_compression",\n    datasets="openai_humaneval",\n    integration="perplexity",\n    text_column_name=["prompt", "canonical_solution"]\n)\nprint(eval)\n'})})}),(0,i.jsx)(s,{value:"bash",label:"Bash",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'sparseml.evaluate \\\n    "./one-shot-example/stage_compression" \\\n    --datasets "openai_humaneval" \\\n    --integration "perplexity" \\\n    --text_column_name prompt \\\n    --text_column_name canonical_solution\n'})})})]})]}),"\n",(0,i.jsx)(n.p,{children:"After sparsifying the model, it is ready for evaluation and deployment.\nTo test the model's generation capabilities, we can use the following code to generate text utilizing PyTorch:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from sparseml.transformers import SparseAutoModelForCausalLM, SparseAutoTokenizer\n\nmodel_path = "./one-shot-example/stage_compression"\nmodel = SparseAutoModelForCausalLM.from_pretrained(model_path, device_map="auto")\ntokenizer = SparseAutoTokenizer.from_pretrained(model_path).to(model.device)\ninputs = tokenizer(["Large language models are"], return_tensors="pt")\ngenerated_ids = model.generate(**inputs)\noutputs = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)\nprint(outputs)\n'})}),"\n",(0,i.jsx)(n.p,{children:"The above code, however, does not leverage the sparsity within the model for efficient inference.\nTo do so, we need to export the model to ONNX to be ready for efficient inference on CPUs with DeepSparse.\nSparseML provides a simple export command to do so:"}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)(s,{value:"python",label:"Python",default:!0,children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from sparseml import export\n\nexport(\n    "./one-shot-example/stage_compression",\n    task="text-generation",\n    sequence_length=1024,\n    target_path="./exported"\n)\n'})})}),(0,i.jsx)(s,{value:"bash",label:"Bash",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'sparseml.export \\\n    "./one-shot-example/stage_compression" \\\n    --task "text-generation" \\\n    --sequence_length 1024 \\\n    --target_path "./exported"\n'})})})]}),"\n",(0,i.jsxs)(n.p,{children:["The exported model located at ",(0,i.jsx)(n.code,{children:"./exported"})," can now be used for efficient inference with DeepSparse.\nTo do so, sub in the exported model within the previous ",(0,i.jsx)(n.a,{href:"./deploy",children:"Getting Started - Deploy"})," guide for your desired deployment method."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.p,{children:"Want to dive into more about one-shot sparsification with Neural Magic? Here are a few paths to consider:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)("b",{children:"Specialize in LLMs:"})," Dive deeper into text generation techniques within our ",(0,i.jsx)(n.a,{href:"../llms",children:"LLMs section"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)("b",{children:"Expand to Other Domains:"})," Explore how to optimize models for ",(0,i.jsx)(n.a,{href:"../computer-vision",children:"Computer Vision"})," or ",(0,i.jsx)(n.a,{href:"../nlp",children:"Natural Language Processing"})," tasks."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)("b",{children:"Tailor to Your Needs:"})," Learn about flexible sparsification options in our ",(0,i.jsx)(n.a,{href:"../custom-integrations",children:"Custom Integrations section"}),"."]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}function m(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},8453:(e,n,a)=>{a.d(n,{R:()=>r,x:()=>o});var i=a(6540);const t={},s=i.createContext(t);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);