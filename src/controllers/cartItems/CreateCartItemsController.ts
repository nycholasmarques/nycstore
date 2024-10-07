import { Request, Response } from "express";
import { CreateCartItemsService } from "../../services/cartItems/CreateCartItemsService";

class CreateCartItemsController {

    async handle(request: Request, response: Response) {

        const { product_id, quantity } = request.body;
        const user_id = request.user_id;

        const createCartItemsService = new CreateCartItemsService();

        const cartItems = await createCartItemsService.execute({ user_id, product_id, quantity });

        return response.json(cartItems);
    }
}

export { CreateCartItemsController }