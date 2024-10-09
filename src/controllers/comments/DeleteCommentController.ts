import { Request, Response } from "express";
import { DeleteCommentService } from "../../services/comments/DeleteCommentService";

class DeleteCommentController {
    async handle(request: Request, response: Response) {
        const id  = Number(request.params.id);

        const deleteCommentService = new DeleteCommentService();

        const comment = await deleteCommentService.execute({ id });

        return response.json(comment);
    }
}

export { DeleteCommentController }