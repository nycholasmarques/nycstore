import { Request, Response } from "express";    
import { ListCartItemsService } from "../../services/cartItems/ListCartItemsService";

class ListCartItemsController {
    async handle(request: Request, response: Response) {

        const user_id = request.user_id;

        const listCartItemsService = new ListCartItemsService();

        const cartItems = await listCartItemsService.execute({ user_id });

        return response.json(cartItems);
    }
}

export { ListCartItemsController }