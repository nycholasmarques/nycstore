import { prismaClient } from "../../prisma"

interface categoryRequest {
    name: string
}

class CreateCategoryService {
    async execute({ name }: categoryRequest) {

        const categoryExists = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        })

        if(categoryExists) {
            throw new Error("Categoria já existe");
        }

        const category = await prismaClient.category.create({
            data: {
                name: name
            }
        });

        return category
    }
}

export { CreateCategoryService }