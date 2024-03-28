"use strict";(self.webpackChunkdocs_neuralmagic_com=self.webpackChunkdocs_neuralmagic_com||[]).push([[8401],{1202:(e,n,t)=>{t.d(n,{A:()=>_});var s=t(6540),o=t(2303),i=t(4164),a=t(6058),r=t(7559),l=t(4291);const c={codeBlockContainer:"codeBlockContainer_APcc"};var d=t(4848);function u(e){let{as:n,...t}=e;const s=(0,a.A)(),o=(0,l.M$)(s);return(0,d.jsx)(n,{...t,style:o,className:(0,i.A)(t.className,c.codeBlockContainer,r.G.common.codeBlock)})}const m={codeBlockOutput:"codeBlockOutput_bUDZ",codeBlockOutputDivider:"codeBlockOutputDivider_o5Rf",codeBlockOutputContent:"codeBlockOutputContent_dwqt",codeBlockContent:"codeBlockContent_m3Ux",codeBlockTitle:"codeBlockTitle_P25_",codeBlock:"codeBlock_qGQc",codeBlockStandalone:"codeBlockStandalone_zC50",codeBlockLines:"codeBlockLines_p187",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_OFgW",buttonGroup:"buttonGroup_6DOT"};function p(e){let{children:n,className:t}=e;return(0,d.jsx)(u,{as:"pre",tabIndex:0,className:(0,i.A)(m.codeBlockStandalone,"thin-scrollbar",t),children:(0,d.jsx)("code",{className:m.codeBlockLines,children:n})})}var h=t(6342),g=t(6591),f=t(1765);const b={codeLine:"codeLine_iPqp",codeLineNumber:"codeLineNumber_F4P7",codeLineContent:"codeLineContent_pOih"};function v(e){let{line:n,classNames:t,showLineNumbers:s,getLineProps:o,getTokenProps:a}=e;1===n.length&&"\n"===n[0].content&&(n[0].content="");const r=o({line:n,className:(0,i.A)(t,s&&b.codeLine)}),l=n.map(((e,n)=>(0,d.jsx)("span",{...a({token:e,key:n})},n)));return(0,d.jsxs)("span",{...r,children:[s?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("span",{className:b.codeLineNumber}),(0,d.jsx)("span",{className:b.codeLineContent,children:l})]}):l,(0,d.jsx)("br",{})]})}var x=t(6861),N=t(1312),k=t(1473),j=t(4115);const w={copyButtonCopied:"copyButtonCopied__QnY",copyButtonIcons:"copyButtonIcons_FhaS",copyButtonIcon:"copyButtonIcon_phi_",copyButtonSuccessIcon:"copyButtonSuccessIcon_FfTR"};function y(e){let{code:n,className:t}=e;const[o,a]=(0,s.useState)(!1),r=(0,s.useRef)(void 0),l=(0,s.useCallback)((()=>{(0,x.A)(n),a(!0),r.current=window.setTimeout((()=>{a(!1)}),1e3)}),[n]);return(0,s.useEffect)((()=>()=>window.clearTimeout(r.current)),[]),(0,d.jsx)("button",{type:"button","aria-label":o?(0,N.T)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,N.T)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,N.T)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,i.A)("clean-btn",t,w.copyButton,o&&w.copyButtonCopied),onClick:l,children:(0,d.jsxs)("span",{className:w.copyButtonIcons,"aria-hidden":"true",children:[(0,d.jsx)(k.A,{className:w.copyButtonIcon}),(0,d.jsx)(j.A,{className:w.copyButtonSuccessIcon})]})})}var C=t(5048);const L={wordWrapButtonIcon:"wordWrapButtonIcon_iowe",wordWrapButtonEnabled:"wordWrapButtonEnabled_gY8A"};function T(e){let{className:n,onClick:t,isEnabled:s}=e;const o=(0,N.T)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,d.jsx)("button",{type:"button",onClick:t,className:(0,i.A)("clean-btn",n,s&&L.wordWrapButtonEnabled),"aria-label":o,title:o,children:(0,d.jsx)(C.A,{className:L.wordWrapButtonIcon,"aria-hidden":"true"})})}function B(e){let{children:n,className:t="",metastring:s,title:o,showLineNumbers:r,language:c}=e;const{prism:{defaultLanguage:p,magicComments:b}}=(0,h.p)(),x=function(e){return e?.toLowerCase()}(c??(0,l.Op)(t)??p),N=(0,a.A)(),k=(0,g.f)(),j=(0,l.wt)(s)||o,w=function(e){if(!e.includes("<output>")||!e.includes("</output>"))return{code:e,output:null};const n=/.*<output>([\s\S]*?)<\/output>/i,t=e.replace(n,"").trim();let s=e.match(n)?.[1].trim();const o=/^[ \t]*(\/\/|\/\*|\*\/|#|--)/gm;return s=s.split("\n").map((e=>e.replace(o,""))).join("\n").trim(),{code:t,output:s}}(n),{lineClassNames:C,code:L}=(0,l.Li)(w.code,{metastring:s,language:x,magicComments:b}),B=r??(0,l._u)(s);return(0,d.jsxs)(u,{as:"div",className:(0,i.A)(t,x&&!t.includes(`language-${x}`)&&`language-${x}`),children:[j&&(0,d.jsx)("div",{className:m.codeBlockTitle,children:j}),(0,d.jsxs)("div",{className:m.codeBlockContent,children:[(0,d.jsx)(f.f4,{theme:N,code:L,language:x??"text",children:e=>{let{className:n,style:t,tokens:s,getLineProps:o,getTokenProps:a}=e;return(0,d.jsx)("pre",{tabIndex:0,ref:k.codeBlockRef,className:(0,i.A)(n,m.codeBlock,"thin-scrollbar"),style:t,children:(0,d.jsx)("code",{className:(0,i.A)(m.codeBlockLines,B&&m.codeBlockLinesWithNumbering),children:s.map(((e,n)=>(0,d.jsx)(v,{line:e,getLineProps:o,getTokenProps:a,classNames:C[n],showLineNumbers:B},n)))})})}}),w.output&&(0,d.jsxs)("div",{className:m.codeBlockOutput,children:[(0,d.jsx)("div",{className:m.codeBlockOutputDivider}),(0,d.jsx)("div",{className:m.codeBlockOutputContent,children:w.output})]}),(0,d.jsxs)("div",{className:m.buttonGroup,children:[(k.isEnabled||k.isCodeScrollable)&&(0,d.jsx)(T,{className:m.codeButton,onClick:()=>k.toggle(),isEnabled:k.isEnabled}),(0,d.jsx)(y,{className:m.codeButton,code:L})]})]})]})}function _(e){let{children:n,...t}=e;const i=(0,o.A)(),a=function(e){return s.Children.toArray(e).some((e=>(0,s.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(n);let r,l=a,c=null;if("string"==typeof a){r=B;const e=function(e){const n=/<output>([\s\S]*?)<\/output>/i,t=e.replace(n,"").trim(),s=e.match(n)?.[1].trim();return{code:t,output:s}}(a);l=e.code,c=e.output}else r=p;return(0,d.jsx)(r,{...t,children:a},String(i))}},4446:(e,n,t)=>{t.d(n,{A:()=>m});t(6540);var s=t(7559),o=t(2771),i=t(7763);const a={wrapper:"wrapper_Y1C6",section:"section_EsUi",sectionTitle:"sectionTitle_pv0_",sectionLinks:"sectionLinks_oh4b",link:"link_RNAl",linkListTitle:"linkListTitle_pcKv",icon:"icon_Oxux"};var r=t(4848);const l=()=>(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 127 127",className:a.icon,children:[(0,r.jsx)("path",{d:"M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z",fill:"#E01E5A"}),(0,r.jsx)("path",{d:"M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z",fill:"#36C5F0"}),(0,r.jsx)("path",{d:"M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z",fill:"#2EB67D"}),(0,r.jsx)("path",{d:"M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z",fill:"#ECB22E"})]}),c=()=>(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 -960 960 960",className:a.icon,fill:"var(--ifm-toc-link-color)",children:(0,r.jsx)("path",{d:"M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z"})}),d=()=>(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024",fill:"none",className:a.icon,children:(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z",transform:"scale(64)",fill:"#1B1F23"})}),u=()=>(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 -960 960 960",className:a.icon,fill:"var(--ifm-toc-link-color)",children:(0,r.jsx)("path",{d:"M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"})});function m(e){let{...n}=e;const{toc:t,frontMatter:m,metadata:p}=(0,o.u)(),h=m.custom_edit_url?m.custom_edit_url:p.editUrl;return(0,r.jsxs)("div",{className:a.wrapper,children:[(0,r.jsxs)("div",{className:a.section,children:[(0,r.jsx)("h3",{className:a.sectionTitle,children:"Content"}),(0,r.jsx)(i.A,{toc:t,minHeadingLevel:m.toc_min_heading_level,maxHeadingLevel:m.toc_max_heading_level,className:s.G.docs.docTocDesktop})]}),(0,r.jsxs)("div",{className:a.section,children:[(0,r.jsx)("h3",{className:a.sectionTitle,children:"Actions"}),(0,r.jsx)("div",{className:a.sectionLinks,children:(0,r.jsxs)("a",{href:h,target:"_blank",className:a.link,children:[(0,r.jsx)(u,{})," Edit this page"]})})]}),(0,r.jsxs)("div",{className:a.section,children:[(0,r.jsx)("h3",{className:a.sectionTitle,children:"Support"}),(0,r.jsx)("div",{className:a.sectionLinks,children:(0,r.jsxs)("li",{children:[(0,r.jsxs)("a",{href:"https://join.slack.com/t/discuss-neuralmagic/shared_invite/zt-q1a1cnvo-YBoICSIw3L1dmQpjBeDurQ",target:"_blank",className:a.link,children:[(0,r.jsx)(l,{})," Community Slack"]}),(0,r.jsxs)("a",{href:"https://support.neuralmagic.com",target:"_blank",className:a.link,children:[(0,r.jsx)(c,{})," Enterprise Support"]})]})})]}),(0,r.jsxs)("div",{className:a.section,children:[(0,r.jsx)("h3",{className:a.sectionTitle,children:"Issues"}),(0,r.jsx)("div",{className:a.sectionLinks,children:[{name:"DeepSparse",path:"deepsparse/issues"},{name:"SparseML",path:"sparseml/issues"},{name:"SparseZoo",path:"sparsezoo/issues"}].map((e=>(0,r.jsx)("li",{children:(0,r.jsxs)("a",{href:`https://github.com/neuralmagic/${e.path}`,target:"_blank",rel:"noopener noreferrer",className:a.link,children:[(0,r.jsx)(d,{}),e.name]})},e.name)))})]})]})}},4198:(e,n,t)=>{t.d(n,{A:()=>f});t(6540);var s=t(4164),o=t(4586),i=t(8774),a=t(1312),r=t(8295),l=t(7559),c=t(5597),d=t(2252),u=t(4848);const m={unreleased:function(e){let{siteTitle:n,versionMetadata:t}=e;return(0,u.jsx)(a.A,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:n,versionLabel:(0,u.jsx)("b",{children:t.label})},children:"This is unreleased documentation for the {versionLabel} version."})},unmaintained:function(e){let{siteTitle:n,versionMetadata:t}=e;return(0,u.jsx)(a.A,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:n,versionLabel:(0,u.jsx)("b",{children:t.label})},children:"This is documentation for the {versionLabel} version, which is no longer actively maintained."})}};function p(e){const n=m[e.versionMetadata.banner];return(0,u.jsx)(n,{...e})}function h(e){let{versionLabel:n,to:t,onClick:s}=e;return(0,u.jsx)(a.A,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:n,latestVersionLink:(0,u.jsx)("b",{children:(0,u.jsx)(i.A,{to:t,onClick:s,children:(0,u.jsx)(a.A,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"current version"})})})},children:"For the latest released documentation, see the {latestVersionLink} ({versionLabel})."})}function g(e){let{className:n,versionMetadata:t}=e;const{siteConfig:{title:i}}=(0,o.A)(),{pluginId:a}=(0,r.vT)({failfast:!0}),{savePreferredVersionName:d}=(0,c.g1)(a),{latestDocSuggestion:m,latestVersionSuggestion:g}=(0,r.HW)(a),f=m??(b=g).docs.find((e=>e.id===b.mainDocId));var b;return(0,u.jsxs)("div",{className:(0,s.A)(n,l.G.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,u.jsx)("div",{children:(0,u.jsx)(p,{siteTitle:i,versionMetadata:t})}),(0,u.jsx)("div",{className:"margin-top--md",children:(0,u.jsx)(h,{versionLabel:g.label,to:f.path,onClick:()=>d(g.name)})})]})}function f(e){let{className:n}=e;const t=(0,d.r)();return t.banner?(0,u.jsx)(g,{className:n,versionMetadata:t}):null}},7238:(e,n,t)=>{t.d(n,{A:()=>O});var s=t(6540),o=t(1099),i=t(1470),a=t(9365),r=t(4142),l=t(5965);const c="section_Pg8a";var d=t(2771),u=t(6588),m=t(4848);var p=t(23);const h="releases_gYbq",g="error_AlYd",f="loading_MP7T",b="releasesUL_day9",v="release_s6Ul",x="releaseVersion_q6Y2",N=e=>{let{content:n,repo:t}=e;const s=new p.xI.Renderer;s.heading=(e,n)=>`<h${n+2}>${e}</h${n+1}>`,s.text=e=>e.replace(/#\d+/g,(e=>{const n=e.slice(1);return`<a href="https://www.github.com/${t}/issues/${n}" target="_blank">${e}</a>`})),p.xI.setOptions({renderer:s});return(0,m.jsx)("div",{dangerouslySetInnerHTML:{__html:p.xI.parse(n)}})},k=e=>{let{repo:n}=e;const[t,o]=(0,s.useState)([]),[i,a]=(0,s.useState)(!0),[r,l]=(0,s.useState)(null);return(0,s.useEffect)((()=>{(async()=>{a(!0),l(null);try{const e=await fetch(`https://api.github.com/repos/${n}/releases`);if(!e.ok)throw 403===e.status?l("API rate limit exceeded. Please try again later."):l(`Failed to fetch data: ${e.statusText}`),new Error(`Error: ${e.status}`);const t=await e.json();o(t)}catch(r){console.error("Fetching error:",r)}a(!1)})()}),[n]),i?(0,m.jsx)("div",{className:`${h} ${f}`,children:"Loading..."}):r?(0,m.jsxs)("div",{className:`${h} ${g}`,children:["Error: ",r]}):(0,m.jsx)("div",{className:h,children:0===t.length?(0,m.jsx)("p",{children:"No releases found."}):(0,m.jsx)("ul",{className:b,children:t.map((e=>(0,m.jsxs)("li",{className:v,children:[(0,m.jsx)("h3",{className:x,children:(0,m.jsx)("a",{className:"anchor",href:`#${e.name.toLowerCase().replace(/[^\w]+/g,"-")}`,name:e.name.toLowerCase().replace(/[^\w]+/g,"-"),children:e.name})}),(0,m.jsx)(N,{content:e.body,repo:n})]},e.id)))})})},j=(e,n,t,o,i,a,r,l)=>{if("string"==typeof e){let s=n,c=[...i];if("current"===s){if(!l&&i)for(let e=0;e<c.length;e++){let n=c[e];if(n.indexOf("[")>-1){const e=n.split("[");n=`${e[0]}-nightly[${e[1]}`}else n=`${n}-nightly`;c[e]=n}s=r}else s===t?s="":a&&(s=`${a}${s}`);let d=e.replace(new RegExp(o,"g"),s);for(let e=0;e<c.length;e++)d=d.replace(new RegExp(i[e].replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"),c[e]);return d}return s.isValidElement(e)?s.cloneElement(e,e.props,j(e.props.children,n,t,o,i,a,r,l)):Array.isArray(e)?e.map((e=>j(e,n,t,o,i,a,r,l))):e},w=e=>{let{children:n,targetVersion:t="VERSION",targetProduct:s="PRODUCT",prepend:o="",currentTag:i="",ignoreNightly:a=!1,ignoreLastVersion:r=!1}=e;const{metadata:l}=(0,d.u)(),c=(0,u.Ay)("docusaurus-plugin-content-docs")["docusaurus-plugin-content-docs"].default.versions.find((e=>e.isLast)),p=r?null:c.name,h=l.version,g=Array.isArray(s)?s:[s],f=j(n,h,p,t,g,o,i,a);return(0,m.jsx)(m.Fragment,{children:f})},y="glossaryContainer_y4c9",C="glossaryEntry_ZOkU",L="glossaryTerm_i6iR",T="glossarySummary_cGzA",B="glossaryColumns_S5U5",_=[{label:"AutoML",description:"Automated Machine Learning. Platform that aims to reduce or eliminate the need for skilled data scientists to build ML and deep learning models. Google AutoML, for example, is a suite of cloud-based ML products."},{label:"AVX2",description:"Advanced Vector Extensions 2. Instruction set used for applications on an Intel CPU."},{label:"AVX-512",description:"Advanced Vector Extensions. Instruction set on Intel CPUs that impacts compute, storage, and network instructions. AVX-512 yields higher performance for demanding computational tasks."},{label:"Cascade Lake Chips",description:"Intel CPU chips up to 28 cores that are improved for machine learning and added VNNI instructions. Cascade Lake Chips support FP16 and INT8 floating point operations."},{label:"Convolutional Neural Network (CNN)",description:"Artificial neural network used in image recognition and object detection as well as processing that is specifically designed to process pixel data."},{label:"Deep Learning (DL)",description:"Subset of machine learning in which artificial neural networks (algorithms inspired by the human brain) learn from large amounts of data."},{label:"Deep Learning Frameworks",description:"Interface, library, or tool that allows one to build deep learning models more easily and quickly without getting into details of underlying algorithms."},{label:"DLRM",description:"Open-source Deep Learning Recommendation Model from Facebook."},{label:"Fully Connected Network",description:"Network in which every node in a layer (except the input and output layer) is connected to every node in the previous layer and following layer."},{label:"Image Classification",description:"Supervised learning problem to define a set of target classes (objects to identify in images) and train a model to recognize them using labeled example photos."},{label:"Image Segmentation",description:"In computer vision, the process of partitioning a digital image into multiple segments to simplify and/or change the representation of an image into something more meaningful and easier to analyze."},{label:"Inference",description:"Process of using a trained machine learning algorithm to make predictions (done by machine learning engineers)."},{label:"MobileNets",description:"A family of mobile-first computer vision models for TensorFlow, designed to effectively maximize accuracy while being mindful of the restricted resources for an on-device or embedded application."},{label:"Model pipelines",description:"In machine learning deployment, multiple models chained together to achieve business goals (such as a detection model to select regions from an image for a later visual search model)."},{label:"Model serving",description:"In machine learning deployment, makes serving of models less expensive and faster to run by better using resources on the machine."},{label:"Multilayer Perceptron (MLP)",description:"A feedforward artificial neural network (ANN) model, composed of more than one perceptron, that maps sets of input data onto a set of appropriate outputs."},{label:"Neural Network",description:"System of hardware and/or software patterned after the operation of neurons in the human brain."},{label:"Object Detection",description:"Categorization of an image based on the number of objects in the image and/or the location of the objects."},{label:"ONNX",description:"Open Neural Network Exchange. Open-source inference engine that is a performance-focused complete scoring engine for ONNX models."},{label:"Quantization",description:"The process of approximating a neural network that uses floating-point numbers by a neural network of low bit width numbers. Quantization dramatically reduces the memory requirement and computational cost of using neural networks."},{label:"Recommendations",description:"Categorization of an image based on relevant suggestions. This class of machine learning algorithms finds similarity between different images."},{label:"ResNet",description:"Image classification model that is structurally dense."},{label:"Sparsification",description:"A model optimization technique used to improve performance by reducing the number of nonperformance critical elements, vectors, and matrices."},{label:"SSD",description:"Single Shot Detector. Convolutional neural network (CNN) algorithm for object detection that provides better balance between swiftness and precision. SSD runs CNN on an input image only one time and computes a feature map."},{label:"Structured pruning",description:"A method for compressing a neural network. Structured pruning alternates between removing channel connections and fine-tuning to reduce overall width of the network. Structured pruning severely limits the maximum sparsity that can be imposed on a network when compared with unstructured pruning."},{label:"Tensor",description:"The input to a convolutional layer. Tensor is a 3- or 4-dimensional representation of a 2D image."},{label:"Training",description:"The process of feeding an ML algorithm with data to help identify and learn good values for all attributes involved."},{label:"U-Net",description:"Fully convolutional network that does image segmentation (originally designed for medical image segmentation). The U-Net goal is to predict each pixel class."},{label:"Unstructured pruning",description:"A method for compressing a neural network. Unstructured pruning removes individual weight connections from a trained network. Software like Neural Magic's DeepSparse runs these pruned networks faster."},{label:"VNNI",description:"Vector Neural Network Instructions. New versions of Intel's CPU chips are optimized with VNNI, making them faster and more efficient for certain types of machine learning applications."},{label:"YOLO",description:"You Only Look Once. Open-source type of CNN method of object detection that can recognize objects in images and videos swiftly."}].sort(((e,n)=>e.label.localeCompare(n.label))),A=()=>(0,m.jsxs)("div",{className:y,children:[(0,m.jsxs)("div",{className:B,children:[(0,m.jsx)("div",{className:L,children:"Name"}),(0,m.jsx)("div",{className:T,children:"Definition"})]}),_.map((e=>(0,m.jsxs)("div",{className:C,children:[(0,m.jsx)("div",{className:L,children:(0,m.jsx)("a",{href:`#${e.label}`,id:e.label,children:e.label})}),(0,m.jsx)("div",{className:T,children:e.description?e.description:e.summary})]},e.label)))]}),I="tooltipContainer_cynk",S="tooltipBox_xBAA",q="visible_Ciou",M="moreInfoLink_JyVX",V=e=>e.toLowerCase().replace(/[\s_-]/g,""),E=e=>{let{children:n,termName:t}=e;const[o,i]=(0,s.useState)(!1);let a=V(t||n);const r=_.find((e=>V(e.label)===a)),l=r?r.summary||r.description:"";return(0,m.jsxs)("span",{className:I,onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),children:[n,(0,m.jsxs)("div",{className:`${S} ${o?q:""}`,children:[l,r&&(0,m.jsx)("a",{href:`/glossary#${a}`,className:M,children:"More Info"})]})]})},O={...o.A,DocCardList:function(e){const{items:n,children:t}=e;if(t)return(0,m.jsx)("section",{className:c,children:t});let s=function(e){let n;if(Array.isArray(e)&&e.length>0&&"string"==typeof e[0]){const t=e.map((e=>(0,r.cC)(e))),{metadata:s}=(0,d.u)(),o=s.version,i=(0,u.Ay)("docusaurus-plugin-content-docs")["docusaurus-plugin-content-docs"].default.versions.find((e=>e.name===o)).docs.filter((e=>t.find((n=>n.id===e.id))));n=t.map((e=>{const n=i.find((n=>n.id===e.id));return{docId:e.id,href:n.path,label:e.title,type:"link",unlisted:!1}}))}else n=e||(0,r.$S)().items;return n=(0,r.d1)(n),n}(n);return(0,m.jsx)("section",{className:c,children:s.map(((e,n)=>(0,m.jsx)(l.A,{item:e},n)))})},GithubReleases:k,VersionInjector:w,Tabs:i.A,TabItem:a.A,GlossaryTable:A,Tooltip:E}}}]);