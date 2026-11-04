"use client";
import { useEffect } from 'react';
export default function SiteInteractions(){
 useEffect(()=>{
  document.querySelectorAll<HTMLImageElement>('img[data-fallback]').forEach(img=>{img.addEventListener('error',()=>{if(img.dataset.fallback && !img.dataset.replaced){img.dataset.replaced='yes';img.src=img.dataset.fallback;}})});
  const form=document.getElementById('whatsapp-form') as HTMLFormElement|null;
  const status=document.getElementById('form-status');
  if(!form)return;
  const send=(ev:Event)=>{
   ev.preventDefault();
   if(!form.reportValidity())return;
   const data=new FormData(form);
   const message=`Hola, quisiera solicitar mi videollamada inicial gratuita con la Dra. Alejandra Villada.\n\nNombre: ${data.get('nombre')}\nPaís: ${data.get('pais')}\nWhatsApp: ${data.get('telefono')||'Por confirmar'}\nInterés: ${data.get('interes')}\nMe gustaría mejorar: ${data.get('mensaje')||'Quiero explorar opciones'}`;
   const number=(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573116445913').replace(/[^\d]/g,'');
   if(number){window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');if(status)status.textContent='Se abrió WhatsApp. El mensaje solo se enviará si confirmas el envío en la aplicación.';}
   else { navigator.clipboard?.writeText(message).then(()=>{if(status)status.textContent='Mensaje preparado y copiado. Para abrir WhatsApp de la clínica falta configurar su número real.'}).catch(()=>{if(status)status.textContent='WhatsApp pendiente: configura NEXT_PUBLIC_WHATSAPP_NUMBER. Mensaje: '+message;}); }
  };
  form.addEventListener('submit',send);
  return ()=>form.removeEventListener('submit',send);
 },[]);
 return null;
}
