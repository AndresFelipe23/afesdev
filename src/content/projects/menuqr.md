---
title: "MenuQR"
subtitle: "Sistema completo de gestión de menús digitales para restaurantes con pedidos en tiempo real y códigos QR"
image: "/images/MenuQR/menuqr-img1.png"
date: 2025-12-21T05:00:00Z
company: "AFESDEV"
client_type: "mediana"
technologies: ["TypeScript", "React", "Node.js", "Express", "SQL Server", "TypeORM", "Socket.io", "Stripe", "Wompi", "Firebase", "Tailwind CSS", "Vite"]
categories: ["desarrollo", "full-stack", "saas", "web"]
featured: true
draft: false
project_url: "https://qrestaurante.site/"
github_url: ""
status: "completado"
---

## Descripción del Proyecto

MenuQR es una plataforma SaaS completa diseñada para modernizar la experiencia de los restaurantes mediante menús digitales accesibles mediante códigos QR. El sistema permite a los restaurantes gestionar sus menús, recibir pedidos en tiempo real, administrar mesas y personalizar su presencia digital con un sistema tipo "Linktr.ee" integrado.

El proyecto fue desarrollado como una solución integral que reemplaza los menús físicos tradicionales, optimizando la operación de restaurantes mediante digitalización completa, gestión de pedidos en tiempo real, sistema multi-tenancy y monetización mediante suscripciones.

## Características Principales

### Gestión Multi-Tenancy

- Sistema completo de multi-tenancy con aislamiento de datos por restaurante
- Cada restaurante tiene su propio espacio configurable e independiente
- URLs personalizadas mediante slugs únicos

### Menús Digitales con QR

- Generación automática de códigos QR únicos por mesa
- Menús organizados por categorías con imágenes y descripciones
- Sistema de adiciones/extras personalizables (tamaños, ingredientes, etc.)
- Actualización de precios y disponibilidad en tiempo real

### Sistema de Pedidos en Tiempo Real

- **WebSockets** (Socket.io) para comunicación bidireccional instantánea
- Notificaciones en tiempo real a cocina cuando llegan nuevos pedidos
- Actualización automática del estado de pedidos (pendiente, preparando, listo, entregado)
- Historial completo de cambios de estado con timestamps

### Sistema de Roles y Permisos (RBAC)

- Control de acceso basado en roles: **Super Admin**, **Admin**, **Mesero**, **Cocina**
- Permisos granulares por funcionalidad
- Gestión de usuarios con asignación de roles por restaurante

### Reservas de Mesas (Premium)

- Sistema completo de reservas con calendario integrado
- Configuración de horarios y políticas de reservas
- Confirmación automática y recordatorios
- Gestión de disponibilidad en tiempo real

### Páginas Personalizables (Tipo Linktr.ee)

- Enlaces sociales personalizables para cada restaurante
- Personalización completa de colores, fuentes y tema
- Configuración de qué secciones mostrar (menú, enlaces, contacto)
- Perfil público con imagen de perfil y portada

### Sistema de Suscripciones

- Integración con **Stripe** y **Wompi** para pagos
- Planes de suscripción (FREE, PRO, PREMIUM)
- Webhooks para sincronización de pagos
- Gestión automática de estados de suscripción

## Tecnologías Utilizadas

### Backend API
- **Node.js** con TypeScript
- **Express.js** para el servidor HTTP
- **TypeORM** como ORM para SQL Server
- **Socket.io** para WebSockets en tiempo real
- **JWT** para autenticación y autorización
- **bcrypt** para encriptación de contraseñas
- **Stripe SDK** y **Wompi SDK** para procesamiento de pagos
- **Firebase Storage** para almacenamiento de imágenes
- **Nodemailer** para envío de emails
- **Swagger/Scalar** para documentación de API

### Frontend Administrador
- **React 19** con TypeScript
- **Vite** como build tool
- **Tailwind CSS 4** para estilos
- **React Router DOM** para navegación
- **Axios** para peticiones HTTP
- **Socket.io Client** para WebSockets
- **SweetAlert2** para notificaciones
- **Lucide React** para iconos

### Frontend Cliente
- **React 19** con TypeScript
- **Vite** como build tool
- **Tailwind CSS 4** para estilos
- **Lottie React** para animaciones
- **React Router DOM** para navegación

### Base de Datos
- **Microsoft SQL Server** como base de datos relacional
- Estructura multi-tenancy con aislamiento de datos
- Sistema de auditoría con logs centralizados

## Arquitectura del Sistema

El proyecto está organizado en **3 aplicaciones separadas** que trabajan en conjunto:

- **menuqr-api/**: Backend API REST con Express, TypeORM y SQL Server
- **menuqr-frontend-administrador/**: Panel administrativo para restaurantes
- **menuqr-frontend-cliente/**: Frontend público para clientes (menú digital)

## Desafíos y Soluciones

### Multi-Tenancy
- Implementación de aislamiento de datos a nivel de base de datos
- Sistema de slugs únicos para URLs personalizadas
- Configuración independiente por restaurante

### Tiempo Real
- Implementación de WebSockets con Socket.io
- Sincronización de estado entre múltiples clientes
- Notificaciones push en tiempo real

### Escalabilidad
- Arquitectura modular y separación de concerns
- Optimización de consultas a base de datos
- Sistema de caché para mejorar rendimiento

### Seguridad
- Autenticación JWT con refresh tokens
- Sistema RBAC completo con permisos granulares
- Validación exhaustiva de datos en todas las entradas
- Aislamiento multi-tenancy para seguridad de datos

### Integraciones
- Integración con Stripe y Wompi para pagos
- Webhooks para sincronización de eventos
- Integración con Firebase Storage para imágenes
- Sistema de emails con Nodemailer

## Resultados

- Plataforma SaaS completa y funcional
- Sistema multi-tenancy implementado exitosamente
- Pedidos en tiempo real funcionando perfectamente
- Integración de pagos con Stripe y Wompi operativa
- Frontend responsive y optimizado para móviles
- Documentación técnica completa del sistema

## Estructura del Proyecto

El proyecto sigue una arquitectura modular:

- **Backend**: API REST con Express, TypeORM y SQL Server
- **Frontend Admin**: Panel administrativo con React y Tailwind CSS
- **Frontend Cliente**: Interfaz pública con React y Tailwind CSS
- **Base de Datos**: SQL Server con estructura multi-tenancy
- **Infraestructura**: PM2 para gestión de procesos, Docker opcional

## Seguridad

El sistema implementa múltiples capas de seguridad:

- Autenticación JWT con refresh tokens
- Hashing de contraseñas con bcrypt
- Helmet.js para headers de seguridad HTTP
- CORS configurado estrictamente
- Rate Limiting para prevenir abusos
- Validación de datos en todas las entradas (DTOs)
- Sanitización de inputs
- Aislamiento multi-tenancy a nivel de base de datos
- RBAC para control de acceso granular

## URLs del Proyecto

- **Panel Administrativo**: [https://qrestaurante.site/](https://qrestaurante.site/)
- **Vista Pública de Restaurantes**: [https://menusqr.site/](https://menusqr.site/)

## Cliente

**AFESDEV** - Proyecto SaaS desarrollado para restaurantes que buscan modernizar su experiencia con menús digitales y gestión de pedidos en tiempo real.

## Contacto

Para más información sobre este proyecto, visita las URLs oficiales o consulta la documentación técnica.

