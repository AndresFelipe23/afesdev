# 🔍 Encontrar Certificados SSL Existentes

## Paso 1: Buscar Certificados SSL

Ejecuta estos comandos para encontrar dónde están tus certificados:

```bash
# Buscar certificados de Let's Encrypt
ls -la /etc/letsencrypt/live/

# Ver todos los dominios con certificados
certbot certificates

# Buscar certificados en otras ubicaciones comunes
find /etc -name "*.pem" -type f 2>/dev/null | grep -i cert
find /etc -name "*afesdev*" -type f 2>/dev/null
```

## Paso 2: Verificar Rutas de Certificados

Una vez que encuentres los certificados, verifica las rutas:

```bash
# Si están en Let's Encrypt (más común)
ls -la /etc/letsencrypt/live/afesdev.site/

# O si están en otro dominio (puede que estén bajo otro nombre)
ls -la /etc/letsencrypt/live/
```

## Paso 3: Actualizar Configuración de Nginx

Una vez que sepas dónde están, actualiza la configuración:

```bash
vi /etc/nginx/sites-available/afesdev.site
```

Y actualiza estas líneas con las rutas correctas:

```nginx
ssl_certificate /ruta/correcta/fullchain.pem;
ssl_certificate_key /ruta/correcta/privkey.pem;
```

## Opciones Comunes

### Si los certificados están en Let's Encrypt:

```nginx
ssl_certificate /etc/letsencrypt/live/afesdev.site/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/afesdev.site/privkey.pem;
```

### Si los certificados están bajo otro nombre de dominio:

```bash
# Ver qué dominios tienen certificados
certbot certificates

# Luego usa el nombre correcto, por ejemplo:
# ssl_certificate /etc/letsencrypt/live/otro-dominio.com/fullchain.pem;
```

### Si los certificados están en otra ubicación:

```bash
# Buscar archivos .pem
find /etc -name "fullchain.pem" 2>/dev/null
find /etc -name "privkey.pem" 2>/dev/null
```

## Verificar que los Archivos Existan

```bash
# Verificar que los archivos existan
ls -la /ruta/a/fullchain.pem
ls -la /ruta/a/privkey.pem

# Ver contenido (debe mostrar texto del certificado)
head -5 /ruta/a/fullchain.pem
```

## Después de Actualizar

```bash
# Verificar sintaxis
nginx -t

# Si todo está bien, recargar
systemctl reload nginx
```

