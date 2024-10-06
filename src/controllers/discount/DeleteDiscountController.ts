import { Request, Response } from "express";
import { DeleteDiscountService } from "../../services/discount/DeleteDiscountService";

class DeleteDiscountController {
    async handle(request: Request, response: Response) {
        const { id } = request.params ;

        const deleteDiscountService = new DeleteDiscountService();

        const discount = await deleteDiscountService.execute({ id });

        return response.json({
            success : "Discount deleted with success",
        });
    }

}

export { DeleteDiscountController }