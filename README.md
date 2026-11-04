# Dra. Alejandra Villada · Rediseño cinematográfico V2

**Objetivo:** reproducir el lenguaje visual de las dos maquetas proporcionadas: hero fotográfico con alineador transparente a gran escala, grafito y rosa tierra, secciones compactas con fotografía de Colombia, resultados, perfil profesional, videollamada y conversión a WhatsApp.

## Contenido del ZIP
- `src/content/sections.html`: arquitectura completa de la página. `sections.ts` es la versión importada en Next.js (mantener sincronizadas).
- `src/app/globals.css`: diseño editorial, responsive y transiciones.
- `src/components/SmileScene.tsx`: luces 3D discretas integradas al hero, sin la anterior arcada de dientes geométricos.
- `src/components/SiteInteractions.tsx`: menú móvil, comparador visual demostrativo, scroll y formulario WhatsApp.
- `public/images/`: foto original de Alejandra, hero fotográfico ilustrativo y tres paisajes **ilustrativos** originales, optimizados en WebP.
- `vista-previa.html`: vista previa autónoma con imágenes incrustadas; no carga Three.js, pero sí reproduce el diseño y la interacción HTML básica.
- `docker-compose.yml`, `Dockerfile`: despliegue a Coolify por GitHub.

## Desplegar
1. Sustituye los archivos del repositorio por los del ZIP, manteniendo la carpeta raíz del proyecto.
2. En la carpeta raíz del proyecto: `npm install`, `npm run build` y, si compila, `git add . && git commit -m "Rediseño visual V2" && git push origin main`.
3. Coolify: Docker Compose desde Git, servicio `frontend`, puerto interno 3000; configura el dominio a través del proxy HTTPS.
4. El número de WhatsApp predeterminado es `573116445913`; también se puede configurar en la variable `NEXT_PUBLIC_WHATSAPP_NUMBER` antes de la compilación.
5. Si ya tienes una instancia con datos externos, realiza copia de seguridad y despliega primero en staging.

## Advertencias antes de publicar
- El hero y las fotografías de Colombia son **ilustraciones publicitarias**; no representan resultados médicos ni fotografías documentales de lugares específicos.
- Los resultados antes/después son una **demostración visual de interfaz**, no casos de la doctora. Sustituir solo por casos reales con consentimiento y fotografías comparables.
- Las historias/testimonios se muestran pendientes hasta tener consentimiento del paciente.
- La imagen de la doctora y el logotipo son los originales proporcionados por el cliente.
- Verifica credenciales profesionales, especialidad y la afirmación de diez años de experiencia; no se agregaron cifras de pacientes.
- La videollamada inicial se describe como orientación informativa gratuita, no diagnóstico o plan clínico definitivo.
- Completar el aviso de privacidad, condiciones de tratamiento de datos, accesibilidad y SEO antes de indexar el sitio; el `layout.tsx` mantiene `robots: noindex` deliberadamente.
- La vista previa HTML sí fue inspeccionada en escritorio (1440px) y móvil (390px). **No se ejecutó `next build`** por falta de acceso a los paquetes npm en este entorno.
- No se accedió al dominio en vivo; el navegador de consulta bloqueó `www.draalejandravillada.com`.
