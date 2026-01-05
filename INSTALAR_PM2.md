# 🚀 Instalación y Configuración de PM2

PM2 es un gestor de procesos para aplicaciones Node.js que permite mantener las aplicaciones ejecutándose en segundo plano.

## 📦 Instalación

### Opción 1: Instalación Global con npm

```bash
npm install -g pm2
```

### Opción 2: Instalación Global con yarn

```bash
yarn global add pm2
```

### Opción 3: Instalación con pnpm

```bash
pnpm add -g pm2
```

### Opción 4: Instalación con bun

```bash
bun install -g pm2
```

## ✅ Verificar Instalación

```bash
pm2 --version
```

Debería mostrar la versión instalada, por ejemplo: `5.3.0`

## 🎯 Comandos Básicos de PM2

### Iniciar una aplicación

```bash
# Iniciar una aplicación Node.js
pm2 start app.js

# Iniciar con nombre personalizado
pm2 start app.js --name "mi-app"

# Iniciar y especificar número de instancias (cluster mode)
pm2 start app.js -i 4

# Iniciar con variables de entorno
pm2 start app.js --env production
```

### Gestionar procesos

```bash
# Ver lista de procesos
pm2 list
# O simplemente
pm2 ls

# Ver información detallada de un proceso
pm2 show <nombre-o-id>

# Detener un proceso
pm2 stop <nombre-o-id>

# Reiniciar un proceso
pm2 restart <nombre-o-id>

# Recargar un proceso (zero-downtime restart)
pm2 reload <nombre-o-id>

# Eliminar un proceso de la lista
pm2 delete <nombre-o-id>

# Eliminar todos los procesos
pm2 delete all
```

### Monitoreo

```bash
# Ver monitoreo en tiempo real
pm2 monit

# Ver logs en tiempo real
pm2 logs

# Ver logs de un proceso específico
pm2 logs <nombre-o-id>

# Ver últimas líneas de logs
pm2 logs --lines 100
```

### Información del sistema

```bash
# Ver información del sistema
pm2 info <nombre-o-id>

# Ver estadísticas
pm2 status
```

## 🔄 Configuración para Inicio Automático

### Generar script de inicio automático

```bash
# Para systemd (Ubuntu 16+, Debian 8+, CentOS 7+)
pm2 startup systemd

# Para upstart (Ubuntu 14, Debian 7)
pm2 startup upstart

# Para launchd (macOS)
pm2 startup launchd
```

Esto generará un comando que debes ejecutar. Copia y ejecuta el comando que te muestre.

### Guardar la configuración actual

Después de iniciar tus aplicaciones, guarda la configuración para que se restauren al reiniciar:

```bash
pm2 save
```

## 📝 Archivo de Configuración (ecosystem.config.js)

Puedes crear un archivo de configuración para gestionar múltiples aplicaciones:

```bash
# Generar archivo de ejemplo
pm2 ecosystem
```

Esto creará un archivo `ecosystem.config.js`. Ejemplo:

```javascript
module.exports = {
  apps: [
    {
      name: 'afesdev',
      script: './server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};
```

### Usar el archivo de configuración

```bash
# Iniciar todas las aplicaciones del archivo
pm2 start ecosystem.config.js

# Iniciar solo una aplicación específica
pm2 start ecosystem.config.js --only afesdev

# Iniciar en modo producción
pm2 start ecosystem.config.js --env production
```

## 🔧 Comandos Útiles Adicionales

### Reiniciar todos los procesos

```bash
pm2 restart all
```

### Recargar todos los procesos (zero-downtime)

```bash
pm2 reload all
```

### Detener todos los procesos

```bash
pm2 stop all
```

### Limpiar logs

```bash
pm2 flush
```

### Ver logs con rotación

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Actualizar PM2

```bash
npm install -g pm2@latest
pm2 update
```

## 📊 Monitoreo Web (Opcional)

PM2 incluye un monitor web opcional:

```bash
pm2 web
```

Esto iniciará un servidor web en `http://localhost:9615` con una interfaz de monitoreo.

## 🛑 Desinstalar PM2

Si necesitas desinstalar PM2:

```bash
npm uninstall -g pm2
```

Y eliminar los archivos de configuración:

```bash
rm -rf ~/.pm2
```

## 📝 Nota para Astro

**Importante**: Astro genera sitios estáticos, por lo que normalmente **NO necesitas PM2** para servir el sitio. PM2 es útil si:

1. Tienes un servidor Node.js adicional corriendo
2. Quieres usar `astro preview` en producción (no recomendado)
3. Tienes otras aplicaciones Node.js en el mismo servidor

Para Astro, normalmente solo necesitas:
- Nginx o Apache sirviendo los archivos estáticos de la carpeta `dist/`
- No necesitas un proceso Node.js corriendo

Si aún así quieres usar PM2 para algo específico, puedes crear un script simple:

```javascript
// server.js
const express = require('express');
const { fileURLToPath } = require('url');
const { dirname, join } = require('path');

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Servir archivos estáticos
app.use(express.static(join(__dirname, 'dist')));

// SPA routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

Y luego:

```bash
pm2 start server.js --name afesdev
```

Pero **recomendación**: Usa Nginx directamente para servir los archivos estáticos, es más eficiente.

---

**¿Necesitas PM2 para algo específico?** Si me dices para qué lo necesitas, puedo ayudarte a configurarlo correctamente.

