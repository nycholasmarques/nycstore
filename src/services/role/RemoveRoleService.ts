import { prismaClient } from "../../prisma"

interface RoleRequest {
    id: number
}

class RemoveRoleService {

    async execute({ id }: RoleRequest) {

        const roleExists = await prismaClient.role.findFirst({
            where: {
                id: id
            }
        })

        if (!roleExists) {
            throw new Error("Role not found")
        }

        const role = await prismaClient.role.delete({
            where: {
                id: id
            }
        })
        return role
    }
}

export { RemoveRoleService }