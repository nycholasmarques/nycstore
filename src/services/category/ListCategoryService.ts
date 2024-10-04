import { prismaClient } from "../../prisma";

class ListCategoryService {
    async execute() {
        const categories = await prismaClient.category.findMany();
        return categories;
    }
}

export { ListCategoryService }