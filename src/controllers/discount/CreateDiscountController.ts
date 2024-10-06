import { Request, Response } from "express";
import { CreateDiscountService } from "../../services/discount/CreateDiscountService";
import { validationResult } from "express-validator";

class CreateDiscountController {
    async handle(request: Request, response: Response) {
        const { name, description, value, discount_type } = request.body;

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array()[0].msg });  
        }

        if ( discount_type !== "percentage" && discount_type !== "fixed") {
            throw new Error("Invalid discount type, must be 'percentage' or 'fixed'");
        }

        const createDiscountService = new CreateDiscountService();

        const discount = await createDiscountService.execute({ name, description, value, discount_type });

        return response.json(discount);
    }
}

export { CreateDiscountController };