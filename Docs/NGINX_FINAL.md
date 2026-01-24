# ✅ Configuración Final de Nginx para AfesDev

## 📋 Configuración Completa

Esta es cómo debe quedar tu archivo `/etc/nginx/sites-available/afesdev.site`:

```nginx
# Configuración de Nginx para AfesDev - afesdev.site

# Redirigir HTTP a HTTPS
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name afesdev.site www.afesdev.site;

    # Redirigir HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

# Servidor HTTPS
server {
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;
    server_name afesdev.site www.afesdev.site;

    # Ruta al directorio de archivos estáticos
    root /cloudclusters/afesdev/dist;
    index index.html;

    # Configuración SSL (AJUSTA ESTAS RUTAS SEGÚN TUS CERTIFICADOS)
    ssl_certificate /etc/letsencrypt/live/afesdev.site/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/afesdev.site/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Logs
    access_log /var/log/nginx/afesdev.access.log;
    error_log /var/log/nginx/afesdev.error.log;

    # Compresión Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json image/svg+xml;

    # Cache para archivos estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Configuración para Astro (SPA routing)
    location / {
        try_files $uri $uri/ /index.html;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }

    # Bloquear acceso a archivos ocultos
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Bloquear acceso a archivos de configuración
    location ~ \.(env|json|md|lock|log)$ {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Robots.txt y sitemap
    location ~ ^/(robots\.txt|sitemap.*\.xml)$ {
        access_log off;
        log_not_found off;
    }

    # Tamaño máximo de carga
    client_max_body_size 10M;
}
```

## 🔍 Paso 1: Encontrar tus Certificados SSL

Ejecuta en tu servidor:

```bash
# Ver certificados instalados
certbot certificates
```

Esto mostrará algo como:

```
Found the following certs:
  Certificate Name: afesdev.site
    Domains: afesdev.site www.afesdev.site
    Expiry Date: 2025-04-XX XX:XX:XX+00:00 (VALID: XX days)
    Certificate Path: /etc/letsencrypt/live/afesdev.site/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/afesdev.site/privkey.pem
```

O si están bajo otro nombre:

```bash
# Ver todos los certificados
ls -la /etc/letsencrypt/live/
```

## ✏️ Paso 2: Actualizar las Rutas de Certificados

Edita el archivo:

```bash
vi /etc/nginx/sites-available/afesdev.site
```

Y actualiza estas dos líneas con las rutas correctas que encontraste:

```nginx
ssl_certificate /ruta/correcta/fullchain.pem;
ssl_certificate_key /ruta/correcta/privkey.pem;
```

### Ejemplos según donde estén:

**Si están en Let's Encrypt para afesdev.site:**
```nginx
ssl_certificate /etc/letsencrypt/live/afesdev.site/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/afesdev.site/privkey.pem;
```

**Si están bajo otro dominio (ej: menusqr-site o qrestaurante-site):**
```nginx
ssl_certificate /etc/letsencrypt/live/menusqr-site/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/menusqr-site/privkey.pem;
```

**Si están en otra ubicación:**
```nginx
ssl_certificate /ruta/completa/a/tus/certificados/fullchain.pem;
ssl_certificate_key /ruta/completa/a/tus/certificados/privkey.pem;
```

## ✅ Paso 3: Verificar y Activar

```bash
# 1. Verificar sintaxis
nginx -t

# Debe mostrar:
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful

# 2. Si hay errores, verifica que los archivos existan
ls -la /ruta/a/tus/certificados/fullchain.pem
ls -la /ruta/a/tus/certificados/privkey.pem

# 3. Recargar Nginx
systemctl reload nginx

# 4. Verificar estado
systemctl status nginx
```

## 🧪 Paso 4: Probar

```bash
# Ver logs en tiempo real
tail -f /var/log/nginx/afesdev.error.log
tail -f /var/log/nginx/afesdev.access.log

# Probar localmente
curl -I https://localhost
```

Luego visita en tu navegador:
- `https://afesdev.site` ✅
- `http://afesdev.site` (debe redirigir a HTTPS) ✅

## 📝 Resumen de Comandos

```bash
# 1. Encontrar certificados
certbot certificates

# 2. Ver rutas de certificados
ls -la /etc/letsencrypt/live/

# 3. Editar configuración
vi /etc/nginx/sites-available/afesdev.site
# (Actualizar rutas de ssl_certificate y ssl_certificate_key)

# 4. Verificar
nginx -t

# 5. Recargar
systemctl reload nginx

# 6. Ver logs
tail -f /var/log/nginx/afesdev.error.log
```

## 🎯 Estado Final Esperado

Después de estos pasos:

✅ Nginx configurado con SSL  
✅ Redirección HTTP → HTTPS funcionando  
✅ Sitio accesible en `https://afesdev.site`  
✅ Archivos estáticos sirviendo desde `/cloudclusters/afesdev/dist`  
✅ SPA routing funcionando (todas las rutas van a index.html)  

---

**Ejecuta `certbot certificates` y comparte la salida, o dime dónde están tus certificados para darte las rutas exactas.**

