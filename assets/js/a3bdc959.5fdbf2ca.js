"use strict";(self.webpackChunkdocs_neuralmagic_com=self.webpackChunkdocs_neuralmagic_com||[]).push([[9987],{9961:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>d});var o=t(4848),i=t(8453);const s={sidebar_position:3},a="Compress LLMs With SparseGPT",r={id:"llms/guides/one-shot-llms-with-sparseml",title:"Compress LLMs With SparseGPT",description:"This page describes how to perform one-shot quantization of large language models using SparseML. This workflow requires a GPU with at least 16GB VRAM and 64GB of system RAM.",source:"@site/versioned_docs/version-1.7.0/llms/guides/one-shot-llms-with-sparseml.mdx",sourceDirName:"llms/guides",slug:"/llms/guides/one-shot-llms-with-sparseml",permalink:"/llms/guides/one-shot-llms-with-sparseml",draft:!1,unlisted:!1,editUrl:"https://github.com/neuralmagic/docs/tree/main/docs/llms/guides/one-shot-llms-with-sparseml.mdx",tags:[],version:"1.7.0",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Convert LLMs From Hugging Face",permalink:"/llms/guides/hf-llm-to-deepsparse"},next:{title:"LLM Serving on Windows",permalink:"/llms/guides/llm-serving-on-windows"}},l={},d=[{value:"Note on system requirements",id:"note-on-system-requirements",level:3},{value:"How to Clone and Install the Latest SparseML",id:"how-to-clone-and-install-the-latest-sparseml",level:2},{value:"How to One-Shot TinyLlama",id:"how-to-one-shot-tinyllama",level:2},{value:"How to Evaluate the One-shot Model",id:"how-to-evaluate-the-one-shot-model",level:2},{value:"How to Export the One-Shot Model",id:"how-to-export-the-one-shot-model",level:2},{value:"Using the Model With DeepSparse",id:"using-the-model-with-deepsparse",level:2},{value:"Upload Model to Hugging Face",id:"upload-model-to-hugging-face",level:2},{value:"Explaining the TinyLlama Recipe",id:"explaining-the-tinyllama-recipe",level:2},{value:"How to Adapt a Recipe for a New Model",id:"how-to-adapt-a-recipe-for-a-new-model",level:2},{value:"Conclusion",id:"conclusion",level:2}];function c(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"compress-llms-with-sparsegpt",children:"Compress LLMs With SparseGPT"}),"\n",(0,o.jsxs)(n.p,{children:["This page describes how to perform one-shot quantization of large language models using ",(0,o.jsx)(n.a,{href:"https://github.com/neuralmagic/sparseml",children:"SparseML"}),". This workflow requires a GPU with at least 16GB VRAM and 64GB of system RAM."]}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsx)(n.h3,{id:"note-on-system-requirements",children:"Note on system requirements"}),"\n",(0,o.jsxs)(n.p,{children:["Due to inefficiencies in PyTorch ONNX export, a lot of system memory is required to export the models for inference. There are ",(0,o.jsx)(n.a,{href:"https://github.com/pytorch/pytorch/commit/b4a49124c8165a374a3ef49e14807ac05b3fc030",children:"improvements coming in 2.2"}),"."]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"how-to-clone-and-install-the-latest-sparseml",children:"How to Clone and Install the Latest SparseML"}),"\n",(0,o.jsx)(n.p,{children:"You'll need the latest version of SparseML to run the one-shot workflow. We recommend that you do this from source and in a fresh Python environment to avoid any issues."}),"\n",(0,o.jsx)(n.p,{children:"Clone the SparseML repo and install it locally:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:'git clone https://github.com/neuralmagic/sparseml\npip install -e "sparseml[transformers]"\n'})}),"\n",(0,o.jsx)(n.h2,{id:"how-to-one-shot-tinyllama",children:"How to One-Shot TinyLlama"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v0.4",children:"TinyLlama-1.1B-Chat"})," is an LLM that we can quantize in a short time because it has 1.1B parameters."]}),"\n",(0,o.jsx)(n.p,{children:"Perform one-shot using the OBCQ algorithm. The command takes the following parameters:"}),"\n",(0,o.jsx)(n.p,{children:"positional arguments:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"model_name"})," a path to Hugging Face stub"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"dataset_name"})," Hugging Face dataset to extract calibration data from. Example of supported datasets: ",(0,o.jsx)(n.code,{children:"{c4,evolcodealpaca,gsm8k,open_platypus,ptb,wikitext2}"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"options:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"--dataset_config_name"})," Specific configuration to extract from the dataset, i.e. ",(0,o.jsx)(n.code,{children:"wikitext2-raw-v1"})," for ",(0,o.jsx)(n.code,{children:"wikitext2"})]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"--nsamples"})," number of samples to extract from the dataset, defaults to 512."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"--seqlen"})," Maximum input sequence length to truncate calibration data to, defaults to model's max sequence length"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"--concat_data"})," Whether or not to concatenate samples to fill the full seqlen, defaults to False"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"--output_dir"})," the directory where the model will be saved, defaults to ",(0,o.jsx)(n.code,{children:"obcq_deployment"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"--recipe"})," the file containing the one-shot hyperparameters."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"--device"})," which device to load the model onto, either ",(0,o.jsx)(n.code,{children:"cpu"})," or a specific ",(0,o.jsx)(n.code,{children:"cuda:0"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"--precision"})," precision to load model as, either auto (default), half, full, float16 or float32."]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Example command:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"wget https://huggingface.co/nm-testing/TinyLlama-1.1B-Chat-v0.4-pruned50-quant/raw/main/recipe.yaml # download recipe\nsparseml.transformers.text_generation.oneshot \\\n --model TinyLlama/TinyLlama-1.1B-Chat-v1.0 \\\n --dataset open_platypus --recipe recipe.yaml \\\n --output_dir ./obcq_deployment \\\n --precision float16\n"})}),"\n",(0,o.jsx)(n.h2,{id:"how-to-evaluate-the-one-shot-model",children:"How to Evaluate the One-shot Model"}),"\n",(0,o.jsxs)(n.p,{children:["Next, evaluate the model's performance using the ",(0,o.jsx)(n.a,{href:"https://github.com/neuralmagic/lm-evaluation-harness",children:"lm-evaluation-harness framework"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"Clone the forked repository with SparseML support and install it:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/neuralmagic/lm-evaluation-harness.git\ncd lm-evaluation-harness\npip install -e .\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Evaluate on the ",(0,o.jsx)(n.code,{children:"hellaswag"})," task:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:'start=`date +%s`\npython main.py \\\n --model hf-causal-experimental \\\n --model_args pretrained=../obcq_deployment,trust_remote_code=True \\\n --tasks hellaswag \\\n --batch_size 64 \\\n --no_cache \\\n --write_out \\\n --output_path "../obcq_deployment/hellaswag.json" \\\n --device "cuda:0" \\\n --num_fewshot 0\nend=`date +%s`\necho Execution time was `expr $end - $start` seconds.\n'})}),"\n",(0,o.jsx)(n.p,{children:"The results obtained in this case are:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'Running loglikelihood requests\n100%|\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588| 40145/40145 [20:47<00:00, 32.19it/s] \n{\n  "results": {\n    "hellaswag": {\n      "acc": 0.40141406094403503,\n      "acc_stderr": 0.004891826692722827,\n      "acc_norm": 0.5115514837681737,\n      "acc_norm_stderr": 0.004988449593007253\n    }\n  },\n  "versions": {\n    "hellaswag": 0\n  },\n  "config": {\n    "model": "hf-causal-experimental",\n    "model_args": {\n      "pretrained": "/home/mwitiderrick/neuralmagic/sparseml/obcq_deployment",\n      "trust_remote_code": true\n    },\n    "num_fewshot": 0,\n    "batch_size": "64",\n    "batch_sizes": [],\n    "device": "cuda:0",\n    "no_cache": true,\n    "limit": null,\n    "bootstrap_iters": 100000,\n    "description_dict": {}\n  }\n}\nhf-causal-experimental (pretrained=/home/mwitiderrick/neuralmagic/sparseml/obcq_deployment,trust_remote_code=True), limit: None, provide_description: False, num_fewshot: 0, batch_size: 64\n| Task      | Version | Metric   |  Value |     | Stderr |\n| --------- | ------: | -------- | -----: | --- | -----: |\n| hellaswag |       0 | acc      | 0.4014 | \xb1   | 0.0049 |\n|           |         | acc_norm | 0.5116 | \xb1   | 0.0050 |\n\nExecution time was 1288 seconds.\n'})}),"\n",(0,o.jsxs)(n.p,{children:["Repeat the above on other tasks such as ",(0,o.jsx)(n.code,{children:"truthfulqa-mc"}),", ",(0,o.jsx)(n.code,{children:"winogrande"}),", and ",(0,o.jsx)(n.code,{children:"drop"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"how-to-export-the-one-shot-model",children:"How to Export the One-Shot Model"}),"\n",(0,o.jsxs)(n.p,{children:["Once you are certain the model is performing as expected, you can export it for inference. The ",(0,o.jsx)(n.code,{children:"sparseml.export"})," command provides the functions for doing this. Running the command below creates a ",(0,o.jsx)(n.code,{children:"deployment"})," directory containing all the artifacts that are needed for inference with DeepSparse. It will also inject KV Cache to reduce the model\u2019s computational overhead and speed up inference by caching the Key and Value states."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"sparseml.export --task text-generation obcq_deployment/\n"})}),"\n",(0,o.jsx)(n.h2,{id:"using-the-model-with-deepsparse",children:"Using the Model With DeepSparse"}),"\n",(0,o.jsxs)(n.p,{children:["Next, run inference using DeepSparse. Ensure you have the latest version of DeepSparse installed with ",(0,o.jsx)(n.code,{children:"pip install -U deepsparse-nightly[llm]"})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'from deepsparse import TextGeneration\n\nprompt = "How to get in a good university?"\nformatted_prompt =  f"<|im_start|>user\\n{prompt}<|im_end|>\\n<|im_start|>assistant\\n"\n\nmodel = TextGeneration(model="obcq_deployment/deployment")\nprint(model(formatted_prompt, max_new_tokens=200).generations[0].text)\n"""\nThere are many factors to consider when choosing a university. Here are some tips for getting into a good university:\n\n1. Research your options: Consider the schools in your area and the ones in your desired location. Research their reputation, tuition, and academic programs.\n\n2. Apply to multiple universities: Apply to multiple universities, ensuring that you are applying to the best option for you.\n\n3. Get a job: If you are applying to a university, you will need to find a job to support your studies. This will help you budget and manage your time.\n\n4. Get involved with your community: Your university will likely have a community of students and faculty. Engage with this community by volunteering, participating in clubs, and engaging with others in your community.\n\n5. Get involved with extracurricular activities: Universities often have many extracurricular activities, which can help you meet new people.\n"""\n'})}),"\n",(0,o.jsxs)(n.p,{children:["Check out the ",(0,o.jsx)(n.a,{href:"https://github.com/neuralmagic/deepsparse/blob/main/src/deepsparse/transformers/text_generation.md",children:"DeepSparse pipeline text generation docs"})," for the full list of supported parameters."]}),"\n",(0,o.jsx)(n.h2,{id:"upload-model-to-hugging-face",children:"Upload Model to Hugging Face"}),"\n",(0,o.jsx)(n.p,{children:"You may want to upload the one-shot model to Hugging Face for ease of reference or to share it with your colleagues."}),"\n",(0,o.jsxs)(n.p,{children:["Head over to your ",(0,o.jsx)(n.a,{href:"https://huggingface.co/new",children:"Hugging Face account"})," and create a model named ",(0,o.jsx)(n.code,{children:"TinyLlama-1.1B-Chat-v0.4-pruned50-quant"}),". Then upload the one-shot model:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'from huggingface_hub import HfApi\napi = HfApi()\napi.upload_folder(\n    folder_path="deployment",\n    repo_id="YOUR_HF_USERNAME/TinyLlama-1.1B-Chat-v0.4-pruned50-quant",\n    repo_type="model",\n    token="HF_WRITE_TOKEN"\n)\n'})}),"\n",(0,o.jsx)(n.h2,{id:"explaining-the-tinyllama-recipe",children:"Explaining the TinyLlama Recipe"}),"\n",(0,o.jsxs)(n.p,{children:["A recipe is a set of hyperparameters that provide detailed instructions on how the ",(0,o.jsx)(n.a,{href:"https://neuralmagic.com/video/pruning-and-quantizing-ml-models-with-one-shot-without-retraining/",children:"one-shot quantization"})," should be done. The recipe performs quantization in one shot, meaning that no retraining of the LLM is required."]}),"\n",(0,o.jsx)(n.p,{children:"We will now walk through what the different hyperparameters mean and why they are set to those values."}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"SmoothQuantModifier"})," is a technique used for dealing with outliers in the weights and activations of the LLM because quantization is very sensitive to large variations in their values. For TinyLlama a ",(0,o.jsx)(n.code,{children:"smoothing_strength"})," value of 0.8 resulted in a model with repetitions in its output but the problem was solved by lowering the value to 0.5."]}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"ignore"})," parameter under ",(0,o.jsx)(n.code,{children:"QuantizationModifier"})," allows us to define operations that either don't make sense to quantize or operations that are too sensitive to quantize. Performing quantization on sensitive operations will affect the final accuracy of the model. We also don't quantize the inputs to the embedding layer."]}),"\n",(0,o.jsxs)(n.p,{children:["Under ",(0,o.jsx)(n.code,{children:"SparseGPTModifier"}),", we define ",(0,o.jsx)(n.code,{children:"sparsity"})," as 0.5 because we are aiming for a model that is 50% quantized. The other parameters are:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"block_size"})," determines the number of columns to compress in one pass."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"quantize"})," whether or not to quantize weights during SparseGPT.  A default quantization modifier will be applied when ",(0,o.jsx)(n.code,{children:"quantize"})," is set to ",(0,o.jsx)(n.code,{children:"True"})," and there is no ",(0,o.jsx)(n.code,{children:"QuantizationModifier"})," in the recipe."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"dampening_frac"})," amount of dampening to apply to H, as a fraction of the diagonal norm."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"sequential_update"})," whether or not to update weights sequentially by layer, True saves on GPU memory."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"mask_structure"}),' string to define the structure of the mask to apply, "0:0" means that it\'s an unstructured mask. Setting it to "16:32" would mean that 16 out of every 32 weights will be zeroed out (structured sparsity).']}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"targets"})," list of layer names to compress during OBCQ, or '",(0,o.jsx)(n.strong,{children:"ALL"}),"' to compress every layer in the model."]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:'test_stage:\n  obcq_modifiers:\n    SmoothQuantModifier:\n      smoothing_strength: 0.5\n      mappings: [\n        [["re:.*q_proj", "re:.*k_proj", "re:.*v_proj"], "re:.*input_layernorm"],\n        [["re:.*gate_proj", "re:.*up_proj"], "re:.*post_attention_layernorm"]\n      ]\n    QuantizationModifier:\n      ignore:\n      # These operations don\'t make sense to quantize\n      - LlamaRotaryEmbedding\n      - LlamaRMSNorm\n      - SiLUActivation\n      # Skip quantizing the BMMs\n      - QuantizableMatMul\n      # Skip quantizing the layers with the most sensitive activations\n      - model.layers.21.mlp.down_proj\n      - model.layers.7.mlp.down_proj\n      - model.layers.2.mlp.down_proj\n      - model.layers.20.mlp.down_proj\n      - model.layers.19.mlp.down_proj\n      post_oneshot_calibration: true\n      scheme_overrides:\n        Embedding:\n          input_activations: null\n          weights:\n            num_bits: 8\n            symmetric: false\n    SparseGPTModifier:\n      sparsity: 0.5\n      block_size: 128\n      sequential_update: true\n      quantize: true\n      percdamp: 0.01\n      mask_structure: "0:0"\n      targets: ["re:model.layers.\\\\d*$"]\n'})}),"\n",(0,o.jsx)(n.h2,{id:"how-to-adapt-a-recipe-for-a-new-model",children:"How to Adapt a Recipe for a New Model"}),"\n",(0,o.jsxs)(n.p,{children:["You can modify the above recipe to perform one-shot quantization on other models, for example ",(0,o.jsx)(n.a,{href:"https://huggingface.co/docs/transformers/main/model_doc/mistral",children:"Mistral"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"Perform the following modifications on the recipe to one-shot a Mistral model."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Define the operations we want to skip during quantization, that is sensitive layers and operations that don't make sense to quantize."}),"\n",(0,o.jsx)(n.li,{children:"Declare the desired sparsity level, the same as the one for TinyLlama."}),"\n",(0,o.jsx)(n.li,{children:"State the layers to compress during OBCQ."}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Here is what the final recipe looks like:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:'test_stage:\n  obcq_modifiers:\n    SmoothQuantModifier:\n      smoothing_strength: 0.5\n      mappings: [\n        [["re:.*q_proj", "re:.*k_proj", "re:.*v_proj"], "re:.*input_layernorm"],\n        [["re:.*gate_proj", "re:.*up_proj"], "re:.*post_attention_layernorm"]\n      ]\n    QuantizationModifier:\n      ignore:\n      # These operations don\'t make sense to quantize\n      - MistralRotaryEmbedding\n      - MistralRMSNorm\n      - SiLUActivation\n      # Skip quantizing the layers with the most sensitive activations\n      - model.layers.1.mlp.down_proj\n      - model.layers.31.mlp.down_proj\n      - model.layers.30.mlp.down_proj\n      - model.layers.30.mlp.gate_proj\n      - model.layers.30.mlp.up_proj\n      post_oneshot_calibration: true\n      scheme_overrides:\n        Embedding:\n          input_activations: null\n          weights:\n            num_bits: 8\n            symmetric: false\n    SparseGPTModifier:\n      sparsity: 0.5\n      block_size: 128\n      sequential_update: true\n      quantize: true\n      percdamp: 0.01\n      mask_structure: "0:0"\n      targets: ["re:model.layers.\\\\d*$"]\n'})}),"\n",(0,o.jsxs)(n.p,{children:["Save the recipe to a file named ",(0,o.jsx)(n.code,{children:"recipe.yaml"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["Run one-shot quantization on any Mistral-based model, for example, ",(0,o.jsx)(n.code,{children:"zephyr-7b-beta"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"sparseml.transformers.text_generation.oneshot \\\n --model HuggingFaceH4/zephyr-7b-beta \\\n --dataset open_platypus \\\n --recipe recipe.yaml \\\n --output_dir ./output_oneshot \\\n --precision float16\n"})}),"\n",(0,o.jsxs)(n.p,{children:["We set ",(0,o.jsx)(n.code,{children:"precision"})," to ",(0,o.jsx)(n.code,{children:"float16"})," because quantization is not supported for the ",(0,o.jsx)(n.code,{children:"bfloat16"})," data type as of this writing."]}),"\n",(0,o.jsx)(n.p,{children:"Repeat the other processes as shown previously."}),"\n",(0,o.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,o.jsxs)(n.p,{children:["In case of any questions, submit an ",(0,o.jsx)(n.a,{href:"https://github.com/neuralmagic/sparseml",children:"issue on GItHub"})," or join other LLM developers on our ",(0,o.jsx)(n.a,{href:"https://join.slack.com/t/discuss-neuralmagic/shared_invite/zt-q1a1cnvo-YBoICSIw3L1dmQpjBeDurQ",children:"community"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var o=t(6540);const i={},s=o.createContext(i);function a(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);