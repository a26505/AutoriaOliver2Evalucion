#!/bin/sh

# Esperar a que la base de datos esté lista (opcional pero recomendado)
echo "Esperando a que la base de datos esté lista..."
sleep 5

# Aplicar migraciones
echo "Aplicando migraciones de Prisma..."
npx prisma migrate deploy

# Ejecutar el seed
echo "Poblando la base de datos con usuarios de prueba..."
npx prisma db seed

# Iniciar la aplicación
echo "Iniciando el servidor backend..."
node dist/index.js
