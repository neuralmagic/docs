"use strict";(self.webpackChunkdocs_neuralmagic_com=self.webpackChunkdocs_neuralmagic_com||[]).push([[6085],{3281:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>l,contentTitle:()=>n,default:()=>c,frontMatter:()=>t,metadata:()=>a,toc:()=>d});var i=r(4848),o=r(8453);const t={tags:["sparsezoo","installation","model repository","pre-sparsified models"],keywords:["SparseZoo installation","Neural Magic model repository"],description:"Install SparseZoo, Neural Magic's repository of pre-sparsified models, or learn how to access it through SparseML and DeepSparse.",sidebar_label:"SparseZoo",sidebar_position:2},n="Installing SparseZoo",a={id:"get-started/install/sparsezoo",title:"Installing SparseZoo",description:"Install SparseZoo, Neural Magic's repository of pre-sparsified models, or learn how to access it through SparseML and DeepSparse.",source:"@site/versioned_docs/version-1.7.0/get-started/install/sparsezoo.mdx",sourceDirName:"get-started/install",slug:"/get-started/install/sparsezoo",permalink:"/get-started/install/sparsezoo",draft:!1,unlisted:!1,editUrl:"https://github.com/neuralmagic/docs/tree/main/docs/get-started/install/sparsezoo.mdx",tags:[{label:"sparsezoo",permalink:"/tags/sparsezoo"},{label:"installation",permalink:"/tags/installation"},{label:"model repository",permalink:"/tags/model-repository"},{label:"pre-sparsified models",permalink:"/tags/pre-sparsified-models"}],version:"1.7.0",sidebarPosition:2,frontMatter:{tags:["sparsezoo","installation","model repository","pre-sparsified models"],keywords:["SparseZoo installation","Neural Magic model repository"],description:"Install SparseZoo, Neural Magic's repository of pre-sparsified models, or learn how to access it through SparseML and DeepSparse.",sidebar_label:"SparseZoo",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"SparseML",permalink:"/get-started/install/sparseml"},next:{title:"Deploy",permalink:"/get-started/deploy"}},l={},d=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Hardware Requirements",id:"hardware-requirements",level:3},{value:"Software Requirements",id:"software-requirements",level:3},{value:"Installation",id:"installation",level:2},{value:"PyPI",id:"pypi",level:3},{value:"GitHub (Advanced)",id:"github-advanced",level:3}];function p(e){const s={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components},{VersionInjector:r}=s;return r||function(e,s){throw new Error("Expected "+(s?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("VersionInjector",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h1,{id:"installing-sparsezoo",children:"Installing SparseZoo"}),"\n",(0,i.jsx)(s.p,{children:"SparseZoo is Neural Magic's repository of pre-sparsified deep learning models across various domains, such as computer vision and NLP.\nThe easiest way to access and use these models is through:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)("b",{children:"SparseML:"})," For model optimization, integration into your training pipelines"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)("b",{children:"DeepSparse:"})," For high-performance deployment of sparsified models"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,i.jsx)(s.h3,{id:"hardware-requirements",children:"Hardware Requirements"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)("b",{children:"CPU:"})," Intel, AMD, or ARM"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"software-requirements",children:"Software Requirements"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)("b",{children:"OS:"})," Linux (e.g., Ubuntu, CentOS, Red Hat); MacOS (limited support)"]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)("b",{children:"Python:"})," 3.8 - 3.11"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(s.h3,{id:"pypi",children:"PyPI"}),"\n",(0,i.jsx)(s.p,{children:"For the most common use case, install the current release version of SparseZoo using PyPi:"}),"\n",(0,i.jsx)(r,{targetProduct:"sparsezoo",targetVersion:"==VERSION",prepend:"==",children:(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-bash",children:"pip install sparsezoo==VERSION\n"})})}),"\n",(0,i.jsx)(s.h3,{id:"github-advanced",children:"GitHub (Advanced)"}),"\n",(0,i.jsx)(s.p,{children:"For development purposes or advanced use cases, install directly from the GitHub repository:"}),"\n",(0,i.jsx)(r,{targetProduct:"sparsezoo",prepend:"v",currentTag:"main",ignoreNightly:!0,ignoreLastVersion:!0,children:(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-bash",children:"pip install git+https://github.com/neuralmagic/sparsezoo.git@VERSION\n"})})}),"\n",(0,i.jsx)(s.p,{children:"Or from a locally cloned repository:"}),"\n",(0,i.jsx)(r,{targetProduct:"sparsezoo",prepend:"tags/v",currentTag:"main",ignoreNightly:!0,ignoreLastVersion:!0,children:(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-bash",children:"git clone https://github.com/neuralmagic/sparsezoo.git\ncd sparsezoo\ngit checkout VERSION\npip install -e .[dev]\n"})})})]})}function c(e={}){const{wrapper:s}={...(0,o.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},8453:(e,s,r)=>{r.d(s,{R:()=>n,x:()=>a});var i=r(6540);const o={},t=i.createContext(o);function n(e){const s=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:n(e.components),i.createElement(t.Provider,{value:s},e.children)}}}]);