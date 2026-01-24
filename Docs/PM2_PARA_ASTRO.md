# 🚀 PM2 para Proyecto Astro - AfesDev

## ⚠️ Importante: Astro NO necesita PM2

**Astro genera sitios estáticos**, por lo que normalmente **NO necesitas PM2** para este proyecto. Lo que necesitas es:

1. **Nginx o Apache** sirviendo los archivos estáticos de la carpeta `dist/`
2. **No necesitas un proceso Node.js corriendo**

## ✅ Configuración Recomendada (Sin PM2)

### 1. Build del proyecto

```bash
npm run build
```

Esto genera los archivos estáticos en `dist/`

### 2. Configurar Nginx para servir archivos estáticos

Ya tienes la configuración en `nginx.conf`. Solo asegúrate de que:

- La ruta `root` apunte a `/cloudclusters/afesdev/dist` (o donde estén tus archivos)
- Nginx esté configurado y activo

```bash
# Verificar configuración
cat /etc/nginx/sites-available/afesdev.site | grep root

# Verificar que Nginx esté corriendo
systemctl status nginx
```

### 3. Actualizar el sitio

Cuando hagas cambios:

```bash
# En tu máquina local o servidor
npm run build

# Subir archivos al servidor (si hiciste build local)
scp -r dist/* root@tu-servidor:/cloudclusters/afesdev/dist/

# No necesitas reiniciar nada, los archivos se sirven directamente
```

**Esto es todo. No necesitas PM2.**

---

## 🔧 Si AÚN quieres usar PM2 (No recomendado)

Si por alguna razón específica quieres usar PM2 con Astro, puedes usar `astro preview`, pero **NO es recomendado para producción**.

### Opción 1: Usar astro preview con PM2

```bash
# Instalar PM2
npm install -g pm2

# Iniciar con PM2
pm2 start npm --name "afesdev" -- run preview

# O especificando puerto
pm2 start npm --name "afesdev" -- run preview -- --port 4321 --host 0.0.0.0
```

**Problemas con este enfoque:**
- Menos eficiente que servir archivos estáticos
- Consume más recursos
- No es la forma recomendada para Astro

### Opción 2: Crear un servidor Express simple

Si realmente necesitas un servidor Node.js, puedes crear uno:

#### 1. Instalar Express

```bash
npm install express
```

#### 2. Crear archivo `server.js` en la raíz del proyecto

```javascript
// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4321;

// Servir archivos estáticos desde dist
app.use(express.static(path.join(__dirname, 'dist')));

// SPA routing - todas las rutas van a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
```

#### 3. Agregar script al package.json

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "start": "node server.js",
    "check": "astro check",
    "format": "prettier -w ."
  }
}
```

#### 4. Build y ejecutar con PM2

```bash
# Build del proyecto
npm run build

# Iniciar con PM2
pm2 start server.js --name afesdev

# O usando el script npm
pm2 start npm --name afesdev -- start
```

#### 5. Configurar Nginx como reverse proxy

Si usas PM2, necesitas configurar Nginx como reverse proxy:

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

**Pero esto es innecesario** porque puedes servir los archivos directamente con Nginx.

---

## 📋 Comparación: Con vs Sin PM2

### ❌ Con PM2 (No recomendado)
- ✅ Proceso Node.js corriendo
- ❌ Consume más recursos (RAM, CPU)
- ❌ Más complejo de configurar
- ❌ Necesita reverse proxy en Nginx
- ❌ Más puntos de fallo

### ✅ Sin PM2 (Recomendado)
- ✅ Nginx sirve archivos estáticos directamente
- ✅ Muy eficiente (menos recursos)
- ✅ Más simple de configurar
- ✅ Más rápido
- ✅ Menos puntos de fallo
- ✅ Escala mejor

---

## 🎯 Recomendación Final

**Para este proyecto Astro, NO uses PM2.**

Usa esta configuración:

1. **Build**: `npm run build`
2. **Nginx**: Sirve archivos de `dist/` directamente
3. **Actualizar**: Solo sube nuevos archivos a `dist/`

**Ventajas:**
- Más rápido
- Menos recursos
- Más simple
- Más confiable
- Es la forma recomendada para sitios estáticos

---

## 📝 Comandos Útiles (Si decides usar PM2 de todas formas)

```bash
# Iniciar
pm2 start server.js --name afesdev

# Ver procesos
pm2 list

# Ver logs
pm2 logs afesdev

# Reiniciar
pm2 restart afesdev

# Detener
pm2 stop afesdev

# Eliminar
pm2 delete afesdev

# Configurar inicio automático
pm2 startup systemd
pm2 save
```

---

**Conclusión: Para tu proyecto Astro, usa Nginx directamente. No necesitas PM2.** 🎉

