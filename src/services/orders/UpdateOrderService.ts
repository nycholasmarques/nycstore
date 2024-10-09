import { prismaClient } from "../../prisma";

interface OrderRequest {
    order_id: string;
    user_id: string
    status: string
}

class UpdateOrderService {
    async execute({ order_id, status, user_id }: OrderRequest) {
        const orderAlreadyExists = await prismaClient.order.findFirst({
            where: {
                id: Number(order_id),
            }
        })

        if (!orderAlreadyExists) {
            throw new Error("Order not found")
        }

        const order = await prismaClient.order.update({
            where: {
                id: orderAlreadyExists.id
            },
            data: {
                status: status
            }
        })

        return order;
    }
}

export { UpdateOrderService }