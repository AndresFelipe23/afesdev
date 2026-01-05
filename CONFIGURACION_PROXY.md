# 🔧 Configuración de Proxy - AfesDev (Servidor Personal)

Este documento contiene todas las configuraciones de proxy necesarias para desplegar el portafolio en **afesdev.site** en tu servidor personal.

## 📁 Archivos de Configuración

- **nginx.conf** - Configuración para Nginx
- **.htaccess** - Configuración para Apache
- **caddy.conf** - Configuración para Caddy (opcional)

## 🚀 Instrucciones Rápidas

### Nginx

1. **Ver la configuración**:
   ```bash
   cat nginx.conf
   ```

2. **Copiar al servidor**:
   ```bash
   scp nginx.conf usuario@servidor:/tmp/
   # En el servidor:
   sudo cp /tmp/nginx.conf /etc/nginx/sites-available/afesdev.site
   ```

3. **Editar con vi**:
   ```bash
   vi /etc/nginx/sites-available/afesdev.site
   # O si necesitas permisos: sudo vi /etc/nginx/sites-available/afesdev.site
   ```
   Ajusta la ruta `root` según tu servidor.

4. **Habilitar sitio**:
   ```bash
   ln -s /etc/nginx/sites-available/afesdev.site /etc/nginx/sites-enabled/
   # O si necesitas permisos: sudo ln -s ...
   ```

5. **Verificar y recargar**:
   ```bash
   nginx -t
   systemctl reload nginx
   # O alternativamente: service nginx reload
   # O si necesitas permisos: sudo nginx -t && sudo systemctl reload nginx
   ```

### Apache

1. **Subir .htaccess**:
   ```bash
   scp .htaccess usuario@servidor:/var/www/afesdev/dist/.htaccess
   ```

2. **Verificar en el servidor**:
   ```bash
   cat /var/www/afesdev/dist/.htaccess
   ```

3. **Habilitar módulos**:
   ```bash
   a2enmod rewrite headers expires
   systemctl restart apache2
   # O alternativamente: service apache2 restart
   # O si necesitas permisos: sudo a2enmod rewrite headers expires && sudo systemctl restart apache2
   ```

### Caddy (Opcional)

1. **Ver configuración**:
   ```bash
   cat caddy.conf
   ```

2. **Agregar a Caddyfile**:
   ```bash
   sudo vi /etc/caddy/Caddyfile
   ```
   Copia el contenido de `caddy.conf`

3. **Reiniciar**:
   ```bash
   systemctl restart caddy
   # O alternativamente: service caddy restart
   # O si necesitas permisos: sudo systemctl restart caddy
   ```

## ⚙️ Configuraciones Importantes

### Dominio Actualizado

El dominio **afesdev.site** ya está configurado en:
- `src/config/config.json` → `base_url: "https://afesdev.site"`

### Build del Proyecto

Antes de subir al servidor:

```bash
npm run build
```

Los archivos estarán en la carpeta `dist/`

### Rutas SPA

Todas las configuraciones incluyen reglas para que Astro funcione como SPA:
- Nginx: `try_files $uri $uri/ /index.html;`
- Apache: Reglas de rewrite en `.htaccess`
- Caddy: `try_files {path} /index.html`

## 🔒 SSL/HTTPS

### Let's Encrypt (Recomendado)

**Nginx:**
```bash
certbot --nginx -d afesdev.site -d www.afesdev.site
# O si necesitas permisos: sudo certbot --nginx -d afesdev.site -d www.afesdev.site
```

**Apache:**
```bash
certbot --apache -d afesdev.site -d www.afesdev.site
# O si necesitas permisos: sudo certbot --apache -d afesdev.site -d www.afesdev.site
```

**Caddy:** SSL automático (no requiere configuración adicional)

## 📝 Notas

- Ajusta las rutas de certificados SSL en `nginx.conf` según tu instalación
- El archivo `.htaccess` debe estar en la raíz del sitio (carpeta `dist/`)
- Verifica los permisos de archivos: `chmod -R 755 /var/www/afesdev`
- Revisa los logs si hay problemas

## 🆘 Solución de Problemas

### Error 404 en rutas

Verifica que las reglas de SPA routing estén activas:
- Nginx: Línea `try_files $uri $uri/ /index.html;`
- Apache: Módulo `mod_rewrite` habilitado
- Caddy: Línea `try_files {path} /index.html`

### Archivos no cargan

1. Verifica permisos: `ls -la /var/www/afesdev/dist`
2. Verifica la ruta `root` en la configuración
3. Revisa logs del servidor

### SSL no funciona

1. Verifica certificados: `certbot certificates` (o `sudo certbot certificates` si necesitas permisos)
2. Verifica puerto 443 abierto: `ufw status` (o `sudo ufw status` si necesitas permisos)
3. Revisa configuración SSL en nginx.conf: `cat /etc/nginx/sites-available/afesdev.site | grep ssl_certificate`

---

Para más detalles, consulta `DEPLOY.md`

