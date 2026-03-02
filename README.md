# Sistema de Inventario Nexus

## Descripción
Esta aplicación es el proyecto entregable para la Actividad de Aprendizaje de Desarrollo Web en Entorno Cliente. Ha sido desarrollada utilizando Vue 3, Composition API y Node.js.

## Requisitos
- Docker
- Docker Compose

## Arranque Rápido 

### Opción A: Ejecución con Docker (Recomendado para corrección)
El proyecto entero (frontend, backend y base de datos) está completamente contenerizado. Lanza el siguiente comando en la raíz del proyecto:

powershell
docker-compose up --build -d

3. **Acceso:**
   - **Frontend:** [http://localhost:8080](http://localhost:8080)
   - **Backend API:** [http://localhost:3000/api](http://localhost:3000/api)


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
