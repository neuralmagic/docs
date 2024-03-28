"use strict";(self.webpackChunkdocs_neuralmagic_com=self.webpackChunkdocs_neuralmagic_com||[]).push([[7978],{521:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var t=n(4848),r=n(8453);const i={tags:["DeepSparse","features","debugging"],keywords:["DeepSparse","features","numactl","debugging","troubleshooting"],description:"Using the numactl Utility to Control Resource Utilization With DeepSparse",sidebar_label:"numactl Utility",sidebar_position:5},o="Using the numactl Utility to Control Resource Utilization With DeepSparse",a={id:"guides/deepsparse-engine/numactl-utility",title:"Using the numactl Utility to Control Resource Utilization With DeepSparse",description:"Using the numactl Utility to Control Resource Utilization With DeepSparse",source:"@site/docs/guides/deepsparse-engine/numactl-utility.mdx",sourceDirName:"guides/deepsparse-engine",slug:"/guides/deepsparse-engine/numactl-utility",permalink:"/next/guides/deepsparse-engine/numactl-utility",draft:!1,unlisted:!1,editUrl:"https://github.com/neuralmagic/docs/tree/main/docs/guides/deepsparse-engine/numactl-utility.mdx",tags:[{label:"DeepSparse",permalink:"/next/tags/deep-sparse"},{label:"features",permalink:"/next/tags/features"},{label:"debugging",permalink:"/next/tags/debugging"}],version:"current",sidebarPosition:5,frontMatter:{tags:["DeepSparse","features","debugging"],keywords:["DeepSparse","features","numactl","debugging","troubleshooting"],description:"Using the numactl Utility to Control Resource Utilization With DeepSparse",sidebar_label:"numactl Utility",sidebar_position:5},sidebar:"autogenerated_docs",previous:{title:"Diagnostics/Debugging",permalink:"/next/guides/deepsparse-engine/diagnostics-debugging"},next:{title:"DeepSparse Logging",permalink:"/next/guides/deepsparse-engine/logging"}},l={},c=[{value:"DeepSparse and Thread Pinning",id:"deepsparse-and-thread-pinning",level:2},{value:"Additional Notes",id:"additional-notes",level:2}];function d(e){const s={code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"using-the-numactl-utility-to-control-resource-utilization-with-deepsparse",children:"Using the numactl Utility to Control Resource Utilization With DeepSparse"}),"\n",(0,t.jsxs)(s.p,{children:["DeepSparse achieves better performance on multiple-socket systems as well as with hyperthreading disabled; models with larger batch sizes are likely to see an improvement. One standard way of controlling compute/memory resources when running processes is to use the ",(0,t.jsx)(s.strong,{children:"numactl"})," utility. ",(0,t.jsx)(s.strong,{children:"numactl"})," can be used when multiple processes need to run on the same hardware but require their own CPU/memory resources to run optimally."]}),"\n",(0,t.jsxs)(s.p,{children:["To run DeepSparse on a single socket (N) of a multi-socket system, you would start the DeepSparse using ",(0,t.jsx)(s.strong,{children:"numactl"}),". For example:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"    numactl --cpunodebind N <deepsparseengine-process>\n"})}),"\n",(0,t.jsx)(s.p,{children:"To run DeepSparse on multiple sockets (N,M), run:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"    numactl --cpunodebind N,M <deepsparseengine-process>\n"})}),"\n",(0,t.jsxs)(s.p,{children:["It is advised to also allocate memory from the same socket on which the engine is running. So, ",(0,t.jsx)(s.code,{children:"--membind"})," or ",(0,t.jsx)(s.code,{children:"--preferred"})," should be used when using ",(0,t.jsx)(s.code,{children:"--cpunodebind."})," For example:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"    numactl --cpunodebind N --preferred N <deepsparseengine-process>\n    or\n    numactl --cpunodebind N --membind N <deepsparseengine-process>\n"})}),"\n",(0,t.jsxs)(s.p,{children:["The difference between ",(0,t.jsx)(s.code,{children:"--membind"})," and ",(0,t.jsx)(s.code,{children:"--preferred"})," is that ",(0,t.jsx)(s.code,{children:"--preferred"})," allows memory from other sockets to be allocated if the current socket is out of memory.  ",(0,t.jsx)(s.code,{children:"--membind"})," does not allow memory to be allocated outside the specified socket."]}),"\n",(0,t.jsxs)(s.p,{children:["For more fine-grained control, ",(0,t.jsx)(s.strong,{children:"numactl"})," can be used to bind the process running DeepSparse to a set of specific CPUs using ",(0,t.jsx)(s.code,{children:"--physcpubind"}),". CPUs are numbered from 0-N, where N is the maximum number of logical cores available on the system. On systems with hyper-threading (or SMT), there may be more than one logical thread per physical CPU. Usually, the logical CPUs/threads are numbered after all the physical CPUs/threads. For example, in a system with two threads per CPU and N physical CPUs, the threads for a particular CPU (K) will be K and K+N for all 0<=K<N. DeepSparse currently works best with hyper-threading/SMT disabled, so only one set of threads should be selected using ",(0,t.jsx)(s.strong,{children:"numactl"}),", i.e., 0 through (N-1) or N through (N-1)."]}),"\n",(0,t.jsxs)(s.p,{children:["Similarly, for a multi-socket system with N sockets and C physical CPUs per socket, the CPUs located on a single socket will range from K*C to ((K+1)",(0,t.jsx)(s.em,{children:"C)-1 where 0<=K<N. For multi-socket, multi-thread systems, the logical threads are separated by N"}),"C. For example, for a two socket, two thread per CPU system with 8 cores per CPU, the logical threads for socket 0 would be numbered 0-7 and 16-23, and the threads for socket 1 would be numbered 8-15 and 24-31."]}),"\n",(0,t.jsx)(s.p,{children:"Given the architecture above, to run DeepSparse on the first four CPUs on the second socket, you would use:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"    numactl --physcpubind 8-11 --preferred 1 <deepsparseengine-process>\n"})}),"\n",(0,t.jsxs)(s.p,{children:["Appending ",(0,t.jsx)(s.code,{children:"--preferred 1"})," is needed here since DeepSparse is being bound to CPUs on the second socket."]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Note:"})," When running on multiple sockets, using a batch size that is evenly divisible by the number of sockets will yield the best performance."]}),"\n",(0,t.jsx)(s.h2,{id:"deepsparse-and-thread-pinning",children:"DeepSparse and Thread Pinning"}),"\n",(0,t.jsxs)(s.p,{children:["When using ",(0,t.jsx)(s.strong,{children:"numactl"})," to specify the CPUs/sockets on which the engine is allowed to run, there is no restriction as to the CPU on which a particular computation thread is executed. A single thread of computation may run on one or more CPUs during the course of execution. This is desirable if the system is being shared between multiple processes so that idle CPU threads are not prevented from doing other work."]}),"\n",(0,t.jsxs)(s.p,{children:["However, the engine works best when threads are pinned (i.e., not allowed to migrate from one CPU to another). Thread pinning can be enabled using the ",(0,t.jsx)(s.code,{children:"NM_BIND_THREADS_TO_CORES"})," environment variable. For example:"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"    NM_BIND_THREADS_TO_CORES=1 <deepsparseengine-process>\n    or\n    export NM_BIND_THREADS_TO_CORES=1 <deepsparseengine-process>\n"})}),"\n",(0,t.jsxs)(s.p,{children:["Use ",(0,t.jsx)(s.code,{children:"NM_BIND_THREADS_TO_CORES"})," with care since it forces DeepSparse to run on only the threads it has been allocated at startup. If any other process ends up running on the same threads, it could result in a major degradation of performance."]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Note:"})," The threads-to-cores mappings described above are specific to Intel only. AMD has a different mapping. For AMD, all the threads for a single core are consecutive; that is, if each core has two threads and there are N cores, the threads for a particular core K are 2",(0,t.jsx)(s.em,{children:"K and 2"}),"K+1.  The mapping of cores to sockets is also straightforward. For an N socket system with C cores per socket, the cores for a particular socket S are numbered S*C to ((S+1)*C)-1."]}),"\n",(0,t.jsx)(s.h2,{id:"additional-notes",children:"Additional Notes"}),"\n",(0,t.jsx)(s.p,{children:"This displays the inventory of available sockets/CPUs on a system:"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"numactl --hardware"})}),"\n",(0,t.jsx)(s.p,{children:"This displays the resources available to the current process:"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.code,{children:"numactl --show"})}),"\n",(0,t.jsxs)(s.p,{children:["For further details about these and other parameters, see the man page on ",(0,t.jsx)(s.strong,{children:"numactl"}),":"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",children:"    man numactl\n"})})]})}function h(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>o,x:()=>a});var t=n(6540);const r={},i=t.createContext(r);function o(e){const s=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),t.createElement(i.Provider,{value:s},e.children)}}}]);