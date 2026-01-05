# AfesDev - Portafolio de Desarrollo de Software

<p align="center">Portafolio personal de desarrollador full-stack especializado en crear soluciones tecnológicas para pequeñas y grandes empresas.</p>

<h2 align="center">
  <a href="https://afesdev.com" target="_blank">🌐 Ver Sitio Web</a>
</h2>

<p align="center">
  <a href="https://github.com/withastro/astro/releases/tag/astro%405.14.1">
    <img src="https://img.shields.io/static/v1?label=ASTRO&message=5.14&color=000&logo=astro" alt="Astro Version" />
  </a>
  <a href="https://github.com/afesdev/afesdev-portfolio/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/afesdev/afesdev-portfolio" alt="License" />
  </a>
  <img src="https://img.shields.io/github/languages/code-size/afesdev/afesdev-portfolio" alt="Code Size" />
</p>

## 📌 Sobre el Proyecto

Este es mi portafolio personal desarrollado con **Astro**, **React**, **TypeScript** y **Tailwind CSS**. El sitio muestra mis proyectos, experiencia y habilidades como desarrollador full-stack, enfocado en crear soluciones para empresas.

## ✨ Características

- 🚀 **Rendimiento Optimizado**: Construido con Astro para máxima velocidad
- 📱 **Totalmente Responsive**: Diseño adaptativo para todos los dispositivos
- 🎨 **Diseño Moderno**: Interfaz limpia y profesional
- 📝 **Gestión de Contenido**: Contenido en Markdown/MDX fácil de editar
- 🔍 **SEO Optimizado**: Meta tags y estructura optimizada para buscadores
- ⚡ **Fast by Default**: Puntuación 95+ en Google PageSpeed
- 🛠️ **Stack Tecnológico Completo**: Muestra las tecnologías que utilizo

## 🛠️ Stack Tecnológico

### Frontend

- **Astro** - Framework web moderno
- **React** - Biblioteca para interfaces de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utility-first

### Backend & Desarrollo

- **Node.js** / **NestJS** / **Express**
- **SQL Server** / **MongoDB** / **Firebase**
- **Flutter** / **Dart** (Mobile)
- **TypeScript** / **JavaScript** / **C#**

### DevOps & Herramientas

- **Git** / **GitHub**
- **AWS** / **Firebase**
- **Docker**

## 📄 Páginas Incluidas

- 🏠 **Inicio** - Banner, habilidades, proyectos destacados y testimonios
- 👤 **Sobre Mí** - Información personal, experiencia y tecnologías
- 💼 **Proyectos** - Galería de proyectos con detalles completos
- 📞 **Contacto** - Formulario de contacto

## 🚀 Instalación y Uso

### Prerrequisitos

- **Node.js** (versión LTS recomendada): [Descargar Node.js](https://nodejs.org/en/download/)

### Configuración Local

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/afesdev/afesdev-portfolio.git
   cd afesdev-portfolio
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**

   ```bash
   npm run dev
   ```

   El sitio estará disponible en `http://localhost:4321`

4. **Build para producción**

   ```bash
   npm run build
   ```

5. **Previsualizar build de producción**

   ```bash
   npm run preview
   ```

## 📁 Estructura del Proyecto

```text
afesdev-portfolio/
├── public/              # Archivos estáticos (imágenes, etc.)
├── src/
│   ├── assets/          # Recursos del proyecto
│   ├── components/      # Componentes reutilizables
│   ├── config/          # Archivos de configuración
│   ├── content/         # Contenido en Markdown/MDX
│   │   ├── about/       # Contenido de "Sobre Mí"
│   │   ├── projects/    # Proyectos del portafolio
│   │   └── homepage/   # Contenido de la homepage
│   ├── layouts/         # Layouts de página
│   ├── lib/             # Utilidades y helpers
│   ├── pages/           # Páginas del sitio
│   └── styles/          # Estilos CSS
└── package.json
```

## 📝 Agregar Nuevos Proyectos

Para agregar un nuevo proyecto, crea un archivo Markdown en `src/content/projects/` con el siguiente formato:

```markdown
---
title: "Nombre del Proyecto"
subtitle: "Descripción breve"
image: "/images/proyecto/imagen.png"
date: 2024-01-15T05:00:00Z
company: "AFESDEV"
client_type: "mediana"
technologies: ["React", "Node.js", "TypeScript"]
categories: ["desarrollo", "web", "full-stack"]
featured: true
draft: false
project_url: "https://ejemplo.com"
google_play_url: "https://play.google.com/store/apps/details?id=..." # Opcional
github_url: "" # Opcional
status: "completado"
---

## Descripción del Proyecto

Contenido detallado del proyecto en Markdown...
```

## 🎨 Personalización

### Configuración Principal

Edita `src/config/config.json` para personalizar:

- Información del sitio
- Redes sociales
- Colores y temas
- Metadatos SEO

### Menú de Navegación

Edita `src/config/menu.json` para modificar los enlaces del menú.

### Contenido

Todo el contenido está en archivos Markdown dentro de `src/content/`:

- `homepage/-index.md` - Contenido de la página de inicio
- `about/-index.md` - Contenido de "Sobre Mí"
- `projects/*.md` - Proyectos individuales

## 📧 Contacto

- **Email**: afesdev2025@gmail.com
- **Portafolio**: <https://afesdev.com>

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

Este portafolio está basado en el tema [Pinwheel Astro](https://github.com/themefisher/pinwheel-astro) de [Themefisher](https://themefisher.com), adaptado y personalizado para mis necesidades.

---

## 👨‍💻 Desarrollado con ❤️ por AfesDev
