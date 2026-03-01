# Sistema de Inventario Nexus

## Descripción
Esta aplicación es el proyecto entregable para la Actividad de Aprendizaje de Desarrollo Web en Entorno Cliente. Ha sido desarrollada utilizando Vue 3, Composition API y Node.js.

## Requisitos
- Docker
- Docker Compose

## Arranque Rápido 
El proyecto entero (frontend, backend y base de datos) está completamente contenerizado. Para la corrección, la aplicación estará disponible lanzando el siguiente comando en la raíz del proyecto:

```bash
docker-compose build && docker compose up
```

Una vez que los contenedores estén levantados, podrás acceder a la interfaz en:
- **Frontend Pública:** http://localhost:8080

## Credenciales de Usuarios de Prueba 
Para acceder al panel de administración, inicia sesión desde la vista pública o navegando a `/login` con cualquiera de estas cuentas generadas por defecto:

- **Usuario Administrador**:
  - Email: `admin@nexus.com`
  - Contraseña: `admin123`

- **Usuario Estándar**:
  - Email: `user@nexus.com`
  - Contraseña: `user123`

## Stack Tecnológico 💻
- **Front-End:** Vue 3 (Composition API), TypeScript, Pinia (Estado), Vue Router (Navegación), PrimeVue + Tailwind CSS v4 (Maquetación y UI), VeeValidate & Yup (Validación de Formularios).
- **Back-End:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL.
- **Contenedores:** Docker, multi-stage builds (Nginx / node-alpine).
