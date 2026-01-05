// server.js - Servidor Express simple para servir archivos estáticos de Astro
// NOTA: Esto NO es necesario si usas Nginx directamente (recomendado).
// Solo úsalo si realmente necesitas un servidor Node.js.

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4321;
const HOST = process.env.HOST || '0.0.0.0';

// Obtener directorio actual
const __dirname = path.resolve();

// Servir archivos estáticos desde dist
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y', // Cache por 1 año
  etag: true,
  lastModified: true
}));

// Headers de seguridad
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// SPA routing - todas las rutas van a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
  console.log(`📁 Sirviendo archivos desde: ${path.join(__dirname, 'dist')}`);
});

// Manejo de señales para cierre graceful
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido, cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT recibido, cerrando servidor...');
  process.exit(0);
});

