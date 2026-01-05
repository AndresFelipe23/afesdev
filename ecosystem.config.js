// ecosystem.config.js - Configuración PM2 para AfesDev
// NOTA: Para Astro, normalmente NO necesitas PM2. Usa Nginx directamente.
// Este archivo es útil solo si necesitas un servidor Node.js adicional.

module.exports = {
  apps: [
    {
      // Opción 1: Usar astro preview (NO recomendado para producción)
      name: 'afesdev-preview',
      script: 'npm',
      args: 'run preview',
      cwd: '/cloudclusters/afesdev',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 4321,
        HOST: '0.0.0.0'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4321,
        HOST: '0.0.0.0'
      },
      error_file: '/cloudclusters/afesdev/logs/pm2-error.log',
      out_file: '/cloudclusters/afesdev/logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      // Descomenta la siguiente línea si quieres usar esta app
      // enable: false
    },
    
    // Opción 2: Servidor Express (si creaste server.js)
    // Descomenta este bloque si vas a usar un servidor Express
    /*
    {
      name: 'afesdev-server',
      script: './server.js',
      cwd: '/cloudclusters/afesdev',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 4321
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4321
      },
      error_file: '/cloudclusters/afesdev/logs/pm2-error.log',
      out_file: '/cloudclusters/afesdev/logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      // Solo habilita si realmente necesitas un servidor Node.js
      enable: false
    }
    */
  ],

  // Configuración de deployment (opcional)
  deploy: {
    production: {
      user: 'root',
      host: 'afesdev.site',
      ref: 'origin/main',
      repo: 'git@github.com:tu-usuario/afesdev.git',
      path: '/cloudclusters/afesdev',
      'post-deploy': 'npm install && npm run build',
      'pre-setup': ''
    }
  }
};

