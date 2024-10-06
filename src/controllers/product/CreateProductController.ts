import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { validationResult } from "express-validator";

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, description, price, stock_quantity, categories, discount_id } = request.body;

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });  
        }

        const categoriesArray = categories.split(",");
        
        const createProductService = new CreateProductService();

        if (!request.file) {
            throw new Error("Error to upload file");
        } else {
            const { originalname, filename: image } = request.file;

            const product = await createProductService.execute({
                 name, description, price, image, stock_quantity, categoriesArray, discount_id
            })

            return response.json(product);
        }
    }
} 

export { CreateProductController }