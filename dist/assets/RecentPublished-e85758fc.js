import{P as x}from"./PrePrintTrack-81cb0c9d.js";import{d as P,o as n,c as i,b as a,t as _,k as g,p as y,m as b,_ as C,n as r,g as v,h as f,F as S,j as R,a as $,q,u as B}from"./index-6aaf6acf.js";import{C as N}from"./index-24014245.js";const V=t=>(y("data-v-bef0d1dd"),t=t(),b(),t),j={class:"card"},D={class:"card-body"},F={class:"card-title"},A=["href"],E={key:0},L=V(()=>a("div",{class:"divider"},null,-1)),M={class:"card-text"},O=P({__name:"PaperCard",props:{item:{type:Object,required:!0}},setup(t){return(e,s)=>(n(),i("div",j,[a("div",D,[a("h5",F,_(t.item.title),1),a("a",{href:t.item.link,class:"btn btn-primary"},"Read More",8,A)]),t.item.description?(n(),i("div",E,[L,a("p",M,_(t.item.description.substring(0,250))+_(t.item.description.length>250?"...":""),1)])):g("",!0)]))}});const T=C(O,[["__scopeId","data-v-bef0d1dd"]]),z=t=>(y("data-v-77582e0c"),t=t(),b(),t),G={class:"container"},H=z(()=>a("h2",{class:"title"},"Recent Published in PrePrint",-1)),J=P({__name:"RecentPublished",props:{address:{type:String,required:!0}},async setup(t){let e,s;const I=t,{provider:w}=([e,s]=r(()=>B()),e=await e,s(),e),d=new N(I.address,x.abi,w);let c=([e,s]=r(()=>d.prePrintCnt()),e=await e,s(),e),k=v(1e3),l=v(c-k.value),p=f([]);if(c>0){let u=([e,s]=r(()=>d.prePrintCIDs(l.value>=0?l.value:0,c-1>=0?c-1:0)),e=await e,s(),e),m=([e,s]=r(async()=>u.map(async o=>({title:(await d.prePrints(o)).keyInfo,link:"#"}))),e=await e,s(),e);p=f(([e,s]=r(()=>Promise.all(m)),e=await e,s(),e))}return(u,m)=>(n(),i("div",G,[H,(n(!0),i(S,null,R(q(p),(o,h)=>(n(),i("div",{key:h},[$(T,{item:o},null,8,["item"])]))),128))]))}});const W=C(J,[["__scopeId","data-v-77582e0c"]]);export{W as default};