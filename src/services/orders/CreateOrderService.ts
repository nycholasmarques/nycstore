import { prismaClient } from "../../prisma";
import { ListCartItemsService } from "../cartItems/ListCartItemsService";

interface OrderRequest {
    status: string;
    user_id: string;
}

class CreateOrderService {
    async execute({ status, user_id }: OrderRequest) {

        const cartItems = await new ListCartItemsService().execute({ user_id });

        if (cartItems.length == 0) {
            throw new Error("Não há itens no carrinho para fazer o pedido.");
        }

        const product_price = await Promise.all(cartItems.map(async function (item) {
            const product = await prismaClient.products.findFirst({
                where: {
                    id: item.product_id
                }
            })
            const getValueProduct = product.price.toFixed(2)
            const total_price = item.quantity * Number(getValueProduct);

            return total_price
        }));
  
        const totalPrice = product_price.reduce((acc, item) => acc + item, 0); 

        const order = await prismaClient.order.create({
            data: {
                status: status,
                user_id: user_id,
                total_price: totalPrice
            }
        })

        await Promise.all(cartItems.map(async function (item) {
            const product = await prismaClient.products.findFirst({
                where: {
                    id: item.product_id
                }
            })
            await prismaClient.orderItems.create({
                data: {
                    order_id: Number(order.id),
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price_at_time: product.price
                }
            })
        }));

        // apagar itens do carrinho depois de efetuar o pedido

        await prismaClient.cartItems.deleteMany({
            where: {
                user_id: user_id
            }
        })

        return order;
    }
}

export { CreateOrderService }