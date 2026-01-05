# 🔧 Crear y Configurar Nginx para AfesDev

Guía paso a paso para crear la configuración de Nginx y que sirva tu aplicación en **afesdev.site**.

## 🔍 Paso 1: Diagnosticar el Problema

Primero, veamos qué está capturando tu dominio:

```bash
# Ver todas las configuraciones activas
ls -la /etc/nginx/sites-enabled/

# Ver qué configuración está usando Nginx para afesdev.site
nginx -T | grep -B 5 -A 15 "afesdev.site"

# Ver todas las configuraciones que tienen server_name
nginx -T | grep -A 10 "server_name"
```

## 📝 Paso 2: Crear la Configuración de Nginx

### 2.1. Ver el archivo de configuración

```bash
# Ver el contenido del nginx.conf que tienes en el proyecto
cat nginx.conf
```

### 2.2. Copiar la configuración al servidor

```bash
# Copiar el archivo al servidor (desde tu máquina local)
scp nginx.conf root@afesdev.site:/tmp/nginx-afesdev.conf

# O si estás en el servidor, crear el archivo directamente
vi /etc/nginx/sites-available/afesdev.site
```

### 2.3. Contenido del archivo

Copia este contenido en `/etc/nginx/sites-available/afesdev.site`:

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

    # Configuración SSL (ajusta las rutas a tus certificados)
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

**Nota importante**: He agregado `default_server` en ambas secciones (puerto 80 y 443) para que esta configuración tenga prioridad sobre otras.

## 🔧 Paso 3: Deshabilitar Otras Configuraciones

### 3.1. Ver qué configuraciones están activas

```bash
ls -la /etc/nginx/sites-enabled/
```

### 3.2. Deshabilitar el sitio por defecto (si existe)

```bash
# Ver si existe default
ls -la /etc/nginx/sites-enabled/default

# Si existe, deshabilitarlo
rm /etc/nginx/sites-enabled/default

# O renombrarlo por seguridad
mv /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default.bak
```

### 3.3. Deshabilitar otras configuraciones que puedan interferir

```bash
# Ver todas las configuraciones activas
ls -la /etc/nginx/sites-enabled/

# Si hay otras que puedan estar capturando tu dominio, deshabilitarlas temporalmente
# Por ejemplo:
# mv /etc/nginx/sites-enabled/otra-app.conf /etc/nginx/sites-enabled/otra-app.conf.bak
```

## 🔗 Paso 4: Habilitar la Nueva Configuración

```bash
# Crear enlace simbólico para habilitar el sitio
ln -s /etc/nginx/sites-available/afesdev.site /etc/nginx/sites-enabled/afesdev.site

# Verificar que el enlace se creó
ls -la /etc/nginx/sites-enabled/ | grep afesdev
```

## ✅ Paso 5: Verificar y Probar la Configuración

### 5.1. Verificar sintaxis de Nginx

```bash
nginx -t
```

Debería mostrar:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 5.2. Verificar que la configuración se cargó

```bash
# Ver la configuración completa que Nginx está usando
nginx -T | grep -B 5 -A 20 "afesdev.site"
```

### 5.3. Verificar que los archivos estén en su lugar

```bash
# Verificar que los archivos de dist existan
ls -la /cloudclusters/afesdev/dist/

# Verificar que index.html exista
ls -la /cloudclusters/afesdev/dist/index.html

# Ver el contenido del index.html (primeras líneas)
head -20 /cloudclusters/afesdev/dist/index.html
```

## 🔄 Paso 6: Recargar Nginx

```bash
# Recargar Nginx (sin interrumpir conexiones activas)
systemctl reload nginx

# O reiniciar completamente si es necesario
systemctl restart nginx

# Verificar estado
systemctl status nginx
```

## 🔒 Paso 7: Configurar SSL (Si aún no lo tienes)

Si no tienes certificados SSL configurados:

```bash
# Instalar certbot si no lo tienes
# apt-get update
# apt-get install certbot python3-certbot-nginx

# Obtener certificado SSL
certbot --nginx -d afesdev.site -d www.afesdev.site

# Esto configurará automáticamente SSL en tu archivo de configuración
```

## 🧪 Paso 8: Probar

### 8.1. Verificar desde el servidor

```bash
# Probar localmente
curl -I http://localhost
curl -I https://localhost

# Ver logs en tiempo real
tail -f /var/log/nginx/afesdev.access.log
tail -f /var/log/nginx/afesdev.error.log
```

### 8.2. Probar desde el navegador

1. Visita `https://afesdev.site`
2. Verifica que cargue tu sitio
3. Prueba diferentes rutas (por ejemplo: `/about`, `/projects`)

## 🐛 Solución de Problemas

### Si aún redirige a otra app

1. **Verificar que default_server esté configurado**:
   ```bash
   cat /etc/nginx/sites-available/afesdev.site | grep default_server
   ```
   Debe mostrar `default_server` en ambas secciones.

2. **Verificar el orden de carga**:
   ```bash
   ls -1 /etc/nginx/sites-enabled/
   ```
   Nginx carga archivos en orden alfabético. Si hay otro archivo que se carga antes y tiene `default_server`, puede tener prioridad.

3. **Ver todas las configuraciones con default_server**:
   ```bash
   nginx -T | grep -B 10 "default_server"
   ```

4. **Eliminar default_server de otras configuraciones**:
   ```bash
   # Buscar otras configuraciones
   grep -r "default_server" /etc/nginx/sites-available/
   
   # Editar y quitar default_server de otras configuraciones
   vi /etc/nginx/sites-available/otra-app.conf
   ```

### Si los archivos no se cargan

1. **Verificar permisos**:
   ```bash
   ls -la /cloudclusters/afesdev/dist/
   chown -R www-data:www-data /cloudclusters/afesdev/dist
   chmod -R 755 /cloudclusters/afesdev/dist
   ```

2. **Verificar la ruta root en la configuración**:
   ```bash
   cat /etc/nginx/sites-available/afesdev.site | grep root
   ```
   Debe ser: `root /cloudclusters/afesdev/dist;`

3. **Verificar logs de error**:
   ```bash
   tail -50 /var/log/nginx/afesdev.error.log
   ```

### Si hay error 404 en rutas

Verifica que la línea `try_files` esté presente:
```bash
cat /etc/nginx/sites-available/afesdev.site | grep try_files
```

Debe mostrar: `try_files $uri $uri/ /index.html;`

## 📋 Resumen de Comandos (Ejecutar en Orden)

```bash
# 1. Ver configuraciones activas
ls -la /etc/nginx/sites-enabled/

# 2. Deshabilitar default si existe
rm /etc/nginx/sites-enabled/default

# 3. Crear configuración
vi /etc/nginx/sites-available/afesdev.site
# (Pegar el contenido de arriba)

# 4. Habilitar configuración
ln -s /etc/nginx/sites-available/afesdev.site /etc/nginx/sites-enabled/afesdev.site

# 5. Verificar sintaxis
nginx -t

# 6. Verificar archivos
ls -la /cloudclusters/afesdev/dist/

# 7. Recargar Nginx
systemctl reload nginx

# 8. Ver logs
tail -f /var/log/nginx/afesdev.error.log
```

---

**Después de estos pasos, tu sitio debería estar funcionando en https://afesdev.site** 🎉

