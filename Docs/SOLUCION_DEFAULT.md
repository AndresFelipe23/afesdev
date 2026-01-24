# ✅ Solución: Archivo default está Capturando el Dominio

El problema es que existe `/etc/nginx/sites-available/default` con `default_server` y `server_name _;` que captura cualquier dominio.

## 🔧 Solución

### Paso 1: Verificar si default está activo

```bash
ls -la /etc/nginx/sites-enabled/ | grep default
```

### Paso 2: Deshabilitar el archivo default

```bash
# Si está activo, deshabilitarlo
rm /etc/nginx/sites-enabled/default

# O renombrarlo por seguridad
mv /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default.bak
```

### Paso 3: Verificar que afesdev.site esté activo

```bash
ls -la /etc/nginx/sites-enabled/ | grep afesdev
```

### Paso 4: Recargar Nginx

```bash
nginx -s reload
```

### Paso 5: Verificar

```bash
# Ver logs
tail -f /var/log/nginx/afesdev.access.log

# Probar
curl -H "Host: afesdev.site" http://localhost
```

## 📝 Comandos en Orden

```bash
# 1. Ver si default está activo
ls -la /etc/nginx/sites-enabled/ | grep default

# 2. Deshabilitar default
rm /etc/nginx/sites-enabled/default

# 3. Verificar que afesdev.site esté activo
ls -la /etc/nginx/sites-enabled/

# 4. Recargar Nginx
nginx -s reload

# 5. Ver logs
tail -f /var/log/nginx/afesdev.error.log
```

---

**El archivo default está capturando tu dominio. Deshabilítalo y tu sitio funcionará.**

