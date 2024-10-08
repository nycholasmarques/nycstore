import { Request, Response } from "express";
import { CreateOrderService } from "../../services/orders/CreateOrderService";

class CreateOrderController {
    async handle(request: Request, response: Response) {
        const { status } = request.body;
        const user_id = request.user_id;

        const createOrderService = new CreateOrderService();

        const order = await createOrderService.execute({ status, user_id });

        return response.json(order);
    }
}

export { CreateOrderController }