import { prismaClient } from "../../prisma";

interface DiscountRequest {
    id: string
}

class DeleteDiscountService {
    async execute({ id } : DiscountRequest) {
        const discountAlreadyExists = await prismaClient.discount.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!discountAlreadyExists) {
            throw new Error("Discount not found")
        }

        const discount = await prismaClient.discount.delete({
            where: {
                id: Number(id)
            }
        })

        return discount
    }
}

export { DeleteDiscountService }