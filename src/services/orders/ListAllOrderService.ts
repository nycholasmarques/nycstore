import { prismaClient } from "../../prisma";

interface OrderRequest {
    user_id: string
}

class ListAllOrderService {
    async execute({ user_id} : OrderRequest) {

        const orders = await prismaClient.order.findMany({
            where: {
                user_id: user_id
            }
        })

        return orders
    }
}

export { ListAllOrderService }