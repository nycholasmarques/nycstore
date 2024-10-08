import { Request, Response } from "express";
import { ListAllOrderService } from "../../services/orders/ListAllOrderService";

class ListAllOrderController {
    async handle(request: Request, response: Response) {
        const { user_id } = request;
        const listAllOrderService = new ListAllOrderService();
        const orders = await listAllOrderService.execute({ user_id});
        return response.json(orders);
    }
}

export { ListAllOrderController }