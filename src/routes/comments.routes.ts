import { Router } from 'express';
import { body } from 'express-validator';
import { CreateCommentController } from '../controllers/comments/CreateCommentController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { ensureHasRole } from '../middlewares/ensureHasRole';
import { DeleteCommentController } from '../controllers/comments/DeleteCommentController';
import { UpdateCommentController } from '../controllers/comments/UpdateCommentController';

const router = Router();

router.post('/', isAuthenticated, [
    body('rating').isNumeric().notEmpty().withMessage('A avaliação precisa ser preenchida'),
    body('order_id').isNumeric().notEmpty().withMessage('O id do produto precisa ser um número'),
    body('product_id').isNumeric().notEmpty().withMessage('O id do produto precisa ser um número'),
    body('comment').isString().notEmpty().withMessage('Comentação precisa ser preenchida')
], new CreateCommentController().handle);

router.patch('/', isAuthenticated, [
    body('rating').isNumeric().notEmpty().withMessage('A avaliação precisa ser preenchida'),
    body('order_id').isNumeric().notEmpty().withMessage('O id do produto precisa ser um número'),
    body('product_id').isNumeric().notEmpty().withMessage('O id do produto precisa ser um número'),
    body('comment').isString().notEmpty().withMessage('Comentação precisa ser preenchida')
], new UpdateCommentController().handle);

router.delete('/:id', isAuthenticated, ensureHasRole('adiministrator') , new DeleteCommentController().handle)

export default router
