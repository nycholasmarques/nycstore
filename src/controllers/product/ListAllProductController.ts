import { Request, Response } from "express";
import { ListAllProductService } from "../../services/product/ListAllProductService";

class ListAllProductController {
    async handle(request: Request, response: Response) {
        const listAllProductService = new ListAllProductService();
        const products = await listAllProductService.execute();
        return response.json(products);
    }
}

export { ListAllProductController }