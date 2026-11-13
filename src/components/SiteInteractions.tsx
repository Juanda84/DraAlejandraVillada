"use client";
import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const TESTIMONIALS = [
  {
    quote: "Mi mayor temor era que el diseño se viera artificial, pero la Dra. Alejandra logró unos lentes cerámicos tan naturales que todos admiran mi sonrisa.",
    author: "— Paciente internacional de Diseño de Sonrisa",
  },
  {
    quote: "Viajé desde Miami a Pereira por 7 días. Ver primero la prueba Mockup en mi boca me dio total seguridad y el resultado superó todo lo que imaginé.",
    author: "— Paciente de Lentes Cerámicos (EE. UU.)",
  },
  {
    quote: "Elegí el diseño en resina de alta estética sin desgaste dental. En dos citas mi sonrisa rejuveneció por completo conservando mis dientes intactos.",
    author: "— Paciente de Diseño en Resina Estética",
  },
];

export default function SiteInteractions() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    const on = <K extends keyof HTMLElementEventMap>(el: Element | null, type: K, fn: (e: HTMLElementEventMap[K]) => void) => {
      if (!el) return;
      el.addEventListener(type, fn as EventListener);
      cleanups.push(() => el.removeEventListener(type, fn as EventListener));
    };

    // --- Mobile menu ---
    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");
    const closeMobileNav = () => {
      mobileNav?.classList.remove("open");
      menuToggle?.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    };
    on(menuToggle, "click", () => {
      const open = mobileNav?.classList.toggle("open") || false;
      menuToggle?.classList.toggle("is-open", open);
      menuToggle?.setAttribute("aria-expanded", String(open));
    });
    mobileNav?.querySelectorAll("a").forEach((a) => on(a, "click", closeMobileNav));

    // --- Active nav link on scroll ---
    const navAnchors = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-links a"));
    const sectionEls = navAnchors
      .map((a) => document.querySelector(a.getAttribute("href") || ""))
      .filter(Boolean) as HTMLElement[];
    const updateActiveNav = () => {
      const y = window.scrollY + 160;
      let currentId = "inicio";
      sectionEls.forEach((sec) => {
        if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) currentId = sec.id;
      });
      navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`));
    };
    on(window as unknown as Element, "scroll", updateActiveNav);
    updateActiveNav();

    // --- Preselect treatment on any CTA, then let the browser scroll to #contacto ---
    const leadTreatment = document.getElementById("leadTreatment") as HTMLSelectElement | null;
    document.querySelectorAll<HTMLAnchorElement>("[data-preselect]").forEach((btn) => {
      on(btn, "click", () => {
        const value = btn.getAttribute("data-preselect");
        if (!value || !leadTreatment) return;
        const match = Array.from(leadTreatment.options).find((o) => o.value === value);
        if (match) leadTreatment.value = value;
      });
    });

    // --- FAQ accordion (animated) ---
    document.querySelectorAll<HTMLElement>(".faq-item").forEach((item) => {
      const btn = item.querySelector(".faq-q");
      const panel = item.querySelector<HTMLElement>(".faq-a");
      if (!btn || !panel) return;
      gsap.set(panel, {height: 0, overflow: "hidden"});
      on(btn, "click", () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach((other) => {
          if (other !== item) {
            other.classList.remove("open");
            const otherPanel = other.querySelector<HTMLElement>(".faq-a");
            if (otherPanel) gsap.to(otherPanel, {height: 0, duration: 0.3, ease: "power2.in"});
          }
        });
        if (!isOpen) {
          item.classList.add("open");
          gsap.fromTo(panel, {height: 0}, {height: "auto", duration: 0.38, ease: "power2.out"});
        } else {
          item.classList.remove("open");
          gsap.to(panel, {height: 0, duration: 0.3, ease: "power2.in"});
        }
      });
    });

    // --- Testimonial carousel ---
    const quoteEl = document.getElementById("testimonialQuote");
    const authorEl = document.getElementById("testimonialAuthor");
    const dots = Array.from(document.querySelectorAll<HTMLButtonElement>(".testimonial-dots .dot"));
    dots.forEach((dot) => {
      on(dot, "click", () => {
        const index = Number(dot.getAttribute("data-index")) || 0;
        const data = TESTIMONIALS[index];
        if (!data || !quoteEl || !authorEl) return;
        dots.forEach((d) => d.classList.remove("active"));
        dot.classList.add("active");
        gsap.to([quoteEl, authorEl], {
          opacity: 0,
          duration: 0.18,
          onComplete: () => {
            quoteEl.textContent = data.quote;
            authorEl.textContent = data.author;
            gsap.to([quoteEl, authorEl], {opacity: 1, duration: 0.25});
          },
        });
      });
    });

    // --- Destinations gallery ---
    const gallery = document.getElementById("destinationsRow");
    const prev = document.querySelector(".gallery-prev");
    const next = document.querySelector(".gallery-next");
    on(prev, "click", () => gallery?.scrollBy({left: -470, behavior: "smooth"}));
    on(next, "click", () => gallery?.scrollBy({left: 470, behavior: "smooth"}));

    // --- Pre-qualification form -> WhatsApp (embedded, no modal) ---
    const form = document.getElementById("prevalForm") as HTMLFormElement | null;
    const status = document.getElementById("formStatus");
    const fName = document.getElementById("leadName") as HTMLInputElement | null;
    const fCountryCode = document.getElementById("leadCountryCode") as HTMLSelectElement | null;
    const fPhone = document.getElementById("leadPhone") as HTMLInputElement | null;
    const fOrigin = document.getElementById("leadOrigin") as HTMLSelectElement | null;
    const fCity = document.getElementById("leadCity") as HTMLInputElement | null;
    const fTimeline = document.getElementById("leadTimeline") as HTMLSelectElement | null;
    const fGoal = document.getElementById("leadGoal") as HTMLTextAreaElement | null;
    const fConfirm = document.getElementById("leadConfirm") as HTMLInputElement | null;
    const goalChips = Array.from(document.querySelectorAll<HTMLButtonElement>(".goal-chips .chip"));

    on(fOrigin, "change", () => {
      if (!fOrigin || !fCity) return;
      if (fOrigin.value === "Pereira / Eje Cafetero" && !fCity.value.trim()) {
        fCity.value = "Pereira, Colombia";
        fCity.closest(".fgroup")?.classList.remove("has-error");
      } else if (fOrigin.value === "Exterior" && fCity.value === "Pereira, Colombia") {
        fCity.value = "";
      }
    });

    goalChips.forEach((chip) => {
      on(chip, "click", () => {
        const phrase = chip.getAttribute("data-chip");
        if (!phrase || !fGoal) return;
        const selected = chip.classList.toggle("selected");
        let parts = fGoal.value.split(" • ").map((s) => s.trim()).filter(Boolean);
        if (selected) {
          if (!parts.includes(phrase)) parts.push(phrase);
        } else {
          parts = parts.filter((p) => p !== phrase);
        }
        fGoal.value = parts.join(" • ");
        if (fGoal.value.trim().length >= 6) fGoal.closest(".fgroup")?.classList.remove("has-error");
      });
    });

    const setError = (el: Element | null) => el?.closest(".fgroup")?.classList.add("has-error");
    const clearError = (el: Element | null) => el?.closest(".fgroup")?.classList.remove("has-error");
    [fName, fPhone, fOrigin, fCity, fTimeline, fGoal, fConfirm].forEach((el) => {
      if (!el) return;
      const evt = el.tagName === "SELECT" || (el as HTMLInputElement).type === "checkbox" ? "change" : "input";
      on(el, evt as "input", () => clearError(el));
    });

    on(form, "submit", (e) => {
      e.preventDefault();
      if (!fName || !fPhone || !fCountryCode || !fOrigin || !fCity || !fTimeline || !fGoal || !fConfirm) return;
      let valid = true;
      const nameVal = fName.value.trim();
      const phoneDigits = fPhone.value.replace(/\D/g, "");
      const originVal = fOrigin.value;
      const cityVal = fCity.value.trim();
      const timelineVal = fTimeline.value;
      const goalVal = fGoal.value.trim();

      if (nameVal.length < 3 || !/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(nameVal)) { setError(fName); valid = false; }
      if (phoneDigits.length < 7) { setError(fPhone); valid = false; }
      if (!originVal) { setError(fOrigin); valid = false; }
      if (cityVal.length < 3) { setError(fCity); valid = false; }
      if (!timelineVal) { setError(fTimeline); valid = false; }
      if (goalVal.length < 6) { setError(fGoal); valid = false; }
      if (!fConfirm.checked) { setError(fConfirm); valid = false; }

      if (!valid) {
        const firstErr = form?.querySelector<HTMLElement>(".has-error input, .has-error select, .has-error textarea");
        firstErr?.focus();
        return;
      }

      const treatmentVal = leadTreatment?.value || "Diseño de Sonrisa — Deseo asesoría para elegir";
      const contactPhone = fCountryCode.value === "Otro" ? fPhone.value.trim() : `${fCountryCode.value} ${fPhone.value.trim()}`;
      const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "573116445913").replace(/\D/g, "");
      const lines = [
        "✨ FICHA DE PRE-VALORACIÓN — DRA. ALEJANDRA VILLADA ✨",
        "",
        `Paciente: ${nameVal}`,
        `Móvil: ${contactPhone}`,
        `Ubicación: ${cityVal} (${originVal})`,
        "",
        `Tratamiento de interés: ${treatmentVal}`,
        `Qué desea mejorar: ${goalVal}`,
        `Plazo estimado para iniciar: ${timelineVal}`,
        "",
        "Hola equipo de la Dra. Alejandra Villada, completé mi ficha de pre-valoración en la página web y me gustaría coordinar mi valoración.",
      ];
      const url = `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
      const popup = window.open(url, "_blank", "noopener,noreferrer");
      if (!popup) window.location.href = url;
      if (status) status.textContent = "Se abrió WhatsApp con tu ficha lista; confirma el envío desde allí.";
    });

    if (reduceMotion) return () => cleanups.forEach((fn) => fn());

    // --- Hero word-by-word entrance ---
    const h1 = document.querySelector<HTMLElement>("[data-split-words]");
    if (h1 && !h1.dataset.split) {
      const words = h1.textContent?.trim().split(/\s+/) || [];
      h1.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
      h1.dataset.split = "1";
    }

    const heroTl = gsap.timeline({defaults: {ease: "power3.out"}});
    heroTl
      .fromTo(".hero-bg img", {scale: 1.12}, {scale: 1, duration: 2.2, ease: "power2.out"})
      .fromTo(".hero .eyebrow", {y: 16, opacity: 0}, {y: 0, opacity: 1, duration: 0.6}, 0.1)
      .fromTo("[data-split-words] .word", {y: 24, opacity: 0, filter: "blur(10px)"}, {y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, stagger: 0.07}, 0.25)
      .fromTo(".hero-sub", {y: 18, opacity: 0}, {y: 0, opacity: 1, duration: 0.6}, 0.55)
      .fromTo(".hero-feature", {y: 14, opacity: 0}, {y: 0, opacity: 1, duration: 0.5, stagger: 0.08}, 0.68)
      .fromTo(".hero-actions > *", {y: 14, opacity: 0}, {y: 0, opacity: 1, duration: 0.5, stagger: 0.1}, 0.82);

    gsap.to(".hero-bg img", {yPercent: 10, ease: "none", scrollTrigger: {trigger: ".hero", start: "top top", end: "bottom top", scrub: true}});

    const reveal = (selector: string, vars: gsap.TweenVars = {}) => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        gsap.from(el, {y: 34, opacity: 0, duration: 0.8, ease: "power3.out", ...vars, scrollTrigger: {trigger: el, start: "top 85%", toggleActions: "play none none none"}});
      });
    };
    const revealBatch = (selector: string, vars: gsap.TweenVars = {}) => {
      ScrollTrigger.batch(selector, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => gsap.from(batch, {y: 28, opacity: 0, duration: 0.65, ease: "power3.out", stagger: 0.09, ...vars}),
      });
    };

    revealBatch(".trust-item", {stagger: 0.08});
    revealBatch(".process-card", {stagger: 0.12});
    reveal(".valoracion-copy");
    gsap.fromTo(".laptop", {autoAlpha: 0, rotateY: -45}, {autoAlpha: 1, rotateY: 0, duration: 1, ease: "power3.out", scrollTrigger: {trigger: ".laptop", start: "top 85%", toggleActions: "play none none none"}});
    reveal(".colombia-card", {x: 24, y: 0});
    revealBatch(".pcard", {stagger: 0.12});
    revealBatch(".treat-card", {stagger: 0.07});
    revealBatch(".compare-card", {stagger: 0.1});
    revealBatch(".results-benefits > div", {stagger: 0.08});
    reveal(".doctor-photo", {scale: 0.94, y: 0});
    reveal(".doctor-copy");
    reveal(".testimonial", {x: 24, y: 0});
    reveal(".colombia-hero-copy");
    revealBatch(".destinations-row article", {stagger: 0.08});
    revealBatch(".faq-item", {stagger: 0.06});
    reveal(".contact-copy");
    reveal(".contact-card", {x: 24, y: 0});

    // --- Count-up "+N años" ---
    const yearsEl = document.getElementById("yearsCount");
    if (yearsEl) {
      const obj = {v: 0};
      gsap.to(obj, {
        v: 10,
        duration: 1.4,
        ease: "power1.out",
        scrollTrigger: {trigger: yearsEl, start: "top 90%", toggleActions: "play none none none"},
        onUpdate: () => { yearsEl.textContent = `+${Math.round(obj.v)}`; },
      });
    }

    // --- Signature: pinned before/after smile-journey scroll story ---
    const pin = document.getElementById("resultsPin");
    const spotlightAfter = document.getElementById("spotlightAfter");
    const stageEl = document.getElementById("resultsStage");
    const progressBars = Array.from(document.querySelectorAll<HTMLElement>("#resultsProgress i"));
    const stageLabels = ["01 — Punto de partida", "02 — Transformando tu sonrisa", "03 — Resultado final"];
    if (pin && spotlightAfter && stageEl) {
      ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          spotlightAfter.style.clipPath = `circle(${Math.min(p * 150, 150)}% at 50% 50%)`;
          const stageIndex = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
          if (stageEl.textContent !== stageLabels[stageIndex]) stageEl.textContent = stageLabels[stageIndex];
          progressBars.forEach((bar, i) => {
            const segStart = i / 3;
            const segEnd = (i + 1) / 3;
            const segProgress = Math.min(Math.max((p - segStart) / (segEnd - segStart), 0), 1);
            gsap.set(bar, {scaleX: segProgress});
          });
        },
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((st) => st.kill());
      heroTl.kill();
    };
  }, []);

  return null;
}
