"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
const SmileScene=dynamic(()=>import("./SmileScene"),{ssr:false});
export default function SiteInteractions(){
  const [sceneTarget,setSceneTarget]=useState<HTMLElement|null>(null);
  useEffect(()=>{
    if(window.matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)").matches){
      try{const canvas=document.createElement("canvas");if(canvas.getContext("webgl2")||canvas.getContext("webgl")){setSceneTarget(document.getElementById("hero-3d-layer"));}}catch{}
    }
    const navToggle=document.querySelector<HTMLButtonElement>('.nav-toggle');
    const nav=document.querySelector<HTMLElement>('.main-nav-links');
    const toggle=()=>{const open=nav?.classList.toggle('open')??false;navToggle?.setAttribute('aria-expanded',String(open));};
    const close=()=>{nav?.classList.remove('open');navToggle?.setAttribute('aria-expanded','false');};
    navToggle?.addEventListener('click',toggle);
    nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    const compare=document.getElementById('result-compare') as HTMLInputElement|null;
    const before=document.getElementById('result-photo-cut') as HTMLElement|null;
    const knob=document.getElementById('result-compare-knob') as HTMLElement|null;
    const syncCompare=()=>{if(!compare||!before||!knob)return;before.style.width=compare.value+'%';knob.style.left=compare.value+'%';};
    compare?.addEventListener('input',syncCompare);syncCompare();
    const progress=document.getElementById('smile-progress-bar');
    const art=document.querySelector<HTMLElement>('.hero-art');
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame=0;
    const update=()=>{frame=0;const hero=document.getElementById('hero');if(!hero)return;const p=Math.min(1,Math.max(0,window.scrollY/Math.max(1,hero.offsetHeight*.82)));if(progress)progress.style.width=(5+p*95)+'%';if(art&&!reduce)art.style.transform='scale('+(1.045+p*.025)+') translateY('+(p*12)+'px)';};
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};window.addEventListener('scroll',onScroll,{passive:true});update();
    const form=document.getElementById('whatsapp-form') as HTMLFormElement|null;
    const status=document.getElementById('form-status');
    const send=(event:Event)=>{
      event.preventDefault();if(!form?.reportValidity())return;
      const data=new FormData(form);
      const name=String(data.get('nombre')||'').trim();const country=String(data.get('pais')||'').trim();const phone=String(data.get('telefono')||'').trim();
      const interest=String(data.get('interes')||'').trim();const message=String(data.get('mensaje')||'').trim();
      const messageText=['Hola, quiero solicitar una orientación inicial gratuita por videollamada con la Dra. Alejandra Villada.',`Nombre: ${name}`,`País de residencia: ${country}`,`Teléfono: ${phone||'Por confirmar'}`,`Tratamiento de interés: ${interest}`,`Qué quisiera mejorar: ${message||'Quisiera conocer las opciones.'}`].join('\n');
      const number=(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||'573116445913').replace(/\D/g,'');
      const link=`https://wa.me/${number}?text=${encodeURIComponent(messageText)}`;
      const popup=window.open(link,'_blank','noopener,noreferrer');if(!popup)window.location.href=link;
      if(status)status.textContent='Se preparó el mensaje en WhatsApp. Debes confirmar el envío allí.';
    };
    form?.addEventListener('submit',send);
    return ()=>{navToggle?.removeEventListener('click',toggle);nav?.querySelectorAll('a').forEach(a=>a.removeEventListener('click',close));compare?.removeEventListener('input',syncCompare);window.removeEventListener('scroll',onScroll);if(frame)cancelAnimationFrame(frame);form?.removeEventListener('submit',send)};
  },[]);
  return sceneTarget?createPortal(<SmileScene/>,sceneTarget):null;
}
