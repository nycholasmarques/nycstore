import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";
import { validationResult } from "express-validator";

class UpdateProductController {
    async handle(request: Request, response: Response) {
        const product_id = request.query.id as string;
        const { name, description, price, stock_quantity, categories, discount_id } = request.body;

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array()[0].msg });  
        }

        let categoriesArray: string[] = [];
        if (categories) {
            categoriesArray = typeof categories === 'string' ? categories.split(",") : categories;
        }

        const updateProductService = new UpdateProductService();

        const image = request.file ? request.file.filename : undefined;

        const product = await updateProductService.execute({
            name, description, price, image, stock_quantity, product_id, categoriesArray, discount_id
        })

        return response.json(product);
    }
}

export { UpdateProductController }