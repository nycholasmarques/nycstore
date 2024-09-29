import { Router } from 'express';
import { body } from 'express-validator';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { AuthUserController } from '../controllers/user/AuthUserController';


const router = Router();

router.post('/', [
    body('name').isString().notEmpty().withMessage('Nome precisa ser preenchido')
    .isLength({ min: 3, max: 60 }).withMessage('Nome precisa ter entre 3 e 60 caracteres'),
    body('email').notEmpty().withMessage('Email precisa ser preenchido')
    .isEmail().withMessage('Email invalido'),
    body('password').isLength({ min: 6, max: 60 }).withMessage('Senha precisa ser entre 6 e 60 caracteres'),
    body('password').notEmpty().withMessage('Senha precisa ser preenchida')
], new CreateUserController().handle);

router.post('/login', [
    body('email').notEmpty().withMessage('Email precisa ser preenchido')
    .isEmail().withMessage('Email invalido'),
    body('password').isLength({ min: 6, max: 60 }).withMessage('Senha precisa ser entre 6 e 60 caracteres')
    .notEmpty().withMessage('Senha precisa ser preenchida')
] , new AuthUserController().handle);

export default router