"use strict";(self.webpackChunkdocs_neuralmagic_com=self.webpackChunkdocs_neuralmagic_com||[]).push([[8907],{8840:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var r=a(4848),t=a(8453);const s={tags:["fine-tuning","optimization","llm","sparsezoo","performance","neural magic"],keywords:["LLM fine-tuning","SparseML","efficient inference","sparse transfer learning"],description:"Adapt large language models (LLMs) to new domains and tasks using sparse transfer learning with Neural Magic's SparseML. Maintain accuracy while optimizing for efficiency.",sidebar_label:"Sparse Transfer",sidebar_position:4},i="Sparse Transferring LLMs",o={id:"get-started/transfer",title:"Sparse Transferring LLMs",description:"Adapt large language models (LLMs) to new domains and tasks using sparse transfer learning with Neural Magic's SparseML. Maintain accuracy while optimizing for efficiency.",source:"@site/versioned_docs/version-1.7.0/get-started/transfer.mdx",sourceDirName:"get-started",slug:"/get-started/transfer",permalink:"/get-started/transfer",draft:!1,unlisted:!1,editUrl:"https://github.com/neuralmagic/docs-v2/tree/main/docs/get-started/transfer.mdx",tags:[{label:"fine-tuning",permalink:"/tags/fine-tuning"},{label:"optimization",permalink:"/tags/optimization"},{label:"llm",permalink:"/tags/llm"},{label:"sparsezoo",permalink:"/tags/sparsezoo"},{label:"performance",permalink:"/tags/performance"},{label:"neural magic",permalink:"/tags/neural-magic"}],version:"1.7.0",sidebarPosition:4,frontMatter:{tags:["fine-tuning","optimization","llm","sparsezoo","performance","neural magic"],keywords:["LLM fine-tuning","SparseML","efficient inference","sparse transfer learning"],description:"Adapt large language models (LLMs) to new domains and tasks using sparse transfer learning with Neural Magic's SparseML. Maintain accuracy while optimizing for efficiency.",sidebar_label:"Sparse Transfer",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Sparse Fine-Tuning",permalink:"/get-started/finetune"},next:{title:"LLMs - Causal Language Modeling",permalink:"/llms/"}},l={},d=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Sparse Transferring a Llama Model",id:"sparse-transferring-a-llama-model",level:2},{value:"Data Preparation",id:"data-preparation",level:3},{value:"Sparse Transfer",id:"sparse-transfer",level:3},{value:"Inference",id:"inference",level:3}];function p(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components},{Details:a,TabItem:s,Tabs:i}=n;return a||m("Details",!0),s||m("TabItem",!0),i||m("Tabs",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"sparse-transferring-llms",children:"Sparse Transferring LLMs"}),"\n",(0,r.jsx)(n.p,{children:"This guide focuses on adapting large language models (LLMs) to new domains and tasks using sparse transfer learning.\nBy leveraging a pre-sparsified model's structure, you can efficiently fine-tune on new data, leading to reduced hyperparameter tuning, training times, and computational costs."}),"\n",(0,r.jsx)(n.p,{children:"You'll learn how to:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)("b",{children:"Adapt to New Domains:"})," Transfer knowledge from a pre-sparsified LLM to excel in particular domains or use cases."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)("b",{children:"Quantize for Efficiency:"})," Apply one-shot quantization to the model to further optimize for efficient inference."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)("b",{children:"Training Environment:"})," A system that meets the minimum hardware and software requirements as outlined in the ",(0,r.jsx)(n.a,{href:"./install/#prerequisites",children:"Install Guide"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)("b",{children:"SparseML LLM Installation:"})," An environment with DeepSparse for LLMs installed as outlined in the ",(0,r.jsx)(n.a,{href:"./install#llms---causal-language-modeling",children:"Install Guide"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)("b",{children:"Background:"})," Familiarity with Generative AI and working with large language models is recommended."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"sparse-transferring-a-llama-model",children:"Sparse Transferring a Llama Model"}),"\n",(0,r.jsx)(n.p,{children:"We'll use a pre-sparsified 7b Llama 2 instruction tuning model from the SparseZoo fine-tuned on the OpenPlatypus dataset.\nThe model is referenced by the following SparseZoo stub:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-text",children:"zoo:llama2-7b-open_platypus_orca_llama2_pretrain-pruned60\n"})}),"\n",(0,r.jsx)(n.h3,{id:"data-preparation",children:"Data Preparation"}),"\n",(0,r.jsx)(n.p,{children:"A dataset is required for transferring the pre-sparsified model's structure.\nFor this example, we'll use the Helpful Instructions dataset from the Hugging Face H4 team, which is available in the Hugging Face dataset hub and can be loaded as follows:"}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)(s,{value:"python",label:"Python",default:!0,children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from datasets import load_dataset\n\ndataset = load_dataset("HuggingFaceH4/helpful_instructions")\n'})})}),(0,r.jsx)(s,{value:"bash",label:"Bash",default:!0,children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'--dataset "HuggingFaceH4/helpful_instructions"\n'})})})]}),"\n",(0,r.jsxs)(n.p,{children:["For comprehensive data preparation guidelines, including formats like CSV and JSONL, refer to our ",(0,r.jsx)(n.a,{href:"../llms/data",children:"detailed datasets guide"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"sparse-transfer",children:"Sparse Transfer"}),"\n",(0,r.jsxs)(n.p,{children:["Creating sparse models from scratch can be time-consuming and computationally expensive.\nSparse transfer learning, however, allows you to leverage pre-sparsified models to adapt to new domains and tasks efficiently without extensive training.\nAs in the one-shot and fine-tuning guides, we'll use a recipe and the ",(0,r.jsx)(n.code,{children:"compress"})," command in SparseML to the pre-sparsified model from the SparseZoo."]}),"\n",(0,r.jsx)(n.p,{children:"The code below demonstrates fine-tuning the model while preserving the sparsity and at the end, one-shot quantization to the Llama model utilizing a recipe:"}),"\n",(0,r.jsx)(i,{children:(0,r.jsx)(s,{value:"python",label:"Python",default:!0,children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from sparseml.transformers import (\n    SparseAutoModelForCausalLM, SparseAutoTokenizer, load_dataset, compress\n)\n\nmodel = SparseAutoModelForCausalLM.from_pretrained(\n    "zoo:llama2-7b-open_platypus_orca_llama2_pretrain-pruned60",\n    device_map="auto",\n)\ntokenizer = SparseAutoTokenizer.from_pretrained(\n    "zoo:llama2-7b-open_platypus_orca_llama2_pretrain-pruned60"\n).to(model.device)\ndataset = load_dataset("HuggingFaceH4/helpful_instructions")\n\ndef format_data(data):\n    return {\n        "text": data["prompt"] + data["completion"]\n    }\n\ndataset = dataset.map(format_data)\n\nrecipe = """\nfinetune_stage:\n    run_type: train\n    finetune_modifiers:\n        ConstantPruningModifier:\n            targets: ["re:.*q_proj.weight", "re:.*k_proj.weight", "re:.*v_proj.weight", "re:.*o_proj.weight", "re:.*gate_proj.weight", "re:.*up_proj.weight", "re:.*down_proj.weight"]\n            start: 0\n\nstage_quantization:\n    run_type: oneshot\n    quantize_modifiers:\n        QuantizationModifier:\n            ignore: [LlamaRotaryEmbedding, LlamaRMSNorm, SiLUActivation, MatMulOutput_QK, MatMulOutput_PV]\n            post_oneshot_calibration: true\n            scheme_overrides:\n                Linear:\n                    weights:\n                        num_bits: 8\n                        symmetric: true\n                        strategy: channel\n                MatMulLeftInput_QK:\n                    input_activations:\n                        num_bits: 8\n                        symmetric: true\n                Embedding:\n                    input_activations: null\n                    weights:\n                        num_bits: 8\n                        symmetric: false\n        SparseGPTModifier:\n            quantize: True\n            targets: [model.layers.0, model.layers.1, model.layers.2, model.layers.3, model.layers.4, model.layers.5, model.layers.6, model.layers.7, model.layers.8, model.layers.9, model.layers.10, model.layers.11, model.layers.12, model.layers.13, model.layers.14, model.layers.15, model.layers.16, model.layers.17, model.layers.18, model.layers.19, model.layers.20, model.layers.21, model.layers.22, model.layers.23, model.layers.24, model.layers.25, model.layers.26, model.layers.27, model.layers.28, model.layers.29, model.layers.30, model.layers.31, lm_head]\n"""\n\ncompress(\n    model=model,\n    tokenizer=tokenizer,\n    dataset=dataset,\n    recipe=recipe,\n    output_dir="./transfer-example"\n)\n'})})})}),"\n",(0,r.jsx)(n.p,{children:"After running the above code, the model is transferred to the Helpful Instructions dataset with 60% sparsity and quantization, resulting in a smaller model ready for efficient inference."}),"\n",(0,r.jsx)(n.h3,{id:"inference",children:"Inference"}),"\n",(0,r.jsxs)(a,{children:[(0,r.jsx)("summary",{children:"Evaluating Accuracy"}),(0,r.jsx)(n.p,{children:"Evaluating the model's accuracy is important to ensure it meets the desired performance requirements.\nTo do so, we can use the following code to evaluate the model's perplexity on a sample dataset:"}),(0,r.jsxs)(i,{children:[(0,r.jsx)(s,{value:"python",label:"Python",default:!0,children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from sparseml import evaluate\n\neval = evaluate(\n    "./transfer-example/stage_quantization",\n    datasets="openai_humaneval",\n    integration="perplexity",\n    text_column_name=["prompt", "canonical_solution"]\n)\nprint(eval)\n'})})}),(0,r.jsx)(s,{value:"bash",label:"Bash",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'sparseml.evaluate \\\n    "./transfer-example/stage_quantization" \\\n    --datasets "openai_humaneval" \\\n    --integration "perplexity" \\\n    --text_column_name prompt \\\n    --text_column_name canonical_solution\n'})})})]})]}),"\n",(0,r.jsx)(n.p,{children:"After sparsifying the model, it is ready for evaluation and deployment.\nTo test the model's generation capabilities, we can use the following code to generate text utilizing PyTorch:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from sparseml.transformers import SparseAutoModelForCausalLM, SparseAutoTokenizer\n\nmodel_path = "./transfer-example/stage_quantization"\nmodel = SparseAutoModelForCausalLM.from_pretrained(model_path, device_map="auto")\ntokenizer = SparseAutoTokenizer.from_pretrained(model_path).to(model.device)\ninputs = tokenizer(["Large language models are"], return_tensors="pt")\ngenerated_ids = model.generate(**inputs)\noutputs = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)\nprint(outputs)\n'})}),"\n",(0,r.jsx)(n.p,{children:"The above code, however, does not leverage the sparsity within the model for efficient inference.\nTo do so, we need to export the model to ONNX to be ready for efficient inference on CPUs with DeepSparse.\nSparseML provides a simple export command to do so:"}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)(s,{value:"python",label:"Python",default:!0,children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'from sparseml import export\n\nexport(\n    "./transfer-example/stage_quantization",\n    task="text-generation",\n    sequence_length=1024,\n    target_path="./exported"\n)\n'})})}),(0,r.jsx)(s,{value:"bash",label:"Bash",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'sparseml.export \\\n    "./transfer-example/stage_quantization" \\\n    --task "text-generation" \\\n    --sequence_length 1024 \\\n    --target_path "./exported"\n'})})})]}),"\n",(0,r.jsxs)(n.p,{children:["The exported model located at ",(0,r.jsx)(n.code,{children:"./exported"})," can now be used for efficient inference with DeepSparse.\nTo do so, sub in the exported model within the previous ",(0,r.jsx)(n.a,{href:"./deploy",children:"Getting Started - Deploy"})," guide for your desired deployment method."]}),"\n",(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.p,{children:"Want to dive into more about one-shot sparsification with Neural Magic? Here are a few paths to consider:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)("b",{children:"Specialize in LLMs:"})," Dive deeper into text generation techniques within our ",(0,r.jsx)(n.a,{href:"../llms",children:"LLMs section"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)("b",{children:"Expand to Other Domains:"})," Explore how to optimize models for ",(0,r.jsx)(n.a,{href:"../computer-vision",children:"Computer Vision"})," or ",(0,r.jsx)(n.a,{href:"../nlp",children:"Natural Language Processing"})," tasks."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)("b",{children:"Tailor to Your Needs:"})," Learn about flexible sparsification options in our ",(0,r.jsx)(n.a,{href:"../custom-integrations",children:"Custom Integrations section"}),"."]}),"\n"]})]})}function c(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}function m(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},8453:(e,n,a)=>{a.d(n,{R:()=>i,x:()=>o});var r=a(6540);const t={},s=r.createContext(t);function i(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);