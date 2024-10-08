import { prismaClient } from "../../prisma";

interface OrderRequest {
    order_id: string
}

class DeleteOrderService {
    async execute ({ order_id } : OrderRequest) {
        const orderAlreadyExists = await prismaClient.order.findFirst({
            where: {
                id: Number(order_id),
            }
        })

        if (!orderAlreadyExists) {
            throw new Error("Order not found")
        }

        if(orderAlreadyExists.status !== "Pendente") {
            throw new Error("O pedido não pode ser cancelado")
        }

        await prismaClient.orderItems.deleteMany({
            where: {
                order_id: Number(order_id),
            }
        })

        const order = await prismaClient.order.delete({
            where: {
                id: orderAlreadyExists.id,
            }
        })

        return order;
    }
}

export { DeleteOrderService }