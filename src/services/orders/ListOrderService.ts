import { prismaClient } from "../../prisma";

interface OrderRequest {
    user_id: string
    order_id: string
}

class ListOrderService {
    async execute({ user_id, order_id }: OrderRequest) {
        const order = await prismaClient.order.findFirst({
            where: {
                id: Number(order_id),
                user_id: user_id
            },
            include: {
                orderItems: true
            }
        })

        return order;
    }
}

export { ListOrderService }