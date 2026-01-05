# 🔧 Solución Completa - Múltiples Problemas

## Problema 1: systemctl no funciona (Estás en Docker/Contenedor)

En contenedores, usa estos comandos:

```bash
# Recargar Nginx (sin systemctl)
nginx -s reload

# O reiniciar completamente
service nginx reload
# O
service nginx restart
```

## Problema 2: Certbot falló - "No such authorization"

Esto significa que el dominio `afesdev.site` no está apuntando correctamente al servidor o hay un problema de DNS.

**Solución temporal**: Usa la configuración sin SSL primero. SSL lo configuramos después.

## Problema 3: Sigue redirigiendo a MenuQR

Necesitamos verificar qué está capturando el dominio.

## ✅ Solución Paso a Paso

### Paso 1: Recargar Nginx Correctamente

```bash
# Recargar Nginx (sin systemctl)
nginx -s reload

# Verificar que se recargó
nginx -t
```

### Paso 2: Verificar Qué Está Capturando el Dominio

```bash
# Ver todas las configuraciones activas
ls -la /etc/nginx/sites-enabled/

# Ver qué server_name tiene cada una
grep -r "server_name" /etc/nginx/sites-available/

# Ver si MenuQR tiene default_server
grep "default_server" /etc/nginx/sites-available/menusqr-site
grep "default_server" /etc/nginx/sites-available/qrestaurante-site
```

### Paso 3: Asegurar que afesdev.site tenga Prioridad

Verifica que tu configuración tenga `default_server`:

```bash
cat /etc/nginx/sites-available/afesdev.site | grep default_server
```

Debe mostrar `default_server` en la línea `listen 80`.

### Paso 4: Quitar default_server de Otras Configuraciones

Si MenuQR o qrestaurante tienen `default_server`, quítalo:

```bash
# Ver si tienen default_server
grep "default_server" /etc/nginx/sites-available/menusqr-site
grep "default_server" /etc/nginx/sites-available/qrestaurante-site

# Si tienen, editarlos y quitar default_server
vi /etc/nginx/sites-available/menusqr-site
vi /etc/nginx/sites-available/qrestaurante-site
```

### Paso 5: Verificar Orden de Carga

Nginx carga archivos en orden alfabético. Verifica:

```bash
ls -1 /etc/nginx/sites-enabled/
```

Si `menusqr-site` o `qrestaurante-site` se cargan antes y tienen `default_server`, pueden tener prioridad.

### Paso 6: Recargar y Probar

```bash
# Recargar Nginx
nginx -s reload

# Ver logs en tiempo real
tail -f /var/log/nginx/afesdev.error.log
tail -f /var/log/nginx/afesdev.access.log

# Probar localmente
curl -I http://localhost
curl -H "Host: afesdev.site" http://localhost
```

## 🔍 Diagnóstico Completo

Ejecuta estos comandos y comparte la salida:

```bash
# 1. Ver configuraciones activas
ls -la /etc/nginx/sites-enabled/

# 2. Ver server_name de todas
grep -r "server_name" /etc/nginx/sites-available/

# 3. Ver default_server
grep -r "default_server" /etc/nginx/sites-available/

# 4. Ver tu configuración actual
cat /etc/nginx/sites-available/afesdev.site

# 5. Ver logs de error
tail -20 /var/log/nginx/afesdev.error.log
```

## 🎯 Solución Rápida

```bash
# 1. Recargar Nginx
nginx -s reload

# 2. Verificar que afesdev.site esté activo
ls -la /etc/nginx/sites-enabled/ | grep afesdev

# 3. Verificar que tenga default_server
cat /etc/nginx/sites-available/afesdev.site | grep "listen 80"

# 4. Si MenuQR tiene default_server, quitarlo
vi /etc/nginx/sites-available/menusqr-site
# Buscar "default_server" y quitarlo

# 5. Recargar de nuevo
nginx -s reload

# 6. Probar
curl -H "Host: afesdev.site" http://localhost
```

---

**Ejecuta estos comandos y comparte la salida para identificar exactamente qué está capturando tu dominio.**

