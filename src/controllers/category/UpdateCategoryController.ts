import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/category/UpdateCategoryService";
import { validationResult } from "express-validator";

class UpdateCategoryController {
    async handle(request: Request, response: Response) {
        const category_id = request.query.category_id as string;
        const { name } = request.body;

        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array()[0].msg });  
        }

        const updateCategoryService = new UpdateCategoryService();

        const category = await updateCategoryService.execute({ name, category_id });

        return response.json(category);
    }
}

export { UpdateCategoryController }