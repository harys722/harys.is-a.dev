// @ts-nocheck


export const $=(s,r=document)=>r.querySelector(s);
export const lk=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
export const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
