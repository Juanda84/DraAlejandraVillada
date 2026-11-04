from pathlib import Path
import base64,re
root=Path(__file__).parent
public=root/'public'
css=(root/'src/app/globals.css').read_text()
media={}
for name in ['images/hero-smile.webp','images/alejandra-villada.png','images/colombia-cocora-demo.webp','images/colombia-cartagena-demo.webp','images/colombia-mountains-demo.webp','brand/mark-transparent.png']:
 f=public/name
 mime={'webp':'image/webp','png':'image/png'}[f.suffix[1:]]
 media['/'+name]=f'data:{mime};base64,'+base64.b64encode(f.read_bytes()).decode()
for key,val in media.items():
 css=css.replace("url('"+key+"')","url('"+val+"')")
 # url img fallback not in CSS
svg='''<svg class="hero-svg-preview" viewBox="0 0 720 300" aria-hidden="true"><defs><linearGradient id="dentalGlow" x1="0" x2=".7" y1="0" y2="1"><stop offset="0" stop-color="#fff8f1" stop-opacity=".9"/><stop offset="1" stop-color="#f1c3a9" stop-opacity=".18"/></linearGradient></defs>'''
for i in range(12):
 x=90+i*45; y=62+abs(i-5.5)**1.4*3
 angle=(i-5.5)*-2
 svg+=f'''<g class="preview-tooth" data-i="{i}" transform="translate({x:.1f} {y:.1f}) rotate({angle:.1f})"><path d="M-19 0 C-28 10 -23 59 -14 71 Q0 83 14 71 C23 60 28 11 19 0 Q0 -9 -19 0 Z" fill="url(#dentalGlow)" fill-opacity=".04" stroke="#fce4d5" stroke-opacity=".83" stroke-width="1.65"/></g>'''
svg+='</svg>'
hero='''<section class="hero-story" id="inicio" style="--smile-progress:0"><div class="hero-sticky"><div class="hero-photo" role="img" aria-label="Imagen artística de una sonrisa natural, no corresponde a un resultado clínico"></div><div class="hero-photo-shade"></div><div class="hero-orbit" aria-hidden="true"></div><div class="hero-scene hero-scene--preview">'''+svg+'''</div><div class="hero-grain"></div><header class="main-nav editorial-section"><a class="brand-lockup" href="#inicio"><img src="/brand/mark-transparent.png" alt=""/><span>Alejandra <em>Villada</em><small>ORTODONCISTA · DISEÑO DE SONRISA</small></span></a><nav class="nav-links" aria-label="Menú principal"><a href="#tratamientos">TRATAMIENTOS</a><a href="#resultados">RESULTADOS</a><a href="#trayectoria">EXPERIENCIA</a><a href="#colombia">COLOMBIA</a><a href="#preguntas">PREGUNTAS</a></nav><a class="nav-cta" href="#consulta">VIDEOLLAMADA GRATUITA ↗</a><button class="menu-toggle" aria-label="Abrir menú">MENÚ ☰</button></header><div class="hero-content editorial-section"><div class="hero-intro"><span class="hero-eyebrow">ODONTOLOGÍA ESTÉTICA · PEREIRA, COLOMBIA</span><h1>Hay una sonrisa <em>que todavía no has descubierto.</em></h1><p>Tu transformación comienza con una conversación, no con un viaje. Conoce las alternativas odontológicas y habla directamente con Alejandra en una videollamada inicial gratuita.</p><div class="hero-buttons"><a href="#consulta" class="button-primary">AGENDAR MI VIDEOLLAMADA GRATIS <span>↗</span></a><a href="#tratamientos" class="hero-text-link">DESCUBRIR TRATAMIENTOS <span>↓</span></a></div></div><div class="hero-phase"><span>ESTUDIO DE MOVIMIENTO · CONCEPTUAL</span><strong id="preview-phase">01 · CADA SONRISA ES DIFERENTE</strong><div class="phase-bars"><i class="on"></i><i></i><i></i></div></div></div><div class="hero-bottomline editorial-section"><span>UNA EXPERIENCIA HECHA PARA TI</span><span>DESLIZA PARA DESCUBRIR ↓</span><span>GRÁFICO ILUSTRATIVO · LA VERSIÓN REACT USA THREE.JS</span></div></div></section>'''
for key,val in media.items():
 hero=hero.replace('"'+key+'"','"'+val+'"')
sections=(root/'src/content/sections.html').read_text()
for key,val in media.items():
 sections=sections.replace('"'+key+'"','"'+val+'"')
# In html we preserve original external images and replace the fallback references with embedded data-uri
js='''
const hero=document.querySelector('.hero-story');const teeth=[...document.querySelectorAll('.preview-tooth')];const phases=["01 · CADA SONRISA ES DIFERENTE","02 · EL DETALLE IMPORTA","03 · ARMONÍA PERSONALIZADA"];
function applyScroll(){if(!hero)return;const rect=hero.getBoundingClientRect();const limit=Math.max(1,rect.height-innerHeight);const p=Math.max(0,Math.min(1,-rect.top/limit));hero.style.setProperty('--smile-progress',p.toFixed(3));const stage=p<.27?0:p<.61?1:2;document.querySelector('#preview-phase').textContent=phases[stage];document.querySelectorAll('.phase-bars i').forEach((el,i)=>el.classList.toggle('on',i<=stage));teeth.forEach((el,i)=>{const rank=(i*7)%12;let t=Math.max(0,Math.min(1,(p-.06-rank*.025)/.52));t=t*t*(3-2*t);const dx=(1-t)*Math.sin(i*2.45)*14;const dy=(1-t)*Math.cos(i*2.71)*13;const a=(1-t)*Math.sin(i*1.7)*9;el.style.transform=`translate(${dx}px,${dy}px) rotate(${a}deg)`;});}addEventListener('scroll',applyScroll,{passive:true});addEventListener('resize',applyScroll);applyScroll();
document.querySelector('.menu-toggle')?.addEventListener('click',()=>{document.querySelector('.nav-links')?.classList.toggle('is-open')});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav-links')?.classList.remove('is-open')));
document.querySelectorAll('img[data-fallback]').forEach(img=>{img.addEventListener('error',()=>{if(!img.dataset.replaced){img.dataset.replaced='yes';img.src=img.dataset.fallback}})});
const form=document.getElementById('whatsapp-form');form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const message=`Hola, quisiera solicitar mi videollamada inicial gratuita con la Dra. Alejandra Villada.\n\nNombre: ${d.get('nombre')}\nPaís: ${d.get('pais')}\nMi WhatsApp: ${d.get('telefono')||'Por confirmar'}\nTratamiento: ${d.get('interes')}\nInquietud: ${d.get('mensaje')||'Quiero explorar opciones'}`;const url='https://wa.me/573116445913?text='+encodeURIComponent(message);window.open(url,'_blank','noopener,noreferrer');const status=document.getElementById('form-status');if(status)status.textContent='WhatsApp se abrió con tu mensaje preparado. Comprueba los datos y pulsa enviar en WhatsApp para completar la solicitud.';});
'''
css+='\n.hero-svg-preview{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 1px 7px rgba(249,225,203,.34))}.hero-scene--preview{opacity:.46;mix-blend-mode:screen;top:28%;height:42%;width:57%;right:0}.preview-tooth{transition:transform .05s linear;transform-box:fill-box;transform-origin:center}\n'
html='<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dra. Alejandra Villada — Vista previa integral</title><meta name="robots" content="noindex,nofollow"><style>'+css+'</style></head><body>'+hero+sections+'<script>'+js+'</script></body></html>'
(root/'vista-previa.html').write_text(html)
print('Preview bytes:',(root/'vista-previa.html').stat().st_size)
