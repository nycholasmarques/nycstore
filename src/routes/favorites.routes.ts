import { Router } from 'express';
import { body } from 'express-validator';
import { CreateFavoriteController } from '../controllers/favorites/CreateFavoriteController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { ListAllFavoritesController } from '../controllers/favorites/ListAllFavoritesController';
import { DeleteFavoriteController } from '../controllers/favorites/DeleteFavoriteController';

const router = Router();

router.post('/', isAuthenticated, [
    body('product_id').isNumeric().withMessage('O id do produto precisa ser um número').notEmpty().withMessage('O produto precisa ser colocado')
], new CreateFavoriteController().handle)

router.get('/', isAuthenticated, new ListAllFavoritesController().handle)

router.delete('/:id', isAuthenticated, new DeleteFavoriteController().handle)

export default router