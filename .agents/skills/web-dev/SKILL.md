---
name: web-dev
description: >-
  Usar esta skill cuando se desarrollen, modifiquen o desplieguen interfaces web,
  landing pages, estilos CSS, interactividad JavaScript o configuraciones de
  despliegue en contenedores (Docker / Coolify) dentro de este proyecto.
---

# Guía de Desarrollo Web y Despliegue (Dra. Alejandra Villada)

## Arquitectura del Proyecto
- **Stack Frontend**: HTML5 semántico, CSS3 moderno (Variables CSS, Grid, Flexbox, animaciones suaves, diseño responsive Mobile/Tablet/Desktop) y JavaScript Vanilla ES6+.
- **Servidor de Producción**: Nginx Alpine (`Dockerfile` + `nginx.conf` + `docker-compose.yaml`) optimizado para despliegue directo en **Coolify**.

## Posicionamiento y Jerarquía de Contenido
- **Protagonista Absoluto**: **Diseño de Sonrisa de Alta Estética** (destacando *Lentes Cerámicos / Porcelana* y *Diseño en Resina de Alta Estética*, naturalidad, prueba Mockup y tiempos cortos ideales para turismo dental en Pereira).
- **Tratamientos Complementarios**: Alineadores invisibles, blanqueamiento dental, rehabilitación estética y ortodoncia como aliados secundarios.

## Estándares de Diseño y Marca
- **Paleta de Colores**:
  - Fondos oscuros (Espresso / Cacao cálido): `#241814`, `#33221C`, `#442E27`.
  - Fondos claros (Marfil / Crema cálido): `#F7F1EB`, `#EFE6DC`, `#FAF6F2`.
  - Acentos (Oro Rosa / Terracota suave): `#C98A7D`, `#B67669`, `#A36357`, `#E2A598`.
  - WhatsApp CTA: `#25D366` / `#1DA851`.
- **Tipografía**:
  - Títulos editoriales: `'Cormorant Garamond'`, serif (con énfasis en *cursiva* color oro rosa).
  - Cuerpo e interfaz: `'Plus Jakarta Sans'`, sans-serif.

## Embudo de Conversión (Filtro Anti-Curiosos)
- **Ningún botón** debe abrir `https://wa.me/573116445913` de forma directa sin filtrar.
- Todos los llamados a la acción (incluido el botón de WhatsApp) abren un **Modal de Pre-Valoración en una sola vista** donde el paciente completa obligatoriamente: nombre, teléfono, ubicación (país/ciudad), tratamiento deseado, plazo para iniciar y qué desea mejorar.
- Solo tras validar el formulario se redirige al WhatsApp oficial (`+57 311 644 5913`) con la ficha clínica estructurada pre-llenada.
