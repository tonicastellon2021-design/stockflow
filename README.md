# StockFlow  

Proyecto de práctica personal en React + TypeScript, construido para reforzar temas de rendimiento, hooks avanzados y patrones de arquitectura frontend.

## Stack

- React + TypeScript + Vite
- TanStack Query (fetching, caché, paginación)
- Zustand (estado global con persistencia)
- React Hook Form (formularios y validación)
- React Router (rutas protegidas por rol, lazy loading)
- Bootstrap + Bootstrap Icons
- SweetAlert2 (alertas y confirmaciones)
- MockAPI como backend simulado

## Funcionalidades

**Tienda pública**
- Catálogo con filtro por categoría, búsqueda y paginación
- Carrito de compras persistente (localStorage vía Zustand)
- Registro e inicio de sesión con persistencia de sesión
- Flujo de pedido completo con reducción de stock automática

**Panel de administración** (protegido por rol)
- Gestión de productos: crear, editar, eliminar, con vista previa de imagen por URL
- Gestión de usuarios: crear, editar, eliminar, con protección contra auto-edición/auto-eliminación
- Gestión de pedidos: consulta y actualización de estado
- Reportes: ingresos totales, pedidos pendientes, usuarios registrados, productos con stock bajo

**Optimización**
- Code splitting con `React.lazy` en las rutas del panel admin
- `React.memo` + `useCallback` en las filas de las tablas para evitar renders innecesarios
- Búsqueda con debounce en catálogo y tablas de administración

## Usuarios de prueba

| Correo | Contraseña | Rol |
|---|---|---|
| admin@gmail.com | 123456 | admin |
| clientePrueba@yahoo.com | 123456 | cliente | 
