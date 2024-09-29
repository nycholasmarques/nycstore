import { Request, Response } from 'express';
import { AuthUserService } from '../../services/user/AuthUserService';
import { validationResult } from 'express-validator';

class AuthUserController {
    async handle (req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });  
        }

        const { email, password } = req.body;

        const authUserService = new AuthUserService();

        const user = await authUserService.execute({ email, password });

        return res.json(user);
    }
}

export { AuthUserController }