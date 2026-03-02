import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({ include: { category: true } });
    res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, description, price, stock, image, categoryId } = req.body;
    const product = await prisma.product.create({
        data: { name, description, price, stock, image, categoryId }
    });
    res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, stock, image, categoryId } = req.body;
    const product = await prisma.product.update({
        where: { id },
        data: { name, description, price, stock, image, categoryId }
    });
    res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
};
