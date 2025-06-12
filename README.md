# Flowcash Backend

Este proyecto es una API RESTful diseñada para manejar operaciones de flujo de efectivo (flowcash). Desarrollado con Node.js, utiliza Sequelize como ORM y PostgreSQL como base de datos. La API permite crear, actualizar, eliminar y consultar diferentes tipos de operaciones financieras, que incluyen ingresos, gastos y transferencias, todo gestionado bajo distintos tipos de flujos de efectivo. También incluye control de saldos diarios.

---

## Tecnologías

- **Node.js**: Servidor backend eficiente y escalable.
- **Sequelize**: ORM para la interacción con bases de datos relacionales.
- **PostgreSQL**: Base de datos utilizada.
- **Express**: Framework para manejo de rutas y middleware.
- **AWS EC2**: Despliegue en instancia de Linux.

---

## Estructura del Proyecto

- `/models`: Definición de entidades (Operaciones, Tipos de flujo, etc.).
- `/controllers`: Lógica de negocio para CRUD de operaciones.
- `/routes`: Rutas API para acceder a las funcionalidades.
- `/config`: Configuración de base de datos y Sequelize.

---

## Características

- CRUD completo para operaciones financieras.
- Gestión de diferentes tipos de flujos de caja.
- Control de saldos en base diaria.
- Configuración simple para adaptarse a múltiples entornos (desarrollo/producción).
- **Paginación**: Implementada para consultas de usuarios y operaciones.
- **Reportes personalizados**: Generación de informes detallados de ingresos y egresos por períodos.
- **JWT Authentication**: Seguridad mejorada con autenticación basada en tokens.
- **Relaciones optimizadas**: Selección de atributos específicos en las relaciones para mejorar el rendimiento.

---

## Requisitos

- **Node.js 14+**
- **PostgreSQL**
- **Sequelize CLI** para migraciones.

---