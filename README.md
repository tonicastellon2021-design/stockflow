# StockFlow

Proyecto de práctica personal en React + TypeScript, construido para reforzar temas de rendimiento, hooks avanzados y patrones de arquitectura frontend

**Estado: en construcción activa.** No es un proyecto terminado ni pensado para producción — es un espacio de práctica. Algunas partes del panel de administración están incompletas o en proceso de construcion.

## Stack

- React + TypeScript + Vite
- TanStack Query
- Zustand
- React Hook Form
- React Router
- Bootstrap + SweetAlert2
- MockAPI como backend simulado

## Estado actual

- ✅ Catálogo público con filtros, paginación y carrito
- ✅ Autenticación con persistencia de sesión (Zustand + localStorage)
- ✅ Rutas protegidas por rol (cliente / admin)
- ✅ Flujo de pedido con reducción de stock
- 🚧 CRUD de usuarios del panel admin (formulario de crear/editar aún no conectado)
- 🚧 CRUD de productos y pedidos del panel admin
- 🚧 Pulido de estilos y consistencia visual en progreso

## Nota

Al ser un proyecto de práctica sobre una API simulada (MockAPI), los datos de usuarios son de prueba y no representan información real

## Usuarios de prueba

Puedes utilizar estos usuarios para probar el inicio de sesión y las rutas según el rol:

| Correo                    | Contraseña | Rol           |
| ------------------------- | ---------- | ------------- |
| `admin@gmail.com`         | `12345`    | Administrador |
| `clientePrueba@yahoo.com` | `123`      | Cliente       |
