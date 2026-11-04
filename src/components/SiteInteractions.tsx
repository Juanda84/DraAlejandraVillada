"use client";
import {useEffect} from "react";
export default function SiteInteractions(){
  useEffect(()=>{
    const menu=document.querySelector<HTMLButtonElement>(".menu-toggle");
    const nav=document.getElementById("main-nav");
    const toggle=()=>{const open=nav?.classList.toggle("open")||false; menu?.setAttribute("aria-expanded", String(open));};
    const close=()=>{nav?.classList.remove("open");menu?.setAttribute("aria-expanded","false");};
    menu?.addEventListener("click",toggle);
    nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));
    const slider=document.getElementById("case-range") as HTMLInputElement|null;
    const before=document.getElementById("case-before") as HTMLElement|null;
    const split=document.getElementById("case-split") as HTMLElement|null;
    const update=()=>{if(!slider||!before||!split)return;before.style.width=slider.value+"%";split.style.left=slider.value+"%";const photo=before.querySelector<HTMLImageElement>("img");if(photo)photo.style.width=(10000/Number(slider.value||50))+"%";};
    // The image beneath the slider should retain the full container width as the mask changes.
    const updateFixed=()=>{if(!slider||!before||!split)return;const percent=Number(slider.value);before.style.width=percent+"%";split.style.left=percent+"%";const pic=before.querySelector<HTMLImageElement>("img");if(pic){pic.style.width=`${100/Math.max(percent/100,.01)}%`}};
    slider?.addEventListener("input",updateFixed);updateFixed();
    const gallery=document.getElementById("destinations-row");
    const prev=document.querySelector<HTMLButtonElement>(".gallery-prev");
    const next=document.querySelector<HTMLButtonElement>(".gallery-next");
    const onPrev=()=>gallery?.scrollBy({left:-470,behavior:"smooth"});
    const onNext=()=>gallery?.scrollBy({left:470,behavior:"smooth"});
    prev?.addEventListener("click",onPrev);next?.addEventListener("click",onNext);
    const form=document.getElementById("lead-form") as HTMLFormElement|null;
    const status=document.getElementById("form-status");
    const submit=(e:Event)=>{
      e.preventDefault();if(!form?.reportValidity())return;
      const data=new FormData(form);const nombre=String(data.get("nombre")||"").trim();
      const pais=String(data.get("pais")||"").trim();const interes=String(data.get("interes")||"").trim();const mensaje=String(data.get("mensaje")||"").trim();
      const body=["Hola, quiero solicitar una valoración virtual gratuita con la Dra. Alejandra Villada.",`Mi nombre: ${nombre}`,`País de residencia: ${pais}`,`Tratamiento de interés: ${interes}`,`Me gustaría mejorar: ${mensaje||"Quiero conocer mis opciones"}`,"¿Podemos coordinar una videollamada gratuita?"];
      const number=(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||"573116445913").replace(/\D/g,"");
      const url=`https://wa.me/${number}?text=${encodeURIComponent(body.join("\n"))}`;
      const popup=window.open(url,"_blank","noopener,noreferrer");if(!popup)window.location.href=url;
      if(status)status.textContent="Se abrió WhatsApp con tu solicitud preparada; confirma el envío desde allí.";
    };
    form?.addEventListener("submit",submit);
    return ()=>{menu?.removeEventListener("click",toggle);nav?.querySelectorAll("a").forEach(a=>a.removeEventListener("click",close));slider?.removeEventListener("input",updateFixed);prev?.removeEventListener("click",onPrev);next?.removeEventListener("click",onNext);form?.removeEventListener("submit",submit)};
  },[]);
  return null;
}
