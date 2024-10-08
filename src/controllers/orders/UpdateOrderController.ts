import { Request, Response } from "express";
import { UpdateOrderService } from "../../services/orders/UpdateOrderService";

class UpdateOrderController {
    async handle(request: Request, response: Response) {
        const order_id = request.params.id;
        const { status } = request.body;
        const user_id = request.user_id;

        const updateOrderService = new UpdateOrderService();

        const order = await updateOrderService.execute({ status, user_id, order_id });

        return response.json(order);
    }
}

export { UpdateOrderController }