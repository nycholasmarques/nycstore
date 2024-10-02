import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
    async handle(request: Request, response: Response) {
        const product_id = request.params.id;

        const listProductService = new ListProductService();

        const product = await listProductService.execute({ product_id });

        return response.json(product);
    }
}

export { ListProductController }