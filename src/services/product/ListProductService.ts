import { prismaClient } from "../../prisma";

interface ProductRequest {
    product_id: string
}

class ListProductService {
    async execute ({ product_id } : ProductRequest) {

        const productExists = await prismaClient.products.findFirst({
            where: {
                id: Number(product_id)
            }
        })

        if (!productExists) {
            throw new Error("Produto não encontrado");
        }

        const product = prismaClient.products.findFirst({
            where: {
                id: Number(product_id)
            }
        });
        return product;
    }
}

export { ListProductService }