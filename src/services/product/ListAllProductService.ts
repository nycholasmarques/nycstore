import { prismaClient } from "../../prisma";

class ListAllProductService {
    async execute() {
        const products = await prismaClient.products.findMany();

        return products;
    }
}

export { ListAllProductService }