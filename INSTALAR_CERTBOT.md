# 📦 Instalar Certbot para SSL

## 🔧 Instalación de Certbot

```bash
# Actualizar paquetes
apt-get update

# Instalar certbot y plugin de nginx
apt-get install certbot python3-certbot-nginx -y

# Verificar instalación
certbot --version
```

## ✅ Después de Instalar

```bash
# Obtener certificados SSL para afesdev.site
certbot --nginx -d afesdev.site -d www.afesdev.site
```

Esto:
- Obtendrá certificados de Let's Encrypt
- Configurará automáticamente SSL en Nginx
- Configurará renovación automática

## 🔄 Alternativa: Instalar Solo Certbot (Sin Plugin Nginx)

Si el plugin de nginx no está disponible:

```bash
# Instalar solo certbot
apt-get install certbot -y

# Obtener certificados manualmente
certbot certonly --standalone -d afesdev.site -d www.afesdev.site
```

Luego actualiza manualmente la configuración de Nginx con las rutas de los certificados.

---

**Pero primero, usa la configuración SIN SSL para que el sitio funcione inmediatamente.**

