#!/bin/sh

# Esperar a que la base de datos esté lista
echo "Esperando a que la base de datos esté lista..."
sleep 10

# Sincronizar esquema de base de datos
echo "Sincronizando esquema de base de datos..."
npx prisma db push --accept-data-loss

# Ejecutar el seed
echo "Poblando la base de datos..."
npx prisma db seed

# Iniciar la aplicación
echo "Iniciando el servidor backend..."
node dist/index.js

