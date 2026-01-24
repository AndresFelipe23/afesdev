---
title: "Financially"
subtitle: "Aplicación móvil de gestión financiera personal desarrollada con Flutter y NestJS"
image: "/images/Financially/POST 1.png"
images:
  - "/images/Financially/POST 1.png"
  - "/images/Financially/POST 2.png"
  - "/images/Financially/POST 3.png"
  - "/images/Financially/POST 4.png"
  - "/images/Financially/POST 5.png"
date: 2025-11-23T05:00:00Z
company: "AFESDEV"
client_type: "personal"
technologies: ["Flutter", "Dart", "NestJS", "TypeScript", "SQL Server", "JWT", "Riverpod"]
categories: ["desarrollo", "mobile", "full-stack"]
featured: true
draft: false
project_url: "https://gestiondinero.site"
google_play_url: "https://play.google.com/store/apps/details?id=com.afesdev.financially"
github_url: ""
status: "completado"
---

## Descripción del Proyecto

Financially es una aplicación móvil completa de gestión financiera personal que permite a los usuarios controlar sus ingresos, gastos, cuentas, transacciones y metas financieras de manera sencilla e intuitiva. Desarrollada con tecnologías modernas como Flutter para el frontend y NestJS para el backend.

La aplicación está diseñada específicamente para usuarios de países de habla hispana, soportando múltiples monedas y adaptándose a las necesidades financieras del mercado latinoamericano.

## Características Principales

### Gestión Completa de Finanzas

- **Gestión de Cuentas**: Crea y administra múltiples cuentas (bancarias, efectivo, tarjetas, etc.)
- **Transacciones**: Registra ingresos y gastos con categorías personalizadas
- **Monedas**: Soporte para múltiples monedas de países de habla hispana (17 monedas diferentes)
- **Metas Financieras**: Establece y rastrea metas de ahorro
- **Préstamos**: Gestiona préstamos y pagos
- **Presupuestos**: Crea y controla presupuestos mensuales
- **Categorías Personalizadas**: Crea tus propias categorías de ingresos y gastos
- **Dashboard**: Vista resumida de tu situación financiera
- **Perfil de Usuario**: Personaliza tu información y moneda predeterminada

### Monedas Soportadas

La aplicación soporta 17 monedas diferentes de países de habla hispana, incluyendo:

- COP - Peso Colombiano
- ARS - Peso Argentino
- CLP - Peso Chileno
- PEN - Sol Peruano
- MXN - Peso Mexicano
- Y muchas más...

## Tecnologías Utilizadas

### Frontend
- **Flutter**: Framework multiplataforma para desarrollo móvil
- **Dart**: Lenguaje de programación
- **Riverpod**: Gestión de estado moderna y eficiente
- **Flutter Secure Storage**: Almacenamiento seguro de datos sensibles

### Backend
- **NestJS**: Framework Node.js escalable y robusto
- **TypeScript**: Lenguaje de programación tipado
- **SQL Server**: Base de datos relacional
- **JWT**: Autenticación segura mediante tokens
- **BCrypt**: Encriptación de contraseñas

## Desafíos y Soluciones

### Seguridad
- Implementación de autenticación JWT robusta
- Almacenamiento seguro de tokens con Flutter Secure Storage
- Validación de datos en frontend y backend
- Protección contra inyección SQL mediante stored procedures
- HTTPS obligatorio en producción

### Escalabilidad
- Arquitectura modular con NestJS
- Separación de concerns entre frontend y backend
- Gestión de estado eficiente con Riverpod
- Optimización de consultas a base de datos

### Multi-moneda
- Sistema flexible de gestión de monedas
- Conversión entre diferentes monedas
- Soporte para 17 monedas diferentes
- Configuración por usuario

## Resultados

- Aplicación móvil completa y funcional
- Soporte multiplataforma (Android inicialmente, iOS en desarrollo)
- Sistema de autenticación seguro implementado
- Interfaz intuitiva y fácil de usar
- Disponible en producción en gestiondinero.site

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

### Backend (finanzas-api)
- Arquitectura modular con NestJS
- Módulos separados: auth, cuentas, transacciones, categorías, metas, préstamos, presupuestos
- Base de datos SQL Server con stored procedures
- API RESTful bien estructurada

### Frontend (finanzasapp)
- Arquitectura basada en features
- Separación entre core (configuración, modelos, API) y features (pantallas)
- Gestión de estado con Riverpod
- Navegación fluida entre pantallas

## Configuración y Despliegue

La aplicación está configurada para trabajar en diferentes entornos:

- **Desarrollo Local**: Para desarrollo y testing
- **Producción**: Desplegada en gestiondinero.site
- **Build Android**: Configuración completa para Play Store
- **Build iOS**: Preparado para App Store (en desarrollo)

## Seguridad

El proyecto implementa múltiples capas de seguridad:

- Autenticación mediante JWT
- Almacenamiento seguro de tokens
- Validación exhaustiva de datos
- Protección contra inyección SQL
- HTTPS obligatorio en producción
- Encriptación de contraseñas con BCrypt

## Cliente

**AFESDEV** - Proyecto personal desarrollado como aplicación móvil para gestión financiera personal, con enfoque en el mercado de habla hispana.

## Contacto

Para más información sobre el proyecto:
- **Email**: afesdev2025@gmail.com
- **Versión**: 1.0.0
- **Última actualización**: Enero 2025

