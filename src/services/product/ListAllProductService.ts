import { prismaClient } from "../../prisma";

class ListAllProductService {
    async execute() {
        const products = await prismaClient.products.findMany(
            {
                include: {
                    reviews: true
                }
            }
        );

        return products;
    }
}

export { ListAllProductService }