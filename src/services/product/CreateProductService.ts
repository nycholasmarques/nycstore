import { prismaClient } from "../../prisma";

interface ProductRequest {
    name: string;
    description: string;
    price: number;
    image: string;
    stock_quantity: number;
}

class CreateProductService {
    async execute({ name, description, price, image, stock_quantity }: ProductRequest) {    
        const product = await prismaClient.products.create({
            data: {
                name: name,
                description: description,
                price: Number(price),
                image_url: image,
                stock_quantity: Number(stock_quantity)
            }
        })

        return product;
    }
}

export { CreateProductService }