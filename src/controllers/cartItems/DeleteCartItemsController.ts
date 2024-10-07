import { Request, Response } from "express";
import { DeleteCartItemsService } from "../../services/cartItems/DeleteCartItemsService";

class DeleteCartItemsController{
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const user_id = request.user_id;
        
        const deleteCartItemsService = new DeleteCartItemsService();

        const cartItems = await deleteCartItemsService.execute({ id, user_id });

        return response.json({ sucess: "Cart item deleted with success" }).status(200);
    }
}

export { DeleteCartItemsController }