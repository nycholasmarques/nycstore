import { prismaClient } from "../../prisma";

interface categoryRequest {
    name: string;
    category_id: string;
}

class UpdateCategoryService {
    async execute({ name, category_id }: categoryRequest) {
        const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: Number(category_id)
            }
        })

        if (!categoryExists) {
            throw new Error("Categoria não existe!")
        }
        
        if(categoryExists.name.toLowerCase() === name.toLowerCase()) {
            throw new Error("Nome da categoria deve ser diferente!")
        }

        const category = await prismaClient.category.update({
            where: {
                id: Number(category_id)
            },
            data: {
                name: name
            }
        })

        return category;

    }
}

export { UpdateCategoryService }