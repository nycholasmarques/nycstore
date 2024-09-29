import { prismaClient } from "../../prisma"

interface RoleRequest {
    name: string
}

class CreateRoleService {
    async execute({ name }: RoleRequest) {
    
        const role = await prismaClient.role.create({
            data: {
                name
            }
        });
    
        return role;
    }
}

export { CreateRoleService }