# Dra. Alejandra Villada — réplica visual V4 (animada)

Proyecto de desarrollo **estático con Next.js**, basado en el mockup aprobado `docs/Mockup aprobado.png`, con una capa de animación GSAP añadida sobre la maquetación ya aprobada en V3. Diseño preparado para evaluar con la doctora en **un entorno privado de pruebas** antes de integrar fotografías clínicas, testimonios verificables y las funciones finales de publicación.

## Archivos importantes

- `src/content/sections.html`: estructura HTML editable sección por sección.
- `src/app/globals.css`: sistema visual responsive (paleta y composiciones).
- `src/components/SiteInteractions.tsx`: menú móvil, comparador visual, carrusel de destinos, envío del formulario y todas las animaciones GSAP (entrada del hero, parallax, revelados al hacer scroll, acordeón del FAQ).
- `public/icons/`: 15 iconos SVG originales, creados para la identidad.
- `public/images/`: recursos visuales locales, foto original proporcionada por el usuario y material gráfico de concepto.
- `vista-previa.html`: vista previa autónoma, contiene los recursos incrustados; no requiere instalar nada.
- `docker-compose.yml` y `Dockerfile`: archivos de despliegue para Coolify.

## Comportamiento comercial

Todos los **CTA comerciales llevan a `#contacto`**. No hay número visible de WhatsApp, botón flotante ni enlaces directos a WhatsApp. El formulario solicita nombre, país, tratamiento e inquietud opcional y una confirmación de uso de datos; no pide teléfono.

**Solo al completar y enviar el formulario**, se abre WhatsApp con un mensaje precargado dirigido al número configurado (`NEXT_PUBLIC_WHATSAPP_NUMBER`, por defecto `573116445913`). El paciente envía el mensaje desde su propia cuenta; el proyecto no guarda datos en una base de datos ni utiliza una API de WhatsApp.

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

`npm run check` y `npm run build` se validaron sin errores para esta entrega, y la composición animada se probó en Chromium en escritorio y móvil (menú, acordeón FAQ, comparador antes/después, revelados por scroll).

## Desplegar en Coolify

1. Extrae el contenido de la carpeta del ZIP en la **raíz del repositorio**.
2. Comprueba que `package.json`, `Dockerfile`, `docker-compose.yml` y `src/` quedan en la raíz.
3. Haz commit y push a GitHub.
4. En Coolify elige estrategia **Docker Compose**, fichero `docker-compose.yml`, servicio `frontend`, puerto interno `3000`.
5. Configura el dominio de desarrollo y despliega. No se requiere montar volúmenes ni exponer el puerto 3000 al exterior.
6. Protege el dominio de desarrollo mediante autenticación de acceso. `robots: noindex` **no reemplaza** un control de acceso.

## Requisitos antes de publicar

- Sustituir los textos de testimonios de muestra por testimonios reales autorizados.
- Sustituir el comparador ilustrativo por casos y fotografías clínicas con autorización de publicación.
- Verificar formación, títulos, experiencia y servicios efectivamente prestados.
- Publicar la política de tratamiento de datos aplicable y validar el consentimiento real antes de activar captación pública.
- Confirmar con la doctora el alcance de la teleorientación y del seguimiento de alineadores internacionales.
- Eliminar `noindex` únicamente después de la aprobación de contenidos y permisos.

## Alcance de V4

Sobre la fidelidad visual estática de V3 (ya aprobada), se añadió una capa de animación con **GSAP + ScrollTrigger**, respetando colores, tipografía y layout del mockup aprobado:

- Entrada cinematográfica del hero (textos, iconos y botón en cascada, zoom suave de la imagen de fondo).
- Parallax sutil del fondo del hero al hacer scroll.
- Revelados (`fade + slide`) de cada sección al entrar en pantalla, con stagger en tarjetas de tratamientos, destinos, pasos del proceso e historias.
- Tilt 3D de entrada en el mockup del laptop (sección de videollamada).
- Barrido animado del comparador antes/después al llegar a la sección de resultados.
- Acordeón de FAQ con apertura/cierre suave (en lugar del salto instantáneo nativo).
- Menú móvil con transición de opacidad/deslizamiento y ícono hamburguesa animado a "X".
- Micro-interacciones: brillo en botones, subrayado animado del menú, iconos de tratamientos con hover, insignia "+10 años" flotando.
- Todas las animaciones respetan `prefers-reduced-motion: reduce` (se muestran directamente en su estado final, sin movimiento).

`vista-previa.html` quedó **sin actualizar** (sigue reflejando la versión estática V3); la versión animada vive únicamente en el proyecto Next.js.
