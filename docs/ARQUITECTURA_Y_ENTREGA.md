# Dra. Alejandra Villada — prototipo 01 / Smile in Motion

## Qué incluye esta entrega

- **Hero funcional de Next.js** con modelo dental tridimensional procedimental en Three.js / React Three Fiber.
- **Animación por scroll** controlada con GSAP ScrollTrigger; los 12 dientes tienen desplazamientos y rotaciones individuales y terminan en una disposición armónica conceptual.
- **Transición cromática** grafito `#2E2B28` → marfil `#F8F8F4`.
- Diseño responsive, soporte de `prefers-reduced-motion` y respaldo SVG si no hay WebGL.
- Muestra de **la narrativa editorial posterior**, bloque de 10 años y presentación de Alejandra después de la autoridad.
- Foto y logo originales preservados en `public/images` y `public/brand`.
- Dockerfile de producción para Coolify.
- Una **vista previa offline**, `vista-previa.html`, que se puede abrir sin instalar nada. Muestra las composiciones y el progreso con SVG, **no es la escena 3D real**.

## Estado y limitaciones honestas

Este es un **prototipo visual/técnico**, no una web clínica lista para pacientes. El formulario prepara un mensaje y abre WhatsApp al +57 311 644 5913 (`wa.me/573116445913`), sin enviarlo automáticamente ni registrar datos en un backend. El aviso de privacidad sigue pendiente antes de publicarse. Las fotografías de resultados no se publican hasta contar con autorizaciones. Los diez años de experiencia son la cifra informada para el proyecto: antes de publicarlo como afirmación definitiva conviene verificar los soportes.

Las imágenes dentales animadas representan un recurso conceptual, **no resultados clínicos ni el movimiento biológico real de los dientes durante una ortodoncia**.

Por la falta de acceso a npm desde el entorno de creación, NO fue posible ejecutar `npm install` ni `npm run build` aquí. La aplicación está preparada, pero exige validación local de compilación y ejecución antes de desplegar. Dependencias declaradas en `package.json` con rangos compatibles previstos; `package-lock.json` se crea al hacer `npm install`.

## Cómo revisar

### Vista previa inmediata

Abrir `vista-previa.html` en Chrome o Edge. Desplazarse para observar las etapas del hero y el cambio de fondo. La arcada de esta vista previa está representada en SVG por compatibilidad offline.

### Proyecto real Three.js + Next.js

```bash
cd alejandra-villada-prototipo
npm install
npm run dev
```

Abrir `http://localhost:3000`.

Validar antes del despliegue:

```bash
npm run lint
npm run build
```

Si aparecen incompatibilidades por las dependencias resueltas, ajustar las versiones y registrar el lockfile. Una vez validado, se recomienda versionar el archivo `package-lock.json`.

## Cómo subirlo manualmente a GitHub y Coolify

1. Si es un proyecto nuevo, crear repositorio GitHub vacío e inicializar Git en la carpeta del proyecto.
2. Copiar el **contenido** de este ZIP a la carpeta raíz del repositorio, no dentro de una segunda carpeta si ya tienes un proyecto.
3. Ejecutar `npm install`, `npm run lint` y `npm run build` en el computador.
4. Ejecutar `git add .`, `git commit -m "feat: prototipo hero 3D sonrisa"` y `git push origin main`.
5. En Coolify, seleccionar el repositorio y el buildpack **Dockerfile**, con puerto 3000. Activar el autodespliegue por webhook si se desea.
6. El archivo `Dockerfile` crea una build standalone de Next.js. Para cambiar de dominio o agregar HTTPS, configurar los dominios de Coolify.

## Arquitectura

- `src/components/HeroExperience.tsx` — estructura de hero, fases de scroll, CTAs y fallback.
- `src/components/SmileScene.tsx` — geometría 3D de dientes, luz y animación por pieza.
- `src/components/SmileFallback.tsx` — ilustración SVG para navegador sin WebGL / reducción de movimiento.
- `src/app/globals.css` — sistema visual y estilos responsivos.
- `src/app/page.tsx` — escenas editoriales posteriores usadas para validar las transiciones y el ritmo visual.

## Qué se hará en la siguiente iteración

- Evaluar el realismo del modelo (es una geometría artística ligera); si se requiere un resultado clínico visualmente más creíble, sustituir por malla GLB optimizada desarrollada en Blender, manteniendo las animaciones por diente.
- Incorporar logo vectorial suministrado por la marca o reconstruido con autorización, sin suponer una familia tipográfica que no haya sido confirmada.
- Confirmar credenciales, fotografías clínicas autorizadas y contenidos finales.
- Completar aviso de privacidad y consentimiento antes de publicar; integrar agenda/calendario, recepción segura de información clínica y seguimiento de conversiones.
- Ampliar a páginas de tratamientos, guía fotográfica, Colombia y pacientes internacionales.
- Evaluar rendimiento real en móvil y ajustar geometrías, materiales y tiempo de carga.
