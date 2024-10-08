import { Request, Response } from "express";
import { DeleteFavoriteService } from "../../services/favorites/DeleteFavoriteService";

class DeleteFavoriteController {

    async handle(request: Request, response: Response) {
        const { user_id } = request;
        const { id } = request.params;

        const deleteFavoriteService = new DeleteFavoriteService();

        const favorite = await deleteFavoriteService.execute({ user_id, id });

        return response.json({
            success: "Favorite deleted with success"
        });

    }
}

export { DeleteFavoriteController }