import { prismaClient } from "../../prisma"

interface CartItemsRequest {
    user_id: string
    product_id: string
    quantity: number
}

class UpdateCartItemsService {
    async execute ({ user_id, product_id, quantity }: CartItemsRequest) {

        const cartItemsAlreayExists = await prismaClient.cartItems.findFirst({
            where: {
                user_id: user_id,
                product_id: Number(product_id)
            }
        })

        if (!cartItemsAlreayExists) {
            throw new Error("Item do carrinho não encontrado")
        }

        const cartItems = await prismaClient.cartItems.update({
            where: {
                id: cartItemsAlreayExists.id
            },
            data: {
                quantity: quantity
            }
        })

        return cartItems
        
    }
}

export { UpdateCartItemsService }