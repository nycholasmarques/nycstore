import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";

class UpdateProductController {
    async handle(request: Request, response: Response) {
        const product_id = request.query.id as string;
        const { name, description, price, stock_quantity, categories } = request.body;

        let categoriesArray: string[] = [];
        if (categories) {
            categoriesArray = typeof categories === 'string' ? categories.split(",") : categories;
        }

        const updateProductService = new UpdateProductService();

        const image = request.file ? request.file.filename : undefined;

        const product = await updateProductService.execute({
            name, description, price, image, stock_quantity, product_id, categoriesArray
        })

        return response.json(product);
    }
}

export { UpdateProductController }