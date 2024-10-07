import { Request, Response } from "express";
import { UpdateCartItemsService } from "../../services/cartItems/UpdateCartItemsService";

class UpdateCartItemsController {
    async handle(request: Request, response: Response) {
        const { product_id, quantity } = request.body;
        const user_id = request.user_id;

        const createCartItemsService = new UpdateCartItemsService();

        const cartItems = await createCartItemsService.execute({ user_id, product_id, quantity });

        return response.json(cartItems);
    }
}

export { UpdateCartItemsController }