FROM nginx:1.27-alpine

LABEL maintainer="Dra. Alejandra Villada Web"
LABEL description="Landing Page Dra. Alejandra Villada - Ortodoncista y Diseño de Sonrisa"

# Eliminar configuración por defecto de Nginx y copiar la optimizada para Coolify
RUN rm -rf /etc/nginx/conf.d/default.conf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos de la web
COPY index.html /usr/share/nginx/html/index.html
COPY assets/ /usr/share/nginx/html/assets/

# Permisos adecuados para Nginx
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

# Healthcheck nativo para Coolify
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
