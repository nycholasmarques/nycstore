import { Router } from 'express';
import { body } from 'express-validator';
import { CreateRoleController } from '../controllers/role/CreateRoleController';
import { ListRoleController } from '../controllers/role/ListRoleController';
import { RemoveRoleController } from '../controllers/role/RemoveRoleController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { ensureHasRole } from '../middlewares/ensureHasRole';

const router = Router();

router.post('/', isAuthenticated, ensureHasRole('administrator'), [
    body('name').isString().notEmpty().withMessage('Nome precisa ser preenchido')
], new CreateRoleController().handle);

router.get('/', isAuthenticated, ensureHasRole('administrator'), new ListRoleController().handle)

router.delete('/', isAuthenticated, ensureHasRole('administrator'), new RemoveRoleController().handle)

export default router