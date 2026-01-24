# ✅ Solución Final - Configurar Certificados SSL

El problema es que Nginx no puede cargar la configuración porque los certificados SSL no están en la ruta especificada.

## 🔍 Paso 1: Encontrar tus Certificados SSL

```bash
# Ver todos los certificados instalados
certbot certificates

# Ver qué dominios tienen certificados
ls -la /etc/letsencrypt/live/

# Buscar certificados en otras ubicaciones
find /etc -name "fullchain.pem" 2>/dev/null
```

## 🔧 Paso 2: Opciones de Solución

### Opción A: Usar Certificados de Otro Dominio (Si están compartidos)

Si los certificados están bajo otro nombre (como `menusqr-site` o `qrestaurante-site`), puedes usar esos:

```bash
# Ver qué certificados tienes
ls -la /etc/letsencrypt/live/
```

Si ves algo como `menusqr-site` o `qrestaurante-site`, puedes usar esos certificados temporalmente.

### Opción B: Configuración Temporal SIN SSL (Para probar primero)

Usa la configuración sin SSL para que funcione inmediatamente:

```bash
# Copiar configuración sin SSL
cp nginx.conf.sin-ssl /etc/nginx/sites-available/afesdev.site

# O editar directamente
vi /etc/nginx/sites-available/afesdev.site
```

Pega el contenido de `nginx.conf.sin-ssl` (solo HTTP, sin HTTPS).

### Opción C: Obtener Certificados SSL para afesdev.site

```bash
# Obtener certificados nuevos para afesdev.site
certbot --nginx -d afesdev.site -d www.afesdev.site
```

Esto configurará automáticamente SSL.

## 🚀 Solución Rápida (Recomendada)

### 1. Primero, usar configuración SIN SSL para que funcione:

```bash
vi /etc/nginx/sites-available/afesdev.site
```

Reemplaza TODO el contenido con esto (sin SSL):

```nginx
# Configuración de Nginx para AfesDev - afesdev.site (SIN SSL - Temporal)

# Servidor HTTP
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name afesdev.site www.afesdev.site;

    # Ruta al directorio de archivos estáticos
    root /cloudclusters/afesdev/dist;
    index index.html;

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

### 2. Verificar y recargar:

```bash
nginx -t
systemctl reload nginx
```

Ahora deberías poder acceder a `http://afesdev.site` ✅

### 3. Después, configurar SSL:

```bash
# Instalar certbot si no lo tienes
apt-get update
apt-get install certbot python3-certbot-nginx -y

# Obtener certificados (esto actualizará automáticamente la configuración)
certbot --nginx -d afesdev.site -d www.afesdev.site
```

Esto configurará SSL automáticamente y actualizará tu archivo de configuración.

## 📝 Comandos en Orden

```bash
# 1. Editar configuración sin SSL
vi /etc/nginx/sites-available/afesdev.site
# (Pegar el contenido de arriba)

# 2. Verificar
nginx -t

# 3. Recargar
systemctl reload nginx

# 4. Probar
curl -I http://afesdev.site

# 5. Después, obtener SSL
certbot --nginx -d afesdev.site -d www.afesdev.site
```

---

**Primero usa la configuración sin SSL para que funcione, luego configura SSL con certbot.**

