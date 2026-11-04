"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmileScene from "./SmileScene";

export default function HeroExperience() {
  const root = useRef<HTMLElement>(null);
  const scroll = useRef(0);
  const [stage, setStage] = useState(0);
  const [webgl, setWebgl] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);
    try { const canvas = document.createElement("canvas"); setWebgl(!reduced && !!(canvas.getContext("webgl2") || canvas.getContext("webgl"))); } catch { setWebgl(false); }
    if (reduced || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    let old = -1;
    const trigger = ScrollTrigger.create({
      trigger: root.current, start: "top top", end: "bottom bottom",
      onUpdate(s) {
        scroll.current = s.progress;
        const next = s.progress < .27 ? 0 : s.progress < .61 ? 1 : 2;
        root.current?.style.setProperty("--smile-progress", String(s.progress));
        if (next !== old) { old = next; setStage(next); }
      }
    });
    return () => trigger.kill();
  }, []);
  return <section className="hero-story" id="inicio" ref={root} style={{"--smile-progress":0} as React.CSSProperties}>
    <div className="hero-sticky">
      <div className="hero-photo" role="img" aria-label="Imagen artística de una sonrisa natural, no corresponde a un resultado clínico" />
      <div className="hero-photo-shade" />
      <div className="hero-orbit" aria-hidden="true" />
      {webgl && !reducedMotion && <div className="hero-scene" aria-label="Arcada dental tridimensional conceptual con movimientos de armonización"><SmileScene progress={scroll}/></div>}
      <div className="hero-grain" aria-hidden="true" />
      <header className="main-nav editorial-section">
        <a className="brand-lockup" href="#inicio" aria-label="Alejandra Villada, inicio"><img src="/brand/mark-transparent.png" alt=""/><span>Alejandra <em>Villada</em><small>ORTODONCISTA · DISEÑO DE SONRISA</small></span></a>
        <nav className={menuOpen?"nav-links is-open":"nav-links"} aria-label="Menú principal"><a onClick={()=>setMenuOpen(false)} href="#tratamientos">TRATAMIENTOS</a><a onClick={()=>setMenuOpen(false)} href="#resultados">RESULTADOS</a><a onClick={()=>setMenuOpen(false)} href="#trayectoria">EXPERIENCIA</a><a onClick={()=>setMenuOpen(false)} href="#colombia">COLOMBIA</a><a onClick={()=>setMenuOpen(false)} href="#preguntas">PREGUNTAS</a></nav>
        <a className="nav-cta" href="#consulta">VIDEOLLAMADA GRATUITA ↗</a>
        <button className="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?"CERRAR":"MENÚ"} <span>{menuOpen?"×":"☰"}</span></button>
      </header>
      <div className="hero-content editorial-section">
        <div className="hero-intro"><span className="hero-eyebrow">ODONTOLOGÍA ESTÉTICA · PEREIRA, COLOMBIA</span>
          <h1>{stage===2?<>El arte de <em>sonreír siendo tú.</em></>:<>Hay una sonrisa <em>que todavía no has descubierto.</em></>}</h1>
          <p>Tu transformación comienza con una conversación, no con un viaje. Conoce las alternativas odontológicas y habla directamente con Alejandra en una videollamada inicial gratuita.</p>
          <div className="hero-buttons"><a href="#consulta" className="button-primary">AGENDAR MI VIDEOLLAMADA GRATIS <span>↗</span></a><a href="#tratamientos" className="hero-text-link">DESCUBRIR TRATAMIENTOS <span>↓</span></a></div>
        </div>
        <div className="hero-phase"><span>ESTUDIO DE MOVIMIENTO · CONCEPTUAL</span><strong>{["01 · CADA SONRISA ES DIFERENTE", "02 · EL DETALLE IMPORTA", "03 · ARMONÍA PERSONALIZADA"][stage]}</strong><div className="phase-bars">{[0,1,2].map(v=><i key={v} className={v<=stage?"on":""}/>)}</div></div>
      </div>
      <div className="hero-bottomline editorial-section"><span>UNA EXPERIENCIA HECHA PARA TI</span><span>DESLIZA PARA DESCUBRIR ↓</span><span>IMAGEN ARTÍSTICA · NO SIMULACIÓN CLÍNICA</span></div>
    </div>
  </section>;
}
