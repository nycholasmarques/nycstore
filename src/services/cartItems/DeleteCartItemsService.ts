import { prismaClient } from "../../prisma";

interface CartItemsRequest {
    id: string;
    user_id: string;
}

class DeleteCartItemsService {
    async execute ({ id, user_id }: CartItemsRequest) {
        const cartItemsAlreayExists = await prismaClient.cartItems.findFirst({
            where: {
                id: Number(id),
                user_id: user_id,
            }
        })

        if (!cartItemsAlreayExists) {
            throw new Error("Item do carrinho não encontrado")
        }

        const cartItems = await prismaClient.cartItems.delete({
            where: {
                id: cartItemsAlreayExists.id,
            }
        })

        return cartItems;
    }
}

export { DeleteCartItemsService }