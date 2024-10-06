import { prismaClient } from "../../prisma";

interface ProductRequest {
    name: string;
    description: string;
    price: number;
    image: string;
    stock_quantity: number;
    categoriesArray: [];
    discount_id: number;
}

class CreateProductService {
    async execute({ name, description, price, image, stock_quantity, categoriesArray, discount_id }: ProductRequest) {   
        
        const product = await prismaClient.products.create({
            data: {
                name: name,
                description: description,
                price: Number(price),
                image_url: image,
                stock_quantity: Number(stock_quantity),
                categories: {
                    create: categoriesArray.map(categoryId => ({
                        category: {
                            connect: { id: Number(categoryId) }
                        }
                    }))
                },
                discount: {
                    connect: { id: Number(discount_id) }
                }

            }
        })

        return product;
    }
}

export { CreateProductService }