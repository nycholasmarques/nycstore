import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CreateCommentService } from "../../services/comments/CreateCommentService";

class CreateCommentController {

    async handle(request: Request, response: Response) {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array()[0].msg });  
        }

        const { order_id, product_id , comment, rating } = request.body;
        const { user_id } = request;

        if ((rating >= 1 && rating <= 10) == false) {
            return response.status(400).json({ error: "A avaliação precisa ser entre 1 e 10" });
        }

        const createCommentService = new CreateCommentService();

        const commentCreated = await createCommentService.execute({ user_id, product_id, order_id, comment, rating });

        return response.json(commentCreated);
    }
}

export { CreateCommentController }