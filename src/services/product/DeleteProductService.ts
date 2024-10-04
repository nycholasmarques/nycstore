import { prismaClient } from "../../prisma";
import fs from 'fs/promises';
import path from 'path';

interface ProductRequest {
    product_id: string;
}

class DeleteProductService {
    async execute ({ product_id }: ProductRequest) {

        const productExists = await prismaClient.products.findFirst({
            where: {
                id: Number(product_id)
            }
        })

        if (!productExists) {
            throw new Error("Produto não encontrado");
        }

        
        await prismaClient.categoriesOnProducts.deleteMany({
            where: {
                product_id: Number(product_id)
            }
        });

        const product = await prismaClient.products.delete({
            where: {
                id: Number(product_id)
            }
        })

        if (product.image_url) {
            const filePath = path.join(__dirname, "..", "..", "..", "tmp", productExists.image_url);

            try {
                await fs.unlink(filePath);
            } catch (err) {
                throw new Error("Erro ao deletar imagem");
            }
        }

        return product;
    }
}

export { DeleteProductService }