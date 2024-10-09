import { prismaClient } from "../../prisma";

interface CommentRequest {
    id: number
}

class DeleteCommentService {
    async execute({ id }: CommentRequest) {

        const commentExists = await prismaClient.review.findFirst({
            where: {
                id: id
            }
        })

        if (!commentExists) {
            throw new Error("Comentário não encontrado")
        }

        const comments = await prismaClient.review.delete({
            where: {
                id: id
            }
        })

        return comments
    }
}

export { DeleteCommentService }