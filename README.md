# Smile in Motion — Dra. Alejandra Villada

Primera prueba de concepto interactiva del sitio web de la Dra. Alejandra Villada: Next.js, React Three Fiber, Three.js y GSAP.

**Inicio rápido:** `npm install && npm run dev` → `http://localhost:3000`.

**Vista previa sin dependencias:** abre `vista-previa.html` (representación SVG, no Three.js).

**Despliegue Coolify:** `docker-compose.yml` incluido (Git → Docker Compose → servicio `frontend` → puerto interno 3000). Alternativamente puede desplegarse solo con `Dockerfile`. Lee `docs/DESPLIEGUE_COOLIFY_COMPOSE.md`.

Consulta `docs/ARQUITECTURA_Y_ENTREGA.md` para alcance, limitaciones, criterios de prueba y pasos de despliegue. El botón del formulario abre WhatsApp al número confirmado (+57 311 644 5913) con el mensaje preparado; no envía automáticamente ni almacena solicitudes en un servidor. Este diseño sigue siendo un prototipo y requiere revisión de privacidad antes de publicarse.
