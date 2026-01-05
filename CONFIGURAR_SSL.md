# 🔒 Configurar SSL para AfesDev

## ⚠️ Problema Actual

El error indica que no tienes certificados SSL configurados. Tienes dos opciones:

## Opción 1: Configuración Temporal SIN SSL (Para probar primero)

### 1. Usar configuración temporal sin SSL

```bash
# Copiar la configuración temporal
cp nginx.conf.sin-ssl /etc/nginx/sites-available/afesdev.site

# O editar directamente
vi /etc/nginx/sites-available/afesdev.site
```

Pega el contenido de `nginx.conf.sin-ssl` (solo HTTP, sin HTTPS).

### 2. Verificar y recargar

```bash
nginx -t
systemctl reload nginx
```

Ahora deberías poder acceder a `http://afesdev.site` (sin HTTPS).

---

## Opción 2: Obtener Certificados SSL (Recomendado)

### Paso 1: Instalar Certbot

```bash
# Actualizar paquetes
apt-get update

# Instalar certbot
apt-get install certbot python3-certbot-nginx -y
```

### Paso 2: Obtener Certificados SSL

```bash
# Obtener certificados para tu dominio
certbot --nginx -d afesdev.site -d www.afesdev.site
```

Este comando:
- Obtendrá los certificados de Let's Encrypt
- Configurará automáticamente Nginx con SSL
- Configurará la renovación automática

### Paso 3: Verificar que funcionó

```bash
# Verificar certificados
certbot certificates

# Verificar configuración de Nginx
nginx -t

# Recargar Nginx
systemctl reload nginx
```

### Paso 4: Probar

Visita `https://afesdev.site` - debería funcionar con SSL.

---

## Opción 3: Configuración Manual de SSL (Si certbot no funciona)

Si certbot no funciona, puedes configurar SSL manualmente:

### 1. Obtener certificados manualmente

```bash
# Obtener certificados sin configurar Nginx
certbot certonly --standalone -d afesdev.site -d www.afesdev.site
```

### 2. Actualizar configuración de Nginx

Edita `/etc/nginx/sites-available/afesdev.site` y asegúrate de que las rutas de certificados sean correctas:

```bash
vi /etc/nginx/sites-available/afesdev.site
```

Verifica estas líneas:
```nginx
ssl_certificate /etc/letsencrypt/live/afesdev.site/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/afesdev.site/privkey.pem;
```

### 3. Verificar y recargar

```bash
nginx -t
systemctl reload nginx
```

---

## 🔍 Verificar Certificados

```bash
# Ver certificados instalados
certbot certificates

# Ver contenido del certificado
cat /etc/letsencrypt/live/afesdev.site/fullchain.pem

# Verificar que los archivos existan
ls -la /etc/letsencrypt/live/afesdev.site/
```

Deberías ver:
- `fullchain.pem`
- `privkey.pem`
- `chain.pem`
- `cert.pem`

---

## 🔄 Renovación Automática

Certbot configura la renovación automática. Verifica:

```bash
# Ver tarea de renovación
cat /etc/cron.d/certbot

# Probar renovación manual
certbot renew --dry-run
```

---

## 📝 Resumen de Comandos Rápidos

### Para empezar SIN SSL (temporal):

```bash
# 1. Usar configuración sin SSL
cp nginx.conf.sin-ssl /etc/nginx/sites-available/afesdev.site

# 2. Verificar
nginx -t

# 3. Recargar
systemctl reload nginx
```

### Para configurar SSL:

```bash
# 1. Instalar certbot
apt-get update
apt-get install certbot python3-certbot-nginx -y

# 2. Obtener certificados
certbot --nginx -d afesdev.site -d www.afesdev.site

# 3. Verificar
nginx -t
systemctl reload nginx
```

---

**Recomendación**: Usa la Opción 1 primero para verificar que todo funciona, luego configura SSL con la Opción 2.

