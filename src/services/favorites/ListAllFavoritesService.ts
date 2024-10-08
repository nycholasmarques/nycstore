import { prismaClient } from "../../prisma";

interface FavoriteRequest {
    user_id: string
}

class ListAllFavoritesService {

    async execute({ user_id }: FavoriteRequest) {

        const favorites = await prismaClient.favorite.findMany({
            where: {
                user_id: user_id
            }
        })

        if (!favorites) {
            throw new Error("Nenhum favorito encontrado")
        }

        return favorites
    }
}

export { ListAllFavoritesService }