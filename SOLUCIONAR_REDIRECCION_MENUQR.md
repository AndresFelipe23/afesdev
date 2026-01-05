# 🔧 Solucionar: afesdev.site redirige a MenuQR

El problema es que otra configuración de Nginx está capturando tu dominio. Vamos a solucionarlo.

## 🔍 Paso 1: Ver Configuraciones Activas

```bash
# Ver todas las configuraciones activas
ls -la /etc/nginx/sites-enabled/

# Ver qué configuración está usando Nginx para afesdev.site
nginx -T | grep -B 10 -A 20 "afesdev.site"

# Ver todas las configuraciones con server_name
nginx -T | grep -B 5 -A 15 "server_name"
```

## 🔍 Paso 2: Ver Configuraciones de MenuQR

```bash
# Ver configuración de menusqr-site
cat /etc/nginx/sites-available/menusqr-site

# Ver configuración de qrestaurante-site
cat /etc/nginx/sites-available/qrestaurante-site
```

Busca si tienen `default_server` o si están capturando `afesdev.site`.

## ✅ Paso 3: Verificar tu Configuración de AfesDev

```bash
# Ver tu configuración
cat /etc/nginx/sites-available/afesdev.site

# Verificar que esté activa
ls -la /etc/nginx/sites-enabled/ | grep afesdev
```

## 🔧 Paso 4: Asegurar Prioridad de AfesDev

### Opción A: Quitar default_server de otras configuraciones

Si `menusqr-site` o `qrestaurante-site` tienen `default_server`, quítalo:

```bash
# Editar menusqr-site
vi /etc/nginx/sites-available/menusqr-site
```

Busca líneas como:
```nginx
listen 80 default_server;
listen 443 ssl http2 default_server;
```

Y cámbialas a:
```nginx
listen 80;
listen 443 ssl http2;
```

Haz lo mismo con `qrestaurante-site`:

```bash
vi /etc/nginx/sites-available/qrestaurante-site
```

### Opción B: Asegurar que afesdev.site tenga default_server

Verifica que tu configuración `/etc/nginx/sites-available/afesdev.site` tenga:

```nginx
listen 80 default_server;
listen 443 ssl http2 default_server;
```

## 🔍 Paso 5: Verificar Orden de Carga

Nginx carga archivos en orden alfabético. Verifica:

```bash
ls -1 /etc/nginx/sites-enabled/
```

Si `menusqr-site` o `qrestaurante-site` se cargan antes que `afesdev.site` y tienen `default_server`, pueden tener prioridad.

## ✅ Paso 6: Verificar y Recargar

```bash
# Verificar sintaxis
nginx -t

# Ver qué configuración se está usando para afesdev.site
nginx -T | grep -B 10 -A 30 "afesdev.site"

# Recargar Nginx
systemctl reload nginx
```

## 🎯 Solución Rápida (Si MenuQR tiene default_server)

```bash
# 1. Editar menusqr-site y quitar default_server
vi /etc/nginx/sites-available/menusqr-site
# Buscar y quitar "default_server" de las líneas listen

# 2. Editar qrestaurante-site y quitar default_server
vi /etc/nginx/sites-available/qrestaurante-site
# Buscar y quitar "default_server" de las líneas listen

# 3. Verificar que afesdev.site tenga default_server
cat /etc/nginx/sites-available/afesdev.site | grep default_server
# Debe mostrar default_server en ambas secciones (80 y 443)

# 4. Verificar sintaxis
nginx -t

# 5. Recargar
systemctl reload nginx

# 6. Probar
curl -I https://afesdev.site
```

## 🔍 Verificar Qué Está Pasando

```bash
# Ver todas las configuraciones con default_server
nginx -T | grep -B 10 "default_server"

# Ver qué server_name tiene cada configuración
nginx -T | grep -B 5 "server_name"
```

## 📝 Comandos de Diagnóstico Completos

Ejecuta estos comandos y comparte la salida:

```bash
# 1. Ver configuraciones activas
ls -la /etc/nginx/sites-enabled/

# 2. Ver qué captura afesdev.site
nginx -T | grep -B 10 -A 20 "afesdev.site"

# 3. Ver si MenuQR tiene default_server
grep -r "default_server" /etc/nginx/sites-available/menusqr-site
grep -r "default_server" /etc/nginx/sites-available/qrestaurante-site

# 4. Ver server_name de todas las configuraciones
grep -r "server_name" /etc/nginx/sites-available/
```

---

**Ejecuta estos comandos y comparte la salida para identificar exactamente qué está capturando tu dominio.**

