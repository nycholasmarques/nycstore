import { prismaClient } from "../../prisma";

interface discountRequest {
    name: string;
    description: string;
    value: number;
    discount_type: string;
    id: string;
}

class UpdateDiscountService {

    async execute({ name, description, value, discount_type, id }: discountRequest) {
        const discountAlreadyExists = await prismaClient.discount.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!discountAlreadyExists) {
            throw new Error("Discount not found")
        }

        const discount = await prismaClient.discount.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
                description: description,
                value: value,
                discount_type: discount_type
            }
        })

        return discount;
    }
}

export { UpdateDiscountService };