import { prismaClient } from "../../prisma"

interface FavoriteRequest {
    user_id: string
    product_id: string
}

class CreateFavoriteService {
    async execute({user_id , product_id} : FavoriteRequest) {

        const productExists = await prismaClient.products.findFirst({
            where: {
                id: Number(product_id)
            }
        })

        if (!productExists) {
            throw new Error("Produto não encontrado")
        }

        const favorite = await prismaClient.favorite.create({
            data: {
                user_id: user_id,
                product_id: productExists.id
            }
        })

        return favorite
    }
}

export { CreateFavoriteService }