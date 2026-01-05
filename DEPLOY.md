# 🚀 Guía de Despliegue - AfesDev (Servidor Personal)

Esta guía te ayudará a desplegar tu portafolio en tu servidor personal con el dominio **afesdev.site**.

## ⚠️ Nota Importante sobre Permisos

Esta guía asume que:
- **Tienes acceso root directo** (estás conectado como usuario `root`)
- **O estás ejecutando los comandos como root** (sin necesidad de `sudo`)

Si necesitas usar `sudo`, simplemente agrega `sudo` antes de cada comando que requiera permisos elevados. Los comandos están escritos sin `sudo` para mayor claridad.

**Alternativas de comandos:**
- `systemctl` → `service` (en sistemas más antiguos)
- Si `sudo` no funciona, asegúrate de estar como usuario root: `whoami` (debe mostrar `root`)

## 📋 Requisitos Previos

- Servidor Linux (Ubuntu/Debian recomendado)
- Nginx o Apache instalado
- Certificado SSL (Let's Encrypt recomendado)
- Acceso SSH al servidor
- Node.js 18+ instalado en el servidor (para build local o en servidor)

## 🔧 Paso 1: Build del Proyecto

### Opción A: Build en tu máquina local

En tu máquina local, ejecuta:

```bash
npm run build
```

Esto generará los archivos estáticos en la carpeta `dist/`.

### Opción B: Build en el servidor

Si prefieres hacer el build en el servidor:

```bash
# Conectarte al servidor
ssh usuario@tu-servidor

# Clonar o subir el proyecto
cd /var/www
git clone tu-repositorio afesdev
# O subir los archivos con scp/sftp

# Instalar dependencias
cd afesdev
npm install

# Build
npm run build
```

## 📦 Paso 2: Subir Archivos al Servidor

### Si hiciste build localmente:

```bash
# Desde tu máquina local
scp -r dist/* usuario@tu-servidor:/var/www/afesdev/dist/
```

### Si usas Git en el servidor:

```bash
# En el servidor
cd /var/www/afesdev
git pull
npm run build
```

## 📁 Paso 3: Estructura de Directorios en el Servidor

Asegúrate de tener esta estructura:

```
/var/www/afesdev/
├── dist/          # Archivos estáticos generados por Astro
│   ├── index.html
│   ├── _astro/
│   ├── images/
│   └── ...
└── .htaccess      # Solo si usas Apache (copiar desde la raíz del proyecto)
```

## 🌐 Paso 4: Configuración del Servidor

### Opción A: Nginx (Recomendado)

1. **Ver la configuración de Nginx**:

```bash
cat nginx.conf
```

2. **Copiar la configuración al servidor**:

```bash
# Desde tu máquina local
scp nginx.conf usuario@tu-servidor:/tmp/nginx.conf

# En el servidor (como root o usuario con permisos)
cp /tmp/nginx.conf /etc/nginx/sites-available/afesdev.site
# O si estás como usuario normal y tienes acceso:
# sudo cp /tmp/nginx.conf /etc/nginx/sites-available/afesdev.site
```

3. **Editar la configuración con vi**:

```bash
vi /etc/nginx/sites-available/afesdev.site
# O si necesitas permisos:
# sudo vi /etc/nginx/sites-available/afesdev.site
```

Ajusta estas líneas según tu servidor:
- `root /var/www/afesdev/dist;` - Verifica que esta ruta sea correcta
- Rutas de certificados SSL (si ya los tienes)

4. **Habilitar el sitio**:

```bash
ln -s /etc/nginx/sites-available/afesdev.site /etc/nginx/sites-enabled/
# O si necesitas permisos:
# sudo ln -s /etc/nginx/sites-available/afesdev.site /etc/nginx/sites-enabled/
```

5. **Verificar la configuración**:

```bash
nginx -t
# O si necesitas permisos:
# sudo nginx -t
```

Si todo está bien, verás: `nginx: configuration file /etc/nginx/nginx.conf test is successful`

6. **Recargar Nginx**:

```bash
systemctl reload nginx
# O si necesitas permisos:
# sudo systemctl reload nginx
# O alternativamente:
# service nginx reload
```

### Opción B: Apache

1. **Subir el archivo .htaccess**:

```bash
# Desde tu máquina local
scp .htaccess usuario@tu-servidor:/var/www/afesdev/dist/.htaccess
```

2. **Habilitar módulos necesarios**:

```bash
a2enmod rewrite
a2enmod headers
a2enmod expires
systemctl restart apache2
# O si necesitas permisos:
# sudo a2enmod rewrite
# sudo a2enmod headers
# sudo a2enmod expires
# sudo systemctl restart apache2
# O alternativamente:
# service apache2 restart
```

3. **Verificar que .htaccess esté en su lugar**:

```bash
cat /var/www/afesdev/dist/.htaccess
```

4. **Configurar Virtual Host** (si es necesario):

```bash
vi /etc/apache2/sites-available/afesdev.site.conf
# O si necesitas permisos:
# sudo vi /etc/apache2/sites-available/afesdev.site.conf
```

Agrega esta configuración:

```apache
<VirtualHost *:80>
    ServerName afesdev.site
    ServerAlias www.afesdev.site
    DocumentRoot /var/www/afesdev/dist
    
    <Directory /var/www/afesdev/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/afesdev_error.log
    CustomLog ${APACHE_LOG_DIR}/afesdev_access.log combined
</VirtualHost>
```

5. **Habilitar el sitio**:

```bash
a2ensite afesdev.site.conf
systemctl reload apache2
# O si necesitas permisos:
# sudo a2ensite afesdev.site.conf
# sudo systemctl reload apache2
# O alternativamente:
# service apache2 reload
```

## 🔒 Paso 5: Configurar SSL (HTTPS)

### Con Let's Encrypt (Certbot)

**Para Nginx:**

```bash
certbot --nginx -d afesdev.site -d www.afesdev.site
# O si necesitas permisos:
# sudo certbot --nginx -d afesdev.site -d www.afesdev.site
```

**Para Apache:**

```bash
certbot --apache -d afesdev.site -d www.afesdev.site
# O si necesitas permisos:
# sudo certbot --apache -d afesdev.site -d www.afesdev.site
```

Esto configurará automáticamente HTTPS y renovación automática.

### Verificar certificados:

```bash
certbot certificates
# O si necesitas permisos:
# sudo certbot certificates
```

## 🔐 Paso 6: Configurar Permisos

Asegúrate de que los archivos tengan los permisos correctos:

```bash
# Cambiar propietario (ajusta según tu usuario de servidor web)
chown -R www-data:www-data /var/www/afesdev
# O si tu usuario de servidor web es diferente (nginx, apache, etc.):
# chown -R nginx:nginx /var/www/afesdev
# O si necesitas permisos:
# sudo chown -R www-data:www-data /var/www/afesdev

# Permisos de lectura
chmod -R 755 /var/www/afesdev
# O si necesitas permisos:
# sudo chmod -R 755 /var/www/afesdev
```

## ✅ Paso 7: Verificar el Despliegue

1. **Verificar que los archivos estén en su lugar**:

```bash
ls -la /var/www/afesdev/dist/
cat /var/www/afesdev/dist/index.html | head -20
```

2. **Verificar configuración de Nginx**:

```bash
cat /etc/nginx/sites-available/afesdev.site
```

3. **Verificar logs**:

```bash
# Nginx
tail -f /var/log/nginx/afesdev.error.log
tail -f /var/log/nginx/afesdev.access.log
# O si necesitas permisos:
# sudo tail -f /var/log/nginx/afesdev.error.log

# Apache
tail -f /var/log/apache2/afesdev_error.log
# O si necesitas permisos:
# sudo tail -f /var/log/apache2/afesdev_error.log
```

4. **Probar en el navegador**: Visita `https://afesdev.site`

## 🔄 Actualizaciones Futuras

Para actualizar el sitio:

### Método 1: Build local y subir

```bash
# En tu máquina local
npm run build
scp -r dist/* usuario@tu-servidor:/var/www/afesdev/dist/
```

### Método 2: Build en el servidor

```bash
# Conectarte al servidor
ssh usuario@tu-servidor

# Ir al directorio del proyecto
cd /var/www/afesdev

# Actualizar código (si usas Git)
git pull

# Rebuild
npm run build

# No necesitas reiniciar Nginx/Apache
```

## 📝 Comandos Útiles

### Ver configuración actual:

```bash
# Nginx
cat /etc/nginx/sites-available/afesdev.site

# Apache
cat /etc/apache2/sites-available/afesdev.site.conf
```

### Ver logs en tiempo real:

```bash
# Nginx
sudo tail -f /var/log/nginx/afesdev.error.log

# Apache
sudo tail -f /var/log/apache2/afesdev_error.log
```

### Verificar estado del servidor:

```bash
# Nginx
systemctl status nginx
# O alternativamente:
# service nginx status
# O si necesitas permisos:
# sudo systemctl status nginx

# Apache
systemctl status apache2
# O alternativamente:
# service apache2 status
# O si necesitas permisos:
# sudo systemctl status apache2
```

### Reiniciar servidor web:

```bash
# Nginx
systemctl restart nginx
# O alternativamente:
# service nginx restart
# O si necesitas permisos:
# sudo systemctl restart nginx

# Apache
systemctl restart apache2
# O alternativamente:
# service apache2 restart
# O si necesitas permisos:
# sudo systemctl restart apache2
```

## 🐛 Solución de Problemas

### Error 404 en rutas

**Nginx:**
- Verifica que la línea `try_files $uri $uri/ /index.html;` esté en la configuración
- Verifica: `cat /etc/nginx/sites-available/afesdev.site | grep try_files`

**Apache:**
- Verifica que `mod_rewrite` esté habilitado: `a2enmod rewrite` (o `sudo a2enmod rewrite` si necesitas permisos)
- Verifica que `.htaccess` esté en la carpeta `dist/`: `cat /var/www/afesdev/dist/.htaccess`

### Archivos no se cargan

1. **Verificar permisos**:
```bash
ls -la /var/www/afesdev/dist/
```

2. **Verificar ruta en configuración**:
```bash
# Nginx
cat /etc/nginx/sites-available/afesdev.site | grep root

# Debe mostrar: root /var/www/afesdev/dist;
```

3. **Verificar que los archivos existan**:
```bash
ls -la /var/www/afesdev/dist/images/
```

### SSL no funciona

1. **Verificar certificados**:
```bash
certbot certificates
# O si necesitas permisos:
# sudo certbot certificates
```

2. **Verificar puerto 443**:
```bash
ufw status
# O
netstat -tlnp | grep :443
# O si necesitas permisos:
# sudo ufw status
# sudo netstat -tlnp | grep :443
```

3. **Verificar configuración SSL en Nginx**:
```bash
cat /etc/nginx/sites-available/afesdev.site | grep ssl_certificate
```

### Error de permisos

```bash
# Verificar propietario
ls -la /var/www/afesdev/

# Cambiar propietario si es necesario
chown -R www-data:www-data /var/www/afesdev
chmod -R 755 /var/www/afesdev
# O si necesitas permisos:
# sudo chown -R www-data:www-data /var/www/afesdev
# sudo chmod -R 755 /var/www/afesdev
```

## 📞 Verificación Final

Ejecuta estos comandos para verificar que todo esté correcto:

```bash
# 1. Verificar archivos
ls -la /var/www/afesdev/dist/ | head -10

# 2. Verificar configuración Nginx
nginx -t
# O si necesitas permisos:
# sudo nginx -t

# 3. Verificar estado del servidor
systemctl status nginx  # o apache2
# O alternativamente:
# service nginx status
# O si necesitas permisos:
# sudo systemctl status nginx

# 4. Verificar SSL
certbot certificates
# O si necesitas permisos:
# sudo certbot certificates

# 5. Ver logs recientes
tail -20 /var/log/nginx/afesdev.error.log
# O si necesitas permisos:
# sudo tail -20 /var/log/nginx/afesdev.error.log
```

---

**¡Listo! Tu portafolio debería estar funcionando en https://afesdev.site** 🎉
