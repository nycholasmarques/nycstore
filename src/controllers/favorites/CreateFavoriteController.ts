import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CreateFavoriteService } from "../../services/favorites/CreateFavoriteService";

class CreateFavoriteController {

    async handle(request: Request, response: Response) {
    
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array()[0].msg });  
        }

        const { product_id } = request.body;
        const { user_id } = request;

        const createFavoriteService = new CreateFavoriteService();

        const favorite = await createFavoriteService.execute({ user_id, product_id });

        return response.json(favorite);
    }
}

export { CreateFavoriteController }