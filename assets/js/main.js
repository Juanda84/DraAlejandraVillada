/**
 * Dra. Alejandra Villada — Diseño de Sonrisa de Alta Estética
 * Interactive UI & Anti-Curiosos Pre-Qualification Funnel
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. MOBILE NAVIGATION MENU
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // =========================================================================
  // 2. ACTIVE NAVIGATION ON SCROLL
  // =========================================================================
  const sections = document.querySelectorAll('section[id], div[id="inicio"], div[id="complementarios"], footer[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-link');

  const updateActiveNav = () => {
    let currentId = 'inicio';
    const scrollY = window.scrollY + 150;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute('id') || 'inicio';
      }
    });

    navItems.forEach((item) => {
      const href = item.getAttribute('href');
      item.classList.toggle('active', href === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // =========================================================================
  // 3. FAQ ACCORDION
  // =========================================================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          const qBtn = openItem.querySelector('.faq-question');
          if (qBtn) qBtn.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // =========================================================================
  // 4. SMILE DESIGN TESTIMONIALS CAROUSEL
  // =========================================================================
  const testimonials = [
    {
      quote: '"Mi mayor temor era que el diseño se viera artificial, pero la Dra. Alejandra logró unos lentes cerámicos tan naturales que todos admiran mi sonrisa."',
      author: '— Paciente internacional de Diseño de Sonrisa'
    },
    {
      quote: '"Viajé desde Miami a Pereira por 7 días. Ver primero la prueba Mockup en mi boca me dio total seguridad y el resultado superó todo lo que imaginé."',
      author: '— Paciente de Lentes Cerámicos (EE. UU.)'
    },
    {
      quote: '"Elegí el diseño en resina de alta estética sin desgaste dental. En dos citas mi sonrisa rejuveneció por completo conservando mis dientes intactos."',
      author: '— Paciente de Diseño en Resina Estética'
    }
  ];

  const quoteEl = document.getElementById('testimonialQuote');
  const authorEl = document.getElementById('testimonialAuthor');
  const dots = document.querySelectorAll('.testimonial-dots .dot');

  if (quoteEl && authorEl && dots.length > 0) {
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = Number(dot.getAttribute('data-index')) || 0;
        const data = testimonials[index];
        if (!data) return;

        dots.forEach((d) => d.classList.remove('active'));
        dot.classList.add('active');

        quoteEl.style.opacity = '0';
        authorEl.style.opacity = '0';

        setTimeout(() => {
          quoteEl.textContent = data.quote;
          authorEl.textContent = data.author;
          quoteEl.style.transition = 'opacity 0.25s ease';
          authorEl.style.transition = 'opacity 0.25s ease';
          quoteEl.style.opacity = '1';
          authorEl.style.opacity = '1';
        }, 160);
      });
    });
  }

  // =========================================================================
  // 5. BEFORE/AFTER RESULTS SLIDER (3 REAL CASES)
  // =========================================================================
  const baSliders = document.querySelectorAll('.ba-slider');

  baSliders.forEach((slider) => {
    const range = slider.querySelector('.ba-range');
    if (!range) return;

    const updatePos = () => {
      slider.style.setProperty('--pos', `${range.value}%`);
    };

    range.addEventListener('input', updatePos);
    updatePos();
  });

  const baTabs = document.querySelectorAll('.ba-case-tab');
  const baCases = document.querySelectorAll('.ba-case');

  baTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const index = tab.getAttribute('data-case-index');

      baTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      baCases.forEach((c) => {
        c.classList.toggle('active', c.getAttribute('data-case-index') === index);
      });
    });
  });

  // =========================================================================
  // 6. INLINE VALORACIÓN FORM AT PAGE END (FILTRO ANTI-CURIOSOS -> WHATSAPP)
  // =========================================================================
  const scrollToFormBtns = document.querySelectorAll('.js-scroll-to-form');
  const prevalForm = document.getElementById('prevalForm');
  const prevalFormView = document.getElementById('prevalFormView');
  const prevalSuccessView = document.getElementById('prevalSuccessView');
  const fallbackWaLink = document.getElementById('fallbackWaLink');
  const btnResetForm = document.getElementById('btnResetForm');

  // Form fields
  const fName = document.getElementById('leadName');
  const fCountry = document.getElementById('leadCountry');
  const fTreatment = document.getElementById('leadTreatment');
  const fGoal = document.getElementById('leadGoal');

  // Scroll any WhatsApp/CTA button straight to the form at the end of the page
  scrollToFormBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselect = btn.getAttribute('data-preselect') || '';

      // Preselect treatment if matching option exists
      if (preselect && fTreatment) {
        const matchingOption = Array.from(fTreatment.options).find(
          (opt) => opt.value === preselect
        );
        if (matchingOption) {
          fTreatment.value = preselect;
        }
      }

      // Reset back to the form view in case a previous submission left the success view showing
      if (prevalFormView && prevalSuccessView) {
        prevalFormView.hidden = false;
        prevalSuccessView.hidden = true;
      }

      const formSection = document.getElementById('contacto');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      setTimeout(() => {
        if (fName && !fName.value) fName.focus();
      }, 450);
    });
  });

  if (btnResetForm) {
    btnResetForm.addEventListener('click', () => {
      prevalSuccessView.hidden = true;
      prevalFormView.hidden = false;
    });
  }

  // Validation helpers
  const setFieldError = (inputEl) => {
    const group = inputEl ? inputEl.closest('.form-group') : null;
    if (group) group.classList.add('has-error');
  };

  const clearFieldError = (inputEl) => {
    const group = inputEl ? inputEl.closest('.form-group') : null;
    if (group) group.classList.remove('has-error');
  };

  [fName, fCountry, fTreatment].forEach((el) => {
    if (!el) return;
    const evtName = el.tagName === 'SELECT' ? 'change' : 'input';
    el.addEventListener(evtName, () => clearFieldError(el));
  });

  // Submit & Build Pre-Qualification WhatsApp Message
  if (prevalForm) {
    prevalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameVal = fName.value.trim();
      const countryVal = fCountry.value;
      const treatmentVal = fTreatment.value;
      const goalVal = fGoal.value.trim();

      // 1. Validate Name (min 3 chars, must contain letters)
      if (nameVal.length < 3 || !/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(nameVal)) {
        setFieldError(fName);
        isValid = false;
      }

      // 2. Validate Country
      if (!countryVal) {
        setFieldError(fCountry);
        isValid = false;
      }

      if (!isValid) {
        const firstErr = prevalForm.querySelector('.has-error input, .has-error select, .has-error textarea');
        if (firstErr) firstErr.focus();
        return;
      }

      // Destination number: Dra. Alejandra Villada's clinic WhatsApp (+57 311 644 5913)
      const clinicWa = ['57', '311', '644', '5913'].join('');

      const messageLines = [
        '✨ *SOLICITUD DE VALORACIÓN VIRTUAL — DRA. ALEJANDRA VILLADA* ✨',
        '',
        `👤 *Nombre:* ${nameVal}`,
        `🌎 *País de residencia:* ${countryVal}`,
        `🦷 *Tratamiento de interés:* ${treatmentVal}`,
        goalVal ? `🎯 *Qué le gustaría mejorar:* ${goalVal}` : null,
        '',
        'Hola equipo de la Dra. Alejandra Villada, completé el formulario de valoración virtual en la página web y me gustaría continuar mi valoración con ustedes.'
      ].filter(Boolean);

      const waUrl = `https://wa.me/${clinicWa}?text=${encodeURIComponent(messageLines.join('\n'))}`;

      if (fallbackWaLink) {
        fallbackWaLink.href = waUrl;
      }

      if (prevalFormView && prevalSuccessView) {
        prevalFormView.hidden = true;
        prevalSuccessView.hidden = false;
        prevalSuccessView.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Track the "enviar mensaje" click (Meta Pixel + Google Analytics)
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', { content_name: treatmentVal });
      }
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          event_category: 'valoracion_form',
          event_label: treatmentVal
        });
      }

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // =========================================================================
  // 7. HIDE THE FLOATING WHATSAPP BUTTON NEAR THE VALORACIÓN FORM
  //    (avoids visual noise next to the form's own WhatsApp submit button)
  // =========================================================================
  const floatingWaBtn = document.querySelector('.floating-wa-trigger');
  const formSectionEl = document.getElementById('contacto');

  if (floatingWaBtn && formSectionEl && 'IntersectionObserver' in window) {
    const floatingWaObserver = new IntersectionObserver(
      ([entry]) => {
        floatingWaBtn.classList.toggle('is-hidden', entry.isIntersecting);
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    floatingWaObserver.observe(formSectionEl);
  }
});
