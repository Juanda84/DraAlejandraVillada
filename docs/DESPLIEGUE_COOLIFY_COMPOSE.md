# Despliegue en Coolify con Docker Compose

## Archivos y alcance

- `docker-compose.yml` está en la raíz del proyecto, al lado de `Dockerfile` y `package.json`.
- Servicio: `frontend`. Puerto **interno**: `3000`. El puerto del VPS NO se expone mediante `ports:`; el proxy de Coolify se encarga del acceso HTTPS.
- El número del formulario es `573116445913`, configurable con `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- El `Dockerfile` construye Next.js con `output: standalone` y usa Node 22.
- No se requiere base de datos para este prototipo: el formulario prepara un mensaje para WhatsApp y no almacena datos en el servidor.

## Instalación con repositorio Git

1. Descomprime el ZIP y copia el **contenido** de `alejandra-villada-prototipo/` en la raíz de tu repositorio GitHub. Comprueba que `docker-compose.yml`, `Dockerfile` y `package.json` estén en la raíz.
2. En tu equipo, opcionalmente ejecuta `npm install`, `npm run lint` y `npm run build` para validar. El ZIP no contiene `package-lock.json`; después de instalar, versiona el lockfile para builds reproducibles.
3. Haz commit y `git push origin main`.
4. En **Coolify**, crea una nueva **Application** desde el repositorio Git, selecciona la rama y el tipo de build **Docker Compose / Compose** (no Dockerfile, si deseas utilizar este YAML).
5. Define **Base Directory** `/` y **Docker Compose Location** `docker-compose.yml` (o `./docker-compose.yml` según interfaz) si están en la raíz del repositorio.
6. En **Domains**, agrega tu dominio, elige servicio `frontend` y especifica puerto interno `3000` (por ejemplo, valor `https://tu-dominio.com:3000` en interfaces que incorporan el puerto al dominio). No agregues `:3000` al navegador del visitante.
7. Configura DNS y HTTPS desde Coolify, habilita el autodespliegue con webhook si lo deseas y pulsa **Deploy**.
8. Comprueba logs de build y de ejecución. El healthcheck hace una solicitud interna a `http://127.0.0.1:3000/`.

## Configuración de WhatsApp

El número predeterminado **+57 311 644 5913** está declarado en el YAML. Para cambiarlo más adelante, edita `NEXT_PUBLIC_WHATSAPP_NUMBER` en las variables del recurso Coolify y vuelve a **construir** la imagen: en Next.js las variables `NEXT_PUBLIC_*` quedan integradas en el código cliente durante `npm run build`. El Dockerfile incluye `ARG` para admitirlo en tiempo de compilación.

## Notas de seguridad y alcance

- No incluyas credenciales de agenda ni tokens privados en variables `NEXT_PUBLIC_*`.
- El prototipo NO ha sido compilado en este entorno (sin acceso funcional al registro de npm); el archivo YAML ha sido validado sintácticamente. Debes verificar `npm run build` antes de asumir que puede publicarse.
- Antes de lanzar el sitio definitivo, completa la política de privacidad y autorizaciones de fotografías clínicas. Las imágenes de demostración no representan resultados reales de pacientes.

## Alternativa más simple

También puedes desplegar **sin YAML**, seleccionando en Coolify la estrategia `Dockerfile` y puerto interno 3000, porque el repositorio incluye un Dockerfile válido como punto de partida. Para este proyecto, si quieres usar el archivo solicitado, elige **Compose**.
