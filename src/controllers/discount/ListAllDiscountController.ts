import { Request, Response } from 'express';
import { ListAllDiscountsService } from '../../services/discount/ListAllDiscountsService';

class ListAllDiscountController {
    async handle(request: Request, response: Response) {
        const listAllDiscountsService = new ListAllDiscountsService();
        const discounts = await listAllDiscountsService.execute();
        return response.json(discounts);
    }
}

export { ListAllDiscountController}