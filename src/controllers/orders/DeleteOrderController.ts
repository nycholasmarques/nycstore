import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/orders/DeleteOrderService";

class DeleteOrderController {
    async handle(request: Request, response: Response) {
        const order_id = request.params.id;
        const deleteOrderService = new DeleteOrderService();

        const order = await deleteOrderService.execute({ order_id });

        return response.json({
            success: "Order deleted with success",
        }).status(200);
    }
}

export { DeleteOrderController }