import { prismaClient } from "../../prisma";

interface CartItemsRequest {
    user_id: string;
}

class ListCartItemsService {
    async execute({ user_id }: CartItemsRequest) {
        const cartItems = await prismaClient.cartItems.findMany({
            where: {
                user_id: user_id
            }
        })

        return cartItems
    }
}

export { ListCartItemsService }