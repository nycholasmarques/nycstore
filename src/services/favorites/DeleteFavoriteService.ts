import { prismaClient } from "../../prisma";

interface FavoriteRequest {
    id: string;
    user_id: string;
}

class DeleteFavoriteService {
    async execute({user_id, id}: FavoriteRequest) {
        const favoriteExists = await prismaClient.favorite.findFirst({
            where: {
                id: Number(id),
                user_id: user_id,
            },
        });

        if(!favoriteExists) {
            throw new Error("Favorite not found");
        }

        const favorite = await prismaClient.favorite.delete({
            where: {
                id: favoriteExists.id,
                user_id: favoriteExists.user_id,
            },
        });

        return favorite;
    }
}

export { DeleteFavoriteService }