# Use Debian-based Node image for better Prisma/OpenSSL compatibility
FROM node:20-bullseye-slim

# Install OpenSSL 1.1 (required by older Prisma engines or certain OS layers)
RUN apt-get update -y && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Copy the rest of the source code (excluding node_modules via .dockerignore)
COPY . .

# Generate Prisma client with the latest schema
RUN npx prisma generate

# Build TypeScript
RUN npx tsc

# Expose port
EXPOSE 3000

# Añadir permisos al script de inicio y corregir line endings
RUN apt-get update -y && apt-get install -y dos2unix
RUN dos2unix start.sh && chmod +x start.sh

# Start command
CMD ["sh", "./start.sh"]

