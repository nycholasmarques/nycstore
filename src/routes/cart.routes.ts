import { Router } from 'express';
import { body } from 'express-validator';
import { CreateCartItemsController } from '../controllers/cartItems/CreateCartItemsController';
import { ListCartItemsController } from '../controllers/cartItems/ListCartItemsController';
import { UpdateCartItemsController } from '../controllers/cartItems/UpdateCartItemsController';
import { DeleteCartItemsController } from '../controllers/cartItems/DeleteCartItemsController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();

router.post('/', isAuthenticated, [
    body('user_id').isString().notEmpty().withMessage('O usuario precisa ser colocado'),
    body('product_id').isString().notEmpty().withMessage('O produto precisa ser colocado'),
    body('quantity').isNumeric().notEmpty().withMessage('A quantidade precisa ser preenchida'),
], new CreateCartItemsController().handle)

router.get('/:id', isAuthenticated, new ListCartItemsController().handle)

router.patch('/', isAuthenticated, [
    body('user_id').isString().notEmpty().withMessage('O usuario precisa ser colocado'),
    body('product_id').isString().notEmpty().withMessage('O produto precisa ser colocado'),
    body('quantity').isNumeric().notEmpty().withMessage('A quantidade precisa ser preenchida'),
], new UpdateCartItemsController().handle)

router.delete('/:id', isAuthenticated, new DeleteCartItemsController().handle)

export default router
