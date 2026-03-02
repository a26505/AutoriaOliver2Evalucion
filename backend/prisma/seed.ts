import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    // Crear usuario admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@nexus.com' },
        update: { password: hashedPassword },
        create: {
            email: 'admin@nexus.com',
            password: hashedPassword,
            role: 'ADMIN'
        },
    });

    // Crear usuario estándar
    const user = await prisma.user.upsert({
        where: { email: 'user@nexus.com' },
        update: { password: userPassword },
        create: {
            email: 'user@nexus.com',
            password: userPassword,
            role: 'USER'
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

    // Listado de productos base
    const productsData = [
        { name: 'Laptop Pro 16', price: 1200, stock: 15, categoryId: electronics.id, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800' },
        { name: 'Monitor 4K OLED', price: 850, stock: 8, categoryId: electronics.id, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800' },
        { name: 'Teclado Mecánico RGB', price: 120, stock: 25, categoryId: electronics.id, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800' },
        { name: 'Ratón Ergonómico', price: 65, stock: 40, categoryId: electronics.id, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800' },
        { name: 'Escritorio Premium Madera', price: 450, stock: 10, categoryId: furniture.id, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800' },
        { name: 'Silla Pro-Gamer', price: 299, stock: 15, categoryId: furniture.id, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800' },

    ];

    // Limpiar productos existentes para un seed limpio
    console.log('Limpiando productos antiguos...');
    await prisma.product.deleteMany();

    console.log('Creando nuevos productos...');
    for (const p of productsData) {
        await prisma.product.create({ data: p });
    }

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
