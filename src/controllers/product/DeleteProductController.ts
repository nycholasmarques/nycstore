import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {

    async handle(request: Request, response: Response) {
        const product_id = request.query.id as string;

        const deleteProductService = new DeleteProductService();

        const product = await deleteProductService.execute({ product_id });

        return response.json(product);
    }
}

export { DeleteProductController }