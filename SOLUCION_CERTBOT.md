# 🔧 Solución: Certbot con Configuración Rota

El problema es que certbot no puede funcionar porque la configuración de Nginx tiene referencias a certificados que no existen.

## ✅ Solución: Configuración Sin SSL Primero

### Paso 1: Usar Configuración Sin SSL

```bash
vi /etc/nginx/sites-available/afesdev.site
```

Reemplaza TODO el contenido con esto (SIN SSL):

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name afesdev.site www.afesdev.site;

    root /cloudclusters/afesdev/dist;
    index index.html;

    access_log /var/log/nginx/afesdev.access.log;
    error_log /var/log/nginx/afesdev.error.log;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json image/svg+xml;

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location / {
        try_files $uri $uri/ /index.html;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }

    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    location ~ \.(env|json|md|lock|log)$ {
        deny all;
        access_log off;
        log_not_found off;
    }

    location ~ ^/(robots\.txt|sitemap.*\.xml)$ {
        access_log off;
        log_not_found off;
    }

    client_max_body_size 10M;
}
```

### Paso 2: Verificar y Recargar

```bash
nginx -t
systemctl reload nginx
```

Ahora Nginx debería funcionar correctamente.

### Paso 3: Ahora Certbot Puede Funcionar

```bash
certbot --nginx -d afesdev.site -d www.afesdev.site
```

Certbot ahora podrá:
- Verificar que Nginx funciona
- Obtener los certificados SSL
- Configurar automáticamente SSL en tu archivo

## 📝 Comandos en Orden

```bash
# 1. Editar configuración sin SSL
vi /etc/nginx/sites-available/afesdev.site
# (Pegar el contenido de arriba)

# 2. Verificar sintaxis
nginx -t

# 3. Recargar Nginx
systemctl reload nginx

# 4. Verificar que funciona
curl -I http://afesdev.site

# 5. Ahora certbot puede funcionar
certbot --nginx -d afesdev.site -d www.afesdev.site
```

## 🎯 Resultado Esperado

Después de ejecutar certbot, deberías ver algo como:

```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/afesdev.site/fullchain.pem
Key is saved at: /etc/letsencrypt/live/afesdev.site/privkey.pem
This certificate expires on YYYY-MM-DD.
```

Y certbot habrá actualizado automáticamente tu archivo `/etc/nginx/sites-available/afesdev.site` con la configuración SSL correcta.

---

**Primero arregla la configuración de Nginx (sin SSL), luego certbot funcionará perfectamente.**

