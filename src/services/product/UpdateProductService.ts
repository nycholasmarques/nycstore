import path from "path";
import fs from 'fs/promises';
import { prismaClient } from "../../prisma";

interface ProductRequest {
    product_id: string,
    name: string;
    description: string;
    price: number;
    image: string;
    stock_quantity: number;
    categoriesArray: any;
    discount_id: number
}

class UpdateProductService {
    async execute({ product_id, name, description, price, image, stock_quantity, categoriesArray, discount_id }: ProductRequest) {

        const productExists = await prismaClient.products.findFirst({
            where: {
                id: Number(product_id)
            }
        })

        if (!productExists) {
            throw new Error("Produto não encontrado");
        }

        if (image !== undefined) {
            if (productExists.image_url) {
                const filePath = path.join(__dirname, "..", "..", "..", "tmp", productExists.image_url);
    
                try {
                    await fs.unlink(filePath);
                } catch (err) {
                    throw new Error("Erro ao deletar imagem");
                }
            }
        }
        
        const product = await prismaClient.products.update({
            where: {
                id: Number(product_id)
            },
            data: {
                name: name,
                description: description,
                price: Number(price),
                image_url: image,
                stock_quantity: Number(stock_quantity),
                categories: categoriesArray && categoriesArray.length > 0
                ? {
                    deleteMany: {},
                    create: categoriesArray.map(categoryId => ({
                        category: {
                            connect: { id: Number(categoryId) }
                        }
                    }))
                } : undefined,
                discount: {
                    connect: { id: Number(discount_id) }
                }
            }
        })

        return product
    }
}

export { UpdateProductService }