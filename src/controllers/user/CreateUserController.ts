import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';
import { validationResult } from 'express-validator';


class CreateUserController {
    async handle (req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });  
        }

        const { name, email, password } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ name, email, password });

        return res.json(user);
    }
}

export { CreateUserController }