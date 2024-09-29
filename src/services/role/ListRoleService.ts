import { prismaClient } from "../../prisma";

class ListRoleService {
    async execute() {
        const roles = await prismaClient.role.findMany();

        return roles;
    }
}

export { ListRoleService }