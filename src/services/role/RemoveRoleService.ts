import { prismaClient } from "../../prisma"

interface RoleRequest {
    id: number
}

class RemoveRoleService {

    async execute({ id }: RoleRequest) {
        const role = await prismaClient.role.delete({
            where: {
                id: id
            }
        })
        return role
    }
}

export { RemoveRoleService }