import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";
import { validationResult } from "express-validator";

class CreateCategoryController {
    async handle(request: Request, response: Response) {
        const { name } = request.body;

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array()[0].msg });  
        }

        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute({ name });

        return response.json(category);
    }
}

export { CreateCategoryController }