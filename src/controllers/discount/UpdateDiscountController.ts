import { Request, Response } from "express"; 
import { validationResult } from "express-validator";
import { UpdateDiscountService } from "../../services/discount/UpdateDiscountService";

class UpdateDiscountController {

    async handle(request: Request, response: Response) {
        const { name, description, value, discount_type } = request.body;
        const { id } = request.params;

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array()[0].msg });  
        }

        if ( discount_type !== "percentage" && discount_type !== "fixed") {
            throw new Error("Invalid discount type, must be 'percentage' or 'fixed'");
        }

        const updateDiscountService = new UpdateDiscountService();

        const discount = await updateDiscountService.execute({ name, description, value, discount_type, id });

        return response.json(discount);

    }
}

export { UpdateDiscountController };