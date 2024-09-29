import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../prisma";

function ensureHasRole(roleName: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user_id = req.user_id;

        const userWithRole = await prismaClient.userRole.findFirst({
            where: {
                user_id: user_id,
            }, select: {
                role: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if(!userWithRole) {
            return res.status(401).json({
                error: "Acesso negado"
            })
        }

        if( userWithRole?.role.name === 'administrator' ) {
            return next();
        }

        if ( roleName !== userWithRole?.role.name ) {
            return res.status(401).json({
                error: "Acesso negado"
            })
        }

        return next();
    }
}

export { ensureHasRole }