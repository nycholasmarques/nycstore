import { prismaClient } from "../../prisma";

class ListAllDiscountsService {
    async execute() {
        const discounts = await prismaClient.discount.findMany();
        return discounts;
    }
}

export { ListAllDiscountsService }