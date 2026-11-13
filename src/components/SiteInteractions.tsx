"use client";
import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

export default function SiteInteractions(){
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const menu=document.querySelector<HTMLButtonElement>(".menu-toggle");
    const nav=document.getElementById("main-nav");
    const toggle=()=>{const open=nav?.classList.toggle("open")||false; menu?.classList.toggle("is-open",open); menu?.setAttribute("aria-expanded", String(open));};
    const close=()=>{nav?.classList.remove("open");menu?.classList.remove("is-open");menu?.setAttribute("aria-expanded","false");};
    menu?.addEventListener("click",toggle);
    nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));

    const slider=document.getElementById("case-range") as HTMLInputElement|null;
    const before=document.getElementById("case-before") as HTMLElement|null;
    const split=document.getElementById("case-split") as HTMLElement|null;
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

    // Animated accordion for FAQ (instead of the instant native <details> jump).
    const faqItems=Array.from(document.querySelectorAll<HTMLDetailsElement>(".faq-questions details"));
    const faqHandlers:{el:HTMLDetailsElement,fn:(e:Event)=>void}[]=[];
    faqItems.forEach(detail=>{
      const summary=detail.querySelector("summary");
      const panel=detail.querySelector("p");
      if(!summary||!panel)return;
      if(!reduceMotion) gsap.set(panel,{height:detail.open?"auto":0,overflow:"hidden"});
      const onClick=(e:Event)=>{
        e.preventDefault();
        if(reduceMotion){detail.open=!detail.open;return;}
        if(!detail.open){
          detail.open=true;
          gsap.fromTo(panel,{height:0},{height:"auto",duration:.38,ease:"power2.out"});
        }else{
          gsap.to(panel,{height:0,duration:.3,ease:"power2.in",onComplete:()=>{detail.open=false;}});
        }
      };
      summary.addEventListener("click",onClick);
      faqHandlers.push({el:detail,fn:onClick});
    });

    if(reduceMotion){
      return ()=>{
        menu?.removeEventListener("click",toggle);nav?.querySelectorAll("a").forEach(a=>a.removeEventListener("click",close));
        slider?.removeEventListener("input",updateFixed);prev?.removeEventListener("click",onPrev);next?.removeEventListener("click",onNext);
        form?.removeEventListener("submit",submit);
        faqHandlers.forEach(({el,fn})=>el.querySelector("summary")?.removeEventListener("click",fn));
      };
    }

    // --- Cinematic hero entrance ---
    const heroTl=gsap.timeline({defaults:{ease:"power3.out"}});
    heroTl
      .fromTo(".hero-bg",{scale:1.12},{scale:1,duration:1.8,ease:"power2.out"})
      .fromTo(".hero .eyebrow",{y:16,opacity:0},{y:0,opacity:1,duration:.6},.15)
      .fromTo(".hero h1",{y:30,opacity:0},{y:0,opacity:1,duration:.7},.28)
      .fromTo(".hero-sub",{y:20,opacity:0},{y:0,opacity:1,duration:.6},.42)
      .fromTo(".hero-value-icons>div",{y:16,opacity:0},{y:0,opacity:1,duration:.5,stagger:.08},.55)
      .fromTo(".hero-button",{y:14,opacity:0,scale:.95},{y:0,opacity:1,scale:1,duration:.55},.68)
      .fromTo(".hero-assurance",{opacity:0},{opacity:1,duration:.5},.8)
      .fromTo(".hero-phases>div,.hero-phases>i",{x:36,opacity:0},{x:0,opacity:1,duration:.55,stagger:.14},.5);

    // Gentle parallax on the hero background as the section scrolls past.
    gsap.to(".hero-bg",{yPercent:14,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});

    // Reusable fade-up reveal for individual elements, once, on scroll-in.
    const reveal=(selector:string,vars:gsap.TweenVars={})=>{
      gsap.utils.toArray<HTMLElement>(selector).forEach(el=>{
        gsap.from(el,{y:36,opacity:0,duration:.85,ease:"power3.out",...vars,
          scrollTrigger:{trigger:el,start:"top 85%",toggleActions:"play none none none"}});
      });
    };
    // Reusable staggered reveal for a group of siblings that should animate in together.
    const revealBatch=(selector:string,vars:gsap.TweenVars={})=>{
      ScrollTrigger.batch(selector,{
        start:"top 88%",
        once:true,
        onEnter:(batch)=>gsap.from(batch,{y:30,opacity:0,duration:.7,ease:"power3.out",stagger:.1,...vars}),
      });
    };

    reveal(".consultation-copy");
    reveal(".mini-card",{delay:.1});
    gsap.fromTo(".consultation-laptop",
      {autoAlpha:0,rotateY:-55,rotateZ:2,transformPerspective:950},
      {autoAlpha:1,rotateY:-7,rotateZ:2,duration:1.1,ease:"power3.out",
        scrollTrigger:{trigger:".consultation-laptop",start:"top 85%",toggleActions:"play none none none"}});

    revealBatch(".treatment-card",{stagger:.07});
    reveal(".treatments-heading");

    ScrollTrigger.create({
      trigger:".case-comparison",start:"top 82%",once:true,
      onEnter:()=>{
        if(!slider)return;
        const obj={v:0};
        slider.value="0";updateFixed();
        gsap.to(obj,{v:50,duration:1.3,ease:"power2.out",onUpdate:()=>{slider.value=String(Math.round(obj.v));updateFixed();}});
      }
    });
    reveal(".cases-intro");
    revealBatch(".cases-benefits>div",{stagger:.08});

    gsap.fromTo(".doctor-photo",{opacity:0,scale:.92},{opacity:1,scale:1,duration:.9,ease:"power3.out",
      scrollTrigger:{trigger:".doctor-photo",start:"top 85%",toggleActions:"play none none none"}});
    reveal(".doctor-copy");
    reveal(".testimonial",{delay:.1});

    reveal(".colombia-title");
    revealBatch(".colombia-thumbnails img",{stagger:.1});
    revealBatch(".destinations-row article",{stagger:.08});

    revealBatch(".journey-steps>div",{stagger:.12});

    gsap.fromTo(".guide-image",{clipPath:"inset(0 100% 0 0)"},{clipPath:"inset(0 0% 0 0)",duration:1,ease:"power2.out",
      scrollTrigger:{trigger:".guide-image",start:"top 85%",toggleActions:"play none none none"}});
    reveal(".guide-copy");

    revealBatch(".story-cards article",{stagger:.1,scale:.94});

    revealBatch(".faq-questions details",{stagger:.06});

    reveal(".contact-copy");
    reveal(".contact-form",{x:30,y:0});

    return ()=>{
      menu?.removeEventListener("click",toggle);nav?.querySelectorAll("a").forEach(a=>a.removeEventListener("click",close));
      slider?.removeEventListener("input",updateFixed);prev?.removeEventListener("click",onPrev);next?.removeEventListener("click",onNext);
      form?.removeEventListener("submit",submit);
      faqHandlers.forEach(({el,fn})=>el.querySelector("summary")?.removeEventListener("click",fn));
      ScrollTrigger.getAll().forEach(st=>st.kill());
      heroTl.kill();
    };
  },[]);
  return null;
}
