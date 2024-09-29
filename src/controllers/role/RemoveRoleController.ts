import { Request, Response } from "express";  
import { RemoveRoleService } from "../../services/role/RemoveRoleService";

class RemoveRoleController {
    async handle(req: Request, res: Response) {
        const id = req.query.id;

        const removeRoleService = new RemoveRoleService();

        const role = await removeRoleService.execute({ id : Number(id) });

        return res.status(200).json({
            success : "Role deleted with success",
        });
    }
}

export { RemoveRoleController }