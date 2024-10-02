import { Request, Response } from "express";
import { UpdateProductService } from "../../services/product/UpdateProductService";

class UpdateProductController {
    async handle(request: Request, response: Response) {
        const product_id  = request.query.id as string;
        const { name, description, price, stock_quantity } = request.body;

        const updateProductService = new UpdateProductService();

        if (!request.file) {
            throw new Error("Error to upload file");
        } else {
            const { originalname, filename: image } = request.file;

            const product = await updateProductService.execute({
                 name, description, price, image, stock_quantity, product_id
            })

            return response.json(product);
        }
    }
}

export { UpdateProductController }