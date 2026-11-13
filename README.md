# Dra. Alejandra Villada — Diseño de Sonrisa (V5, rediseño completo)

Proyecto Next.js. Esta versión (V5) **reemplaza por completo** el contenido anterior de "Ortodoncia" por la marca real **Diseño de Sonrisa de Alta Estética**, usando fotografías reales de la doctora y de casos, y una capa de animación cinematográfica (GSAP + ScrollTrigger).

Este repositorio es ahora **el sitio oficial** del proyecto. La carpeta local `web aleja` (HTML estático con Nginx) queda como **versión histórica**; su contenido y fotos se migraron aquí.

## Qué cambió en V5

- **Contenido de marca real**: hero, trust bar, Valoración Virtual, tarjetas protagonistas (Lentes Cerámicos / Resina de Alta Estética), tratamientos complementarios, resultados, la doctora, Colombia, FAQ — todo adaptado de `web aleja` (antes solo existía ahí).
- **Fotos reales** en `public/images/real/`: retrato de la doctora, portada de marca y casos reales antes/después (ver "Fotos reales — pendiente de verificación" abajo).
- **Firma de diseño**: un *scroll story* anclado (`position:sticky`) en la sección de Resultados, donde una máscara circular revela la foto "después" sobre la "antes" a medida que se hace scroll, con texto de etapa (01/02/03) y barra de progreso sincronizados. Construido siguiendo las técnicas del skill gratuito [MotionSites Web Builder](https://motionsites.ai/?utm_source=claude-skill&utm_medium=skill&utm_campaign=web-builder) (liquid glass, entrada de titular palabra-por-palabra con blur, scroll reveals, sticky cinematic stage).
- **Formulario de WhatsApp embebido al final de la página** (sección `#contacto`), con los mismos campos de calificación que antes vivían en un modal (nombre, teléfono con código de país, origen, ciudad, tratamiento, plazo, qué desea mejorar con chips, confirmación). **Ya no hay modal ni botón flotante**: todo CTA de la página hace scroll hasta este formulario y preselecciona el tratamiento.
- Paleta y tipografía alineadas a la marca real (Cormorant Garamond + Plus Jakarta Sans, espresso/marfil/rosa-oro), tomadas de la portada de Facebook oficial y de `web aleja/.agents/skills/web-dev/SKILL.md`.

## Fotos reales — pendiente de verificación clínica

Las siguientes combinaciones "antes/después" son una **suposición visual** basada en encuadre y fecha de las fotos entregadas, **no una confirmación clínica**. Antes de publicar, la doctora debe verificar que cada par corresponde realmente al mismo paciente:

- `caso-a-preparacion.jpg` → `caso-a-resultado.jpg`: usado como caso principal del scroll story en Resultados.
- `caso-b-antes-apinamiento.jpg` → `caso-b-despues-cercano.jpg`: usado como caso secundario en la franja de comparación.
- `sonrisa-resultado-amplia.jpg`: usada como imagen de fondo del hero (no se afirma que sea par de ninguna otra foto).
- `caso-c-antes-manchas.jpg`: guardada en `public/images/real/` pero **no usada todavía** en ninguna sección.
- La foto del muñón de implante (`caso-implante-muñon.jpg` en `web aleja/assets/images/real/`) **no se copió** a este proyecto por decisión explícita: es un paso clínico intermedio, no un resultado estético para mostrar en público.

## Archivos importantes

- `src/content/sections.html`: estructura HTML completa, editable sección por sección. **Después de editarlo, corre `node scripts/gen-sections.js`** para regenerar `src/content/sections.ts` (el archivo que realmente se importa).
- `src/app/globals.css`: sistema visual completo (paleta, tipografía, componentes, responsive).
- `src/components/SiteInteractions.tsx`: menú móvil, nav activo por scroll, acordeón FAQ animado, carrusel de testimonios, galería de Colombia, formulario de WhatsApp, y todas las animaciones GSAP (entrada del hero, reveals, scroll story con spotlight, contador de años).
- `public/images/real/`: fotos reales (doctora, casos, portada de marca).
- `public/icons/`, `public/brand/`: iconografía e identidad reutilizadas del build anterior.

## Ejecutar localmente

```sh
npm install
npm run dev
```

Accede a http://localhost:3000. Antes de subir al servidor ejecuta:

```sh
npm run check
npm run build
```

Ambos se validaron sin errores para esta entrega. Probado interactivamente en escritorio y móvil: menú, acordeón FAQ, formulario con validación, comparador de resultados, carrusel de Colombia.

## Desplegar en Coolify

Igual que en V3/V4: Docker Compose (`docker-compose.yml`), servicio `frontend`, puerto interno `3000`. Configura `NEXT_PUBLIC_WHATSAPP_NUMBER` y `NEXT_PUBLIC_SITE_URL` (para las imágenes de Open Graph) en las variables de entorno de Coolify.

## Requisitos antes de publicar

- Verificar y confirmar los pares antes/después reales (ver sección de arriba).
- Sustituir los testimonios de muestra por testimonios reales autorizados.
- Verificar formación, títulos, experiencia y servicios efectivamente prestados.
- Publicar la política de tratamiento de datos aplicable y validar el consentimiento real antes de activar captación pública.
- Eliminar `noindex` únicamente después de la aprobación de contenidos y permisos.
