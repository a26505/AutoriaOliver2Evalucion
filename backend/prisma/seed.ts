import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    // Crear usuario admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@nexus.com' },
        update: {},
        create: {
            email: 'admin@nexus.com',
            password: hashedPassword,
            name: 'Administrador Nexus',
        },
    });

    // Crear usuario estándar
    const user = await prisma.user.upsert({
        where: { email: 'user@nexus.com' },
        update: {},
        create: {
            email: 'user@nexus.com',
            password: userPassword,
            name: 'Usuario Prueba',
        },
    });

    // Crear categorías base
    const electronics = await prisma.category.upsert({
        where: { name: 'Electrónica' },
        update: {},
        create: { name: 'Electrónica' },
    });

    const furniture = await prisma.category.upsert({
        where: { name: 'Muebles' },
        update: {},
        create: { name: 'Muebles' },
    });

    // Crear productos base
    await prisma.product.createMany({
        data: [
            { name: 'Laptop Pro 16', price: 1200, stock: 15, categoryId: electronics.id },
            { name: 'Monitor 4K', price: 450, stock: 8, categoryId: electronics.id },
            { name: 'Escritorio Madera', price: 250, stock: 5, categoryId: furniture.id },
            { name: 'Silla Ergonómica', price: 180, stock: 20, categoryId: furniture.id },
        ],
        skipDuplicates: true,
    });

    console.log('Seeding terminado: Usuarios y datos de prueba creados.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
