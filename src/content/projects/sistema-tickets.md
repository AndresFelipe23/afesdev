---
title: "Sistema de Gestión de Tickets"
subtitle: "Sistema completo de gestión de tickets con arquitectura moderna, backend y frontend separados, base de conocimiento, tableros Kanban y sistema robusto de roles y permisos"
image: "/images/SistemaTicket/st-1.png"
images:
  - "/images/SistemaTicket/st-1.png"
  - "/images/SistemaTicket/st-2.png"
  - "/images/SistemaTicket/st-3.png"
date: 2024-12-01T05:00:00Z
company: "AFESDEV"
client_type: "grande"
technologies: ["NestJS", "TypeScript", "React", "SQL Server", "TypeORM", "JWT", "Firebase", "TailwindCSS", "Vite", "Swagger", "Scalar", "Yoopta Editor", "FullCalendar", "dnd-kit"]
categories: ["desarrollo", "full-stack", "web", "saas"]
featured: true
draft: false
project_url: ""
github_url: ""
status: "completado"
---

## Descripción del Proyecto

Sistema completo de gestión de tickets desarrollado con arquitectura moderna, que incluye backend y frontend separados. Diseñado para facilitar la gestión de solicitudes de soporte, base de conocimiento, tableros Kanban y administración de usuarios con un sistema robusto de roles y permisos.

Este sistema es una solución integral para la gestión de tickets de soporte técnico, diseñada para empresas que necesitan un sistema escalable y personalizable. Permite a los clientes crear tickets de soporte, a los agentes gestionarlos eficientemente, y a los administradores tener control total sobre el sistema mediante un sistema granular de permisos.

## Características Principales

### 🎫 Gestión de Tickets

- Creación y seguimiento de tickets con números únicos
- Estados personalizables (Abierto, En Progreso, Resuelto, Cerrado, etc.)
- Prioridades configurables (Baja, Media, Alta, Crítica)
- Categorización de tickets
- Asignación de tickets a agentes
- Comentarios y conversaciones en tiempo real
- Adjuntos de archivos
- Historial completo de cambios

### 📚 Base de Conocimiento

- Artículos con editor de texto enriquecido
- Sistema de versiones para artículos
- Categorización de contenido
- Publicación/despublicación de artículos
- Búsqueda y navegación intuitiva
- URLs amigables (slugs)

### 📋 Tableros Kanban

- Creación de tableros personalizados
- Listas y tarjetas organizables
- Drag & drop para reorganizar tareas
- Vinculación de tickets con tarjetas
- Gestión visual de proyectos

### 📝 Notas Diarias

- Sistema de notas personales o compartidas
- Editor de texto enriquecido
- Organización por fechas
- Permisos granulares por nota

### 👥 Gestión de Usuarios y Permisos

- Sistema RBAC (Role-Based Access Control)
- 5 roles predefinidos (Admin, Supervisor, Agente, Cliente, ReadOnly)
- 48 permisos granulares
- Asignación múltiple de roles por usuario
- Control de acceso a nivel de funcionalidad

### 📊 Dashboard

- Métricas en tiempo real
- Estadísticas de tickets
- Gráficos y visualizaciones
- Reportes exportables

### 📅 Calendario

- Vista de calendario para eventos y tareas
- Integración con tickets y notas

### 🔐 Seguridad

- Autenticación JWT
- Encriptación de contraseñas con bcrypt
- Guards de autorización
- Validación de datos en backend y frontend
- Headers de seguridad HTTP (Helmet)
- CORS configurado

### 📱 Progressive Web App (PWA)

- Instalable en dispositivos móviles
- Funcionalidad offline
- Notificaciones push (preparado)
- Iconos adaptativos

## Arquitectura del Sistema

El sistema está dividido en dos aplicaciones principales:

- **Backend (API REST)**: NestJS con TypeORM y SQL Server
- **Frontend (SPA)**: React 19 con TypeScript y Vite

### Backend

- Framework: NestJS (Node.js)
- Base de Datos: SQL Server con TypeORM
- Autenticación: JWT (JSON Web Tokens)
- Almacenamiento: Firebase Storage
- Documentación: Swagger/OpenAPI + Scalar

### Frontend

- Framework: React 19 con TypeScript
- Build Tool: Vite (con Rolldown)
- Estilos: TailwindCSS 4
- Estado: Context API
- Rutas: Hash-based routing
- PWA: Service Worker configurado

## Stack Tecnológico

### Backend

- **NestJS** ^11.0.1 - Framework principal del backend
- **TypeScript** ^5.7.3 - Lenguaje de programación
- **TypeORM** ^0.3.27 - ORM para SQL Server
- **SQL Server** - Base de datos relacional
- **Passport JWT** ^4.0.1 - Estrategia de autenticación
- **Firebase Admin** ^13.0.0 - Gestión de almacenamiento
- **Swagger** ^11.2.1 - Documentación de API
- **Scalar** ^1.39.3 - Interfaz moderna de documentación
- **Helmet** ^8.1.0 - Seguridad HTTP
- **Compression** ^1.8.1 - Compresión de respuestas
- **bcrypt** ^6.0.0 - Encriptación de contraseñas
- **class-validator** ^0.14.2 - Validación de DTOs

### Frontend

- **React** ^19.2.0 - Biblioteca UI
- **TypeScript** ~5.9.3 - Lenguaje de programación
- **Vite** 7.2.2 (Rolldown) - Build tool y dev server
- **TailwindCSS** ^4.1.17 - Framework CSS
- **Axios** ^1.13.2 - Cliente HTTP
- **Firebase** ^11.1.0 - SDK de Firebase
- **Yoopta Editor** ^4.9.9 - Editor de texto enriquecido
- **FullCalendar** ^6.1.19 - Componente de calendario
- **dnd-kit** ^6.3.1 - Drag and drop para Kanban
- **SweetAlert2** ^11.26.3 - Alertas y modales
- **vite-plugin-pwa** ^1.1.0 - Configuración PWA

## Módulos y Funcionalidades

### Backend - Módulos

#### 🔐 Autenticación (`auth`)

- Login y registro de usuarios
- Generación y validación de JWT
- Guards de autenticación
- Decoradores personalizados

#### 👤 Usuarios (`usuarios`)

- CRUD completo de usuarios
- Gestión de perfiles
- Asignación de roles

#### 🎫 Tickets (`tickets`)

- CRUD completo de tickets
- Gestión de estados, prioridades y categorías
- Comentarios en tickets
- Adjuntos de archivos
- Asignación de agentes
- Números de seguimiento únicos

#### 📚 Base de Conocimiento (`base-conocimiento`)

- CRUD de artículos
- Sistema de versiones
- Categorías de artículos
- Publicación/despublicación

#### 📋 Tableros (`tableros`)

- CRUD de tableros
- Gestión de listas y tarjetas
- Relación con tickets

#### 🔑 Roles y Permisos (`roles`)

- CRUD de roles
- CRUD de permisos
- Asignación de permisos a roles
- Asignación de roles a usuarios

#### 📝 Notas Diarias (`notas-diarias`)

- CRUD de notas
- Editor de texto enriquecido
- Permisos por nota

#### 📊 Dashboard (`dashboard`)

- Métricas y estadísticas
- Endpoints para reportes

#### 💾 Storage (`storage`)

- Gestión de archivos
- Integración con Firebase Storage
- Subida y descarga de archivos

### Frontend - Componentes

- **LoginForm / RegisterForm**: Autenticación de usuarios
- **Dashboard**: Layout principal con navegación
- **Tickets**: Lista y gestión de tickets
- **CrearTicket / EditarTicket / VerTicket**: Gestión individual de tickets
- **BaseConocimiento**: Lista de artículos
- **EditorArticulo / VerArticulo**: Creación y visualización de artículos
- **Tableros**: Gestión de tableros Kanban
- **NotasDiarias**: Sistema de notas
- **Usuarios**: Gestión de usuarios
- **RolesPermisos**: Administración de roles y permisos
- **DashboardView**: Vista principal con métricas
- **Calendar**: Vista de calendario

## Sistema de Roles y Permisos

El sistema implementa un modelo RBAC (Role-Based Access Control) completo con 5 roles predefinidos y 48 permisos granulares.

### Roles Disponibles

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **Admin** | Administrador del sistema con acceso total | 48 (Todos) |
| **Supervisor** | Gestión de tickets y equipos | 35 |
| **Agente** | Gestión de tickets asignados | 20 |
| **Cliente** | Crear y ver sus propios tickets | 7 |
| **ReadOnly** | Usuario de solo lectura | 5 |

### Módulos con Permisos

- **Usuarios**: 7 permisos (crear, ver, ver_todos, actualizar, eliminar, asignar_roles, ver_propio)
- **Tickets**: 11 permisos (crear, ver, ver_todos, ver_asignados, ver_propios, actualizar, eliminar, asignar, cambiar_estado, cambiar_prioridad, cambiar_categoria)
- **Comentarios**: 4 permisos (crear, ver, actualizar, eliminar)
- **Adjuntos**: 3 permisos (subir, ver, eliminar)
- **Base de Conocimiento**: 9 permisos (crear, ver, ver_todos, actualizar, eliminar, publicar, ver_versiones, crear_categoria, actualizar_categoria, eliminar_categoria)
- **Tableros**: 6 permisos (crear, ver, ver_todos, actualizar, eliminar, gestionar_listas, gestionar_tarjetas)
- **Roles**: 5 permisos (crear, ver, actualizar, eliminar, asignar_permisos)
- **Permisos**: 4 permisos (crear, ver, actualizar, eliminar)
- **Reportes**: 2 permisos (ver, exportar)

### Reglas de Negocio

- Los usuarios pueden modificar sus propios recursos
- Los agentes solo pueden modificar tickets asignados
- Los administradores y supervisores pueden modificar cualquier recurso
- Los clientes solo pueden ver sus propios tickets
- Solo administradores y supervisores pueden cambiar prioridades
- Solo administradores y supervisores pueden publicar artículos en la base de conocimiento

## Notas de Desarrollo

- El sistema utiliza **TypeScript** en todo el stack para type safety
- **TypeORM** maneja las migraciones y relaciones de base de datos
- El frontend usa **Hash-based routing** para compatibilidad con servidores estáticos
- **TailwindCSS 4** se utiliza para estilos con configuración moderna
- El editor de texto enriquecido usa **Yoopta Editor** para una mejor experiencia

## Versión

**Versión**: 1.0.0  
**Última actualización**: 2024

