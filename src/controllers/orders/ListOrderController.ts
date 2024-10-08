import { Request, Response } from "express";
import { ListOrderService } from "../../services/orders/ListOrderService";

class ListOrderController {
    async handle(request: Request, response: Response) {
        const order_id = request.params.id;
        const { user_id } = request;
        const listAllOrderService = new ListOrderService();
        const orders = await listAllOrderService.execute({ user_id, order_id });
        return response.json(orders);
    }
}

export { ListOrderController }