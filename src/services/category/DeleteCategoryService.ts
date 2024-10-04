import { prismaClient } from "../../prisma";

interface categoryRequest {
    category_id: string
}

class DeleteCategoryService {
    async execute({ category_id }: categoryRequest) {

        const categoryExists = await prismaClient.category.findFirst({
            where: {
                id: Number(category_id)
            }
        })

        if (!categoryExists) {
            throw new Error("Categoria não existe!")
        }

        const category = await prismaClient.category.delete({
            where: {
                id: Number(category_id)
            }
        })

        return category;
    }
}

export { DeleteCategoryService }