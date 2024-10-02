import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, description, price, stock_quantity } = request.body;

        const createProductService = new CreateProductService();

        if (!request.file) {
            throw new Error("Error to upload file");
        } else {
            const { originalname, filename: image } = request.file;

            const product = await createProductService.execute({
                 name, description, price, image, stock_quantity 
            })

            return response.json(product);
        }
    }
} 

export { CreateProductController }