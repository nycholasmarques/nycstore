import { Request, Response } from "express";
import { ListAllFavoritesService } from "../../services/favorites/ListAllFavoritesService";

class ListAllFavoritesController {
    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const listAllFavoritesService = new ListAllFavoritesService();

        const favorites = await listAllFavoritesService.execute({ user_id });

        return response.json(favorites);
    }
}

export { ListAllFavoritesController }