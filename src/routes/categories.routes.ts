import { Router } from 'express';
import { body } from 'express-validator';
import { CreateCategoryController } from '../controllers/category/CreateCategoryController';
import { ListCategoryController } from '../controllers/category/ListCategoryController';
import { DeleteCategoryControlelr } from '../controllers/category/DeleteCategoryController';
import { UpdateCategoryController } from '../controllers/category/UpdateCategoryController';

const router = Router();

router.post('/', [
    body('name').isString().notEmpty().withMessage('Nome precisa ser preenchido')
], new CreateCategoryController().handle)

router.get('/', new ListCategoryController().handle)

router.put('/', [
    body('name').isString().notEmpty().withMessage('Nome precisa ser preenchido')
], new UpdateCategoryController().handle)

router.delete('/', new DeleteCategoryControlelr().handle)

export default router