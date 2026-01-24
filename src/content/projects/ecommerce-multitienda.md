---
title: "EcomPlatform"
subtitle: "Sistema de comercio electrónico multi-tienda con arquitectura moderna, backend .NET 8, frontend React y aplicación móvil Flutter"
image: "/images/Ecommerce/ecommerce_uno.png"
images:
  - "/images/Ecommerce/ecommerce_uno.png"
  - "/images/Ecommerce/ecommerce_dos.png"
  - "/images/Ecommerce/ecommerce_tres.png"
  - "/images/Ecommerce/ecommerce_cuatro.png"
  - "/images/Ecommerce/ecommerce_cinco.png"
  - "/images/Ecommerce/ecommerce_seis.png"
date: 2026-01-15T05:00:00Z
company: "AFESDEV"
client_type: "grande"
technologies: [".NET 8", "C#", "React", "TypeScript", "Flutter", "Dart", "SQL Server", "Entity Framework", "JWT", "TailwindCSS", "Vite", "Firebase", "Mercado Pago"]
categories: ["desarrollo", "full-stack", "web", "mobile", "ecommerce"]
featured: true
draft: false
project_url: ""
github_url: ""
status: "completado"
---

## Descripción del Proyecto

EcomPlatform es un sistema de comercio electrónico completo y modular que permite crear y gestionar múltiples tiendas online desde una única plataforma. Diseñado con arquitectura multi-tenant, ofrece la flexibilidad necesaria para adaptarse a cualquier tipo de negocio: desde tiendas de ropa y calzado, hasta cosméticos, accesorios, muebles, menús digitales para restaurantes y más.

El sistema está pensado para emprendedores, PyMEs y empresas que buscan una solución robusta, personalizable y lista para escalar.

## Características Principales

### 🏪 Multi-Tienda (Multi-Tenancy)

- **Múltiples tiendas** en una sola plataforma
- **Dominio personalizado** para cada tienda
- **Configuración independiente** (colores, logo, ajustes)
- **Aislamiento de datos** garantizado entre tiendas
- **Escalabilidad** sin límite de tiendas

### 📦 Gestión de Productos Flexible

- **Variantes**: Tallas, colores, materiales y atributos personalizados
- **Atributos dinámicos**: Crea los atributos que necesites según tu industria
- **Imágenes múltiples**: Galería de imágenes por producto y variante
- **SEO optimizado**: URLs amigables con slugs automáticos
- **Categorías jerárquicas**: Árbol de categorías multinivel
- **Control de stock**: Inventario por variante con alertas

### 🛒 Experiencia de Compra

- **Carrito de compras** persistente
- **Lista de deseos** para guardar productos favoritos
- **Checkout simplificado** en pocos pasos
- **Múltiples métodos de pago** (Mercado Pago integrado)
- **Historial de pedidos** completo
- **Seguimiento de envíos** en tiempo real

### 💳 Pagos Integrados

- **Mercado Pago** completamente integrado
- Webhooks para actualizaciones automáticas de estado
- Soporte para pagos con tarjeta, transferencia y más
- Facturas y comprobantes digitales

### 📢 Marketing y Promociones

- **Sistema de cupones** con códigos de descuento
- **Promociones** por tiempo limitado
- **Banners dinámicos** personalizables
- **Configuración de envío** gratis por monto mínimo

## Arquitectura del Sistema

El sistema está dividido en cuatro aplicaciones principales:

- **Backend (API REST)**: .NET 8 con Entity Framework Core y SQL Server
- **Frontend Administrador**: React 19 con TypeScript y TailwindCSS
- **Frontend Tienda**: React 19 para la experiencia de compra del cliente
- **App Móvil**: Flutter para Android e iOS

## Stack Tecnológico

### Backend — API REST

- **.NET 8** - Framework principal
- **ASP.NET Core Web API** - Endpoints RESTful
- **Entity Framework Core** - ORM para acceso a datos
- **SQL Server 2022** - Base de datos relacional
- **JWT** - Autenticación segura
- **Swagger/OpenAPI** - Documentación de API
- **Firebase Storage** - Almacenamiento de imágenes

### Frontend Administrador

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos modernos
- **Vite** - Build tool ultra-rápido
- **ApexCharts** - Gráficos y estadísticas
- **React Router** - Navegación SPA

### Frontend Tienda (Clientes)

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Diseño responsive
- **Vite** - Build tool
- **SweetAlert2** - Notificaciones elegantes
- **Context API** - Estado global (carrito, auth)

### Aplicación Móvil

- **Flutter 3.x** - Framework multiplataforma
- **Dart** - Lenguaje de programación
- **Android & iOS** - Plataformas soportadas
- **Material Design** - Sistema de diseño

## Panel de Administración

El panel de administración ofrece control total sobre la tienda con una interfaz moderna e intuitiva.

### 📊 Dashboard Principal

- Vista general de ventas y estadísticas
- Gráficos de rendimiento
- Pedidos recientes
- Productos más vendidos
- Alertas de stock bajo

### 📋 Módulos Disponibles

- **Productos**: CRUD completo, variantes, imágenes, atributos
- **Categorías**: Gestión jerárquica, imágenes, SEO
- **Inventario**: Stock por variante, alertas, movimientos
- **Pedidos**: Estados, seguimiento, facturas
- **Clientes**: Registro, direcciones, historial
- **Cupones**: Códigos de descuento, límites de uso
- **Promociones**: Ofertas temporales, descuentos
- **Banners**: Carruseles, promocionales, informativos
- **Configuración**: Tienda, pagos, envíos, notificaciones
- **Proveedores**: Gestión de proveedores y compras
- **Reportes**: Ventas, productos, clientes

## Aplicación Móvil

La app móvil ofrece una experiencia de compra nativa y fluida.

### Pantallas Principales

- 🏠 **Home** — Banners, categorías destacadas, productos populares
- 🔍 **Explorar** — Búsqueda y filtros avanzados
- 📦 **Detalle de Producto** — Galería, variantes, agregar al carrito
- 🛒 **Carrito** — Gestión de productos, cupones
- ❤️ **Lista de Deseos** — Productos guardados
- 👤 **Perfil** — Cuenta, direcciones, pedidos

## Tienda Web (Frontend Público)

### Características de la Tienda

- **Diseño responsive** — Optimizado para móvil, tablet y desktop
- **Navegación intuitiva** — Menú de categorías, búsqueda rápida
- **Carruseles de banners** — Promociones destacadas
- **Grid de productos** — Vista rápida, filtros dinámicos
- **Checkout integrado** — Proceso de compra simplificado
- **Cuenta de usuario** — Registro, login, historial

### Páginas Disponibles

- **Home**: Landing con banners, categorías y productos destacados
- **Productos**: Catálogo con filtros por categoría, precio, etc.
- **Detalle**: Información completa del producto
- **Carrito**: Resumen de compra
- **Checkout**: Proceso de pago
- **Mi Cuenta**: Perfil, direcciones, pedidos
- **Lista de Deseos**: Productos favoritos
- **Sobre Nosotros**: Información de la tienda
- **Contacto**: Formulario de contacto

## Ventajas Competitivas

### ⚡ Rendimiento

- API optimizada con paginación eficiente
- Carga diferida de imágenes
- Caché inteligente
- Consultas SQL optimizadas

### 🔒 Seguridad

- Autenticación JWT robusta
- Hashing seguro de contraseñas (BCrypt)
- Validación de datos en todas las capas
- CORS configurado correctamente
- Protección contra inyección SQL

### 📈 Escalabilidad

- Arquitectura en capas (Clean Architecture)
- Patrón Repository para acceso a datos
- Inyección de dependencias
- Preparado para microservicios
- Docker-ready para despliegue

### 🎨 Personalización

- Temas y colores configurables
- Logo y branding por tienda
- Atributos de productos flexibles
- Configuraciones por tienda

## Tipos de Negocio Soportados

EcomPlatform es **completamente flexible** y se adapta a diversos tipos de negocio:

- 👕 **Moda**: Tienda de ropa con tallas y colores
- 👟 **Calzado**: Zapatería con números y modelos
- 💄 **Cosmética**: Productos de belleza con tonos
- 🛋️ **Muebles**: Mobiliario con dimensiones
- 🍔 **Restaurantes**: Menú digital con opciones
- 🎁 **Regalos**: Productos personalizables
- 📚 **Libros**: Librería con formatos
- 🔧 **Ferretería**: Productos con medidas
- 🏪 **General**: Tienda multi-categoría

## Flujo de un Pedido

1. 📦 **Carrito** — Cliente agrega productos
2. 💳 **Pago** — Proceso de checkout con Mercado Pago
3. ✅ **Confirmado** — Pedido registrado
4. 📋 **Preparando** — Administrador prepara el pedido
5. 🚚 **En Envío** — Producto en camino
6. 🎉 **Entregado** — Cliente recibe su pedido

## Estructura del Proyecto

```
📁 Ecommerce/
│
├── 📁 Backend/
│   ├── 📁 Ecommerce.API/        # API REST (Controllers, Middleware)
│   ├── 📁 Ecommerce.PRC/        # Lógica de Negocio (Services, DTOs)
│   ├── 📁 Ecommerce.BD/         # Acceso a Datos (Entities, Repositories)
│   └── 📁 docs/                 # Documentación técnica
│
├── 📁 Frontend_administrador/   # Panel de Admin (React + Tailwind)
│   ├── 📁 src/components/       # Componentes reutilizables
│   ├── 📁 src/pages/            # Páginas del dashboard
│   └── 📁 src/services/         # Servicios de API
│
├── 📁 Frontend_tienda/          # Tienda Web (React + Tailwind)
│   ├── 📁 src/components/       # Componentes de UI
│   ├── 📁 src/pages/            # Páginas públicas
│   └── 📁 src/services/         # Servicios de API
│
└── 📁 ecommerce_app/            # App Móvil (Flutter)
    ├── 📁 lib/models/           # Modelos de datos
    ├── 📁 lib/screens/          # Pantallas de la app
    └── 📁 lib/services/         # Servicios de API
```

## API REST

La API está completamente documentada con Swagger y ofrece endpoints para:

- **Auth**: Login, Registro, Refresh Token
- **Productos**: CRUD, Variantes, Imágenes, Búsqueda
- **Categorías**: CRUD, Árbol jerárquico
- **Pedidos**: Crear, Listar, Estados, Factura
- **Carrito**: Agregar, Actualizar, Eliminar
- **Clientes**: Perfil, Direcciones
- **Cupones**: Validar, Aplicar
- **Inventario**: Stock, Movimientos, Alertas
- **Banners**: CRUD, Ordenamiento
- **Configuración**: Tienda, Pagos, Envíos

## Características Futuras (Roadmap)

- PWA — App web progresiva
- Notificaciones Push — Alertas en tiempo real
- Chat en vivo — Soporte al cliente
- Múltiples idiomas — i18n completo
- Múltiples monedas — Precios localizados
- Marketplace — Múltiples vendedores
- Suscripciones — Productos recurrentes
- Analytics — Métricas avanzadas
- Email Marketing — Campañas integradas

## Versión

**Versión**: 1.0.0  
**Última actualización**: Enero 2025
