import { Router } from 'express';
import { body } from 'express-validator';
import { CreateOrderController } from '../controllers/orders/CreateOrderController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { ListAllOrderController } from '../controllers/orders/ListAllOrderController';
import { ListOrderController } from '../controllers/orders/ListOrderController';
import { UpdateOrderController } from '../controllers/orders/UpdateOrderController';
import { DeleteOrderController } from '../controllers/orders/DeleteOrderController';
import { ensureHasRole } from '../middlewares/ensureHasRole';

const router = Router();

router.post('/', isAuthenticated, ensureHasRole('customer') , [
    body('status').isString().notEmpty().withMessage('O status precisa ser preenchido'),
], new CreateOrderController().handle)

router.get('/', isAuthenticated, ensureHasRole('customer'), new ListAllOrderController().handle)

router.get('/:id', isAuthenticated, ensureHasRole('customer'), new ListOrderController().handle)

router.patch('/:id', isAuthenticated, ensureHasRole('adiministrator'), [
    body('status').isString().notEmpty().withMessage('O status precisa ser preenchido'),
], new UpdateOrderController().handle)

router.delete('/:id', isAuthenticated, ensureHasRole('customer'), new DeleteOrderController().handle)

export default router