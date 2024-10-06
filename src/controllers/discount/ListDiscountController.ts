import { Request, Response } from "express";
import { ListDiscountService } from "../../services/discount/ListDiscountController";

class ListDiscountController {
    async handle(request: Request, response: Response) {
        const discount_id = request.params.id;

        const listDiscountService = new ListDiscountService();

        const discount = await listDiscountService.execute({ discount_id });

        return response.json(discount);
    }
}

export { ListDiscountController }