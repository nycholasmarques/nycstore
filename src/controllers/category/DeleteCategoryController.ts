import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/DeleteCategoryService";

class DeleteCategoryControlelr {
    async handle(request: Request, response: Response) {
        const category_id = request.query.category_id as string;

        const deleteCategoryService = new DeleteCategoryService();

        const category = await deleteCategoryService.execute({ category_id });

        return response.json(category);
    }
}

export { DeleteCategoryControlelr }