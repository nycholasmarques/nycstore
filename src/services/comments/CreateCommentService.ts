import { prismaClient } from "../../prisma"

interface CommentRequest {
    user_id: string;
    product_id: string;
    order_id: string;
    comment: string;
    rating: number;
}

class CreateCommentService {

    async execute({ user_id, order_id, product_id, comment, rating }: CommentRequest) {
        const order = await prismaClient.order.findFirst({
            where: {
                id: Number(order_id),
                user_id: user_id,
            },
            include: {
                orderItems: true
            }
        })

        if (!order) {
            throw new Error("Pedido não encontrado")
        }

        if (order.status !== "Concluído") {
            throw new Error("Após o pedido ser finalizado, você pode avaliar")
        }

        const productIds = order.orderItems
            .filter(item => item.product_id === Number(product_id))
            .map(item => item.product_id);

        if (!productIds.includes(Number(product_id))) {
            throw new Error("Você não fez nenhum pedido com esse produto!");
        }

        const commentAlreadyExists = await prismaClient.review.findFirst({
            where: {
                product_id: Number(product_id),
                user_id: user_id
            }
        })

        if (commentAlreadyExists) {
            throw new Error("Voce ja avaliou esse item")
        }

        const comments = await prismaClient.review.create({
            data: {
                user_id: user_id,
                product_id: Number(product_id),
                comment: comment,
                rating: rating
            }
        })
        return comments

    }
}

export { CreateCommentService }