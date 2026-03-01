# Use Debian-based Node image for better Prisma/OpenSSL compatibility
FROM node:20-bullseye-slim

# Install OpenSSL 1.1 (required by older Prisma engines or certain OS layers)
RUN apt-get update -y && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy prisma schema first to generate client
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the source code
COPY . .

# Build TypeScript
RUN npx tsc

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "dist/index.js"]
