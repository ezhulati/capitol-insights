import{j as t}from"./motion-55a23653.js";const e=({src:e,alt:s,width:i,height:o,className:c="",loading:r="lazy",fetchPriority:a="auto",sizes:n="100vw",objectFit:p="cover",aspectRatio:h,decoding:d="async"})=>{const g={objectFit:p,...h?{aspectRatio:h}:{},...i?{width:`${i}px`}:{width:"100%"},...o?{height:`${o}px`}:{height:"auto"}};return t.jsxs("picture",{children:[t.jsx("source",{srcSet:(t=>{const e=(t=>{const e=t.split("."),s=e.pop();return["jpg","jpeg","png"].includes((null==s?void 0:s.toLowerCase())||"")?`${e.join(".")}.webp`:t})(t);return`${e} 1x, ${e} 2x`})(e),type:"image/webp",sizes:n}),t.jsx("source",{srcSet:(l=e,`${l} 1x, ${l} 2x`),sizes:n}),t.jsx("img",{src:e,alt:s,width:i,height:o,loading:r,fetchPriority:a,decoding:d,className:c,style:g})]});var l};export{e as O};
