# 📋 Cómo usar ecosystem.config.js con PM2

## ⚠️ Recordatorio Importante

**Para Astro, normalmente NO necesitas PM2.** Usa Nginx directamente para servir los archivos estáticos. Este archivo es útil solo si realmente necesitas un servidor Node.js corriendo.

## 📁 Archivos Creados

1. **ecosystem.config.js** - Configuración de PM2
2. **server.js** - Servidor Express simple (opcional)

## 🚀 Uso Básico

### 1. Instalar PM2 (si no lo tienes)

```bash
npm install -g pm2
```

### 2. Instalar Express (si vas a usar server.js)

```bash
npm install express
```

### 3. Build del proyecto

```bash
npm run build
```

### 4. Iniciar con PM2

#### Opción A: Usar astro preview (NO recomendado)

```bash
# Editar ecosystem.config.js y descomentar la app 'afesdev-preview'
pm2 start ecosystem.config.js --only afesdev-preview
```

#### Opción B: Usar servidor Express

```bash
# 1. Crear directorio de logs
mkdir -p logs

# 2. Editar ecosystem.config.js y descomentar la app 'afesdev-server'
# 3. Cambiar enable: false a enable: true

# 4. Iniciar
pm2 start ecosystem.config.js --only afesdev-server
```

### 5. Ver procesos

```bash
pm2 list
```

### 6. Ver logs

```bash
pm2 logs afesdev-preview
# O
pm2 logs afesdev-server
```

### 7. Configurar inicio automático

```bash
pm2 startup systemd
pm2 save
```

## 🔧 Configuración de Nginx como Reverse Proxy

Si usas PM2, necesitas configurar Nginx como reverse proxy. Edita tu configuración de Nginx:

```nginx
server {
    listen 443 ssl http2;
    server_name afesdev.site www.afesdev.site;

    # ... configuración SSL ...

    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📝 Comandos Útiles

```bash
# Iniciar todas las apps del ecosystem
pm2 start ecosystem.config.js

# Iniciar solo una app específica
pm2 start ecosystem.config.js --only afesdev-preview

# Iniciar en modo producción
pm2 start ecosystem.config.js --env production

# Reiniciar
pm2 restart ecosystem.config.js

# Recargar (zero-downtime)
pm2 reload ecosystem.config.js

# Detener
pm2 stop ecosystem.config.js

# Eliminar
pm2 delete ecosystem.config.js

# Ver información
pm2 info afesdev-preview

# Monitoreo
pm2 monit
```

## 🎯 Recomendación Final

**Para este proyecto Astro, NO uses PM2.**

La configuración recomendada es:

1. **Build**: `npm run build`
2. **Nginx**: Sirve archivos directamente de `dist/`
3. **No necesitas procesos Node.js corriendo**

Esto es más eficiente, más rápido y más simple.

---

**Solo usa PM2 si realmente necesitas un servidor Node.js por alguna razón específica.**

