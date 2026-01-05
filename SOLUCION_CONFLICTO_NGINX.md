# 🔧 Solución: Nginx redirige a otra página

Si cuando accedes a `afesdev.site` te lleva a otra página del servidor, significa que otra configuración de Nginx está capturando el dominio primero.

## 🔍 Diagnóstico

Ejecuta estos comandos en tu servidor para diagnosticar el problema:

### 1. Ver todas las configuraciones activas

```bash
ls -la /etc/nginx/sites-enabled/
```

Esto mostrará todos los sitios que están activos. Puede haber un sitio por defecto que esté capturando tu dominio.

### 2. Ver qué configuración está usando Nginx para afesdev.site

```bash
nginx -T | grep -A 20 "server_name.*afesdev"
```

O más específico:

```bash
nginx -T | grep -B 5 -A 15 "afesdev.site"
```

### 3. Ver el orden de carga de configuraciones

```bash
cat /etc/nginx/nginx.conf | grep include
```

### 4. Verificar si hay un servidor por defecto

```bash
cat /etc/nginx/sites-enabled/default
# O
cat /etc/nginx/sites-enabled/*.conf | grep -A 10 "server_name"
```

## ✅ Soluciones

### Solución 1: Deshabilitar el sitio por defecto

Si hay un sitio `default` que está capturando todo:

```bash
# Ver si existe
ls -la /etc/nginx/sites-enabled/default

# Deshabilitarlo
rm /etc/nginx/sites-enabled/default
# O renombrarlo
mv /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default.bak

# Verificar configuración
nginx -t

# Recargar
systemctl reload nginx
```

### Solución 2: Asegurar que afesdev.site esté activo

```bash
# Verificar que existe el enlace simbólico
ls -la /etc/nginx/sites-enabled/ | grep afesdev

# Si no existe, crearlo
ln -s /etc/nginx/sites-available/afesdev.site /etc/nginx/sites-enabled/afesdev.site

# Verificar
nginx -t
systemctl reload nginx
```

### Solución 3: Verificar el orden de los archivos

Nginx carga los archivos en orden alfabético. Si hay otro archivo que empieza antes que `afesdev.site`, puede tener prioridad.

```bash
# Ver orden alfabético
ls -1 /etc/nginx/sites-enabled/

# Si hay un archivo que se carga antes y tiene server_name con wildcard o default_server,
# puede estar capturando tu dominio
```

### Solución 4: Agregar default_server a tu configuración

Modifica tu configuración de `afesdev.site` para que sea el servidor por defecto en el puerto 443:

```bash
vi /etc/nginx/sites-available/afesdev.site
```

Cambia esta línea:
```nginx
listen 443 ssl http2;
```

Por esta:
```nginx
listen 443 ssl http2 default_server;
```

Y también en el puerto 80:
```nginx
listen 80 default_server;
```

Luego:
```bash
nginx -t
systemctl reload nginx
```

### Solución 5: Verificar que la ruta root sea correcta

Asegúrate de que la ruta en la configuración apunte a donde están tus archivos:

```bash
# Ver la ruta configurada
cat /etc/nginx/sites-available/afesdev.site | grep root

# Verificar que los archivos estén ahí
ls -la /var/www/afesdev/dist/
# O la ruta que tengas configurada
```

## 🔄 Pasos Recomendados (En Orden)

1. **Ver qué está activo:**
   ```bash
   ls -la /etc/nginx/sites-enabled/
   ```

2. **Ver qué configuración captura afesdev.site:**
   ```bash
   nginx -T | grep -B 5 -A 15 "afesdev.site"
   ```

3. **Si hay un default, deshabilitarlo:**
   ```bash
   rm /etc/nginx/sites-enabled/default
   ```

4. **Asegurar que afesdev.site esté activo:**
   ```bash
   ln -s /etc/nginx/sites-available/afesdev.site /etc/nginx/sites-enabled/afesdev.site
   ```

5. **Verificar y recargar:**
   ```bash
   nginx -t
   systemctl reload nginx
   ```

6. **Verificar logs:**
   ```bash
   tail -f /var/log/nginx/afesdev.access.log
   tail -f /var/log/nginx/afesdev.error.log
   ```

## 📝 Nota sobre CloudClusters

Veo que estás en CloudClusters (`/cloudclusters/afesdev`). En este caso, la ruta puede ser diferente. Verifica:

```bash
# Ver dónde están tus archivos
ls -la /cloudclusters/afesdev/dist/

# Si están ahí, actualiza la configuración de Nginx:
vi /etc/nginx/sites-available/afesdev.site
```

Y cambia:
```nginx
root /var/www/afesdev/dist;
```

Por:
```nginx
root /cloudclusters/afesdev/dist;
```

Luego:
```bash
nginx -t
systemctl reload nginx
```

