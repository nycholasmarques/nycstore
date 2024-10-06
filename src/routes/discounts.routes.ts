import { Router } from 'express';
import { body } from 'express-validator';
import { CreateDiscountController } from '../controllers/discount/CreateDiscountController';
import { ListAllDiscountController } from '../controllers/discount/ListAllDiscountController';
import { ListDiscountController } from '../controllers/discount/ListDiscountController';
import { UpdateDiscountController } from '../controllers/discount/UpdateDiscountController';
import { DeleteDiscountController } from '../controllers/discount/DeleteDiscountController';

const router = Router();

router.post('/', [
    body('name').isString().notEmpty().withMessage('Nome precisa ser preenchido'),
    body('description').isString().optional().withMessage('Descrição precisa ser preenchida'),
    body('value').isNumeric().notEmpty().withMessage('Valor precisa ser preenchido'),
    body('discount_type').isString().notEmpty().withMessage('Tipo de desconto precisa ser preenchido'),
], new CreateDiscountController().handle)

router.get('/', new ListAllDiscountController().handle)

router.get('/:id', new ListDiscountController().handle)

router.patch('/:id', [
    body('name').isString().notEmpty().withMessage('Nome precisa ser preenchido'),
    body('description').isString().optional().withMessage('Descrição precisa ser preenchida'),
    body('value').isNumeric().notEmpty().withMessage('Valor precisa ser preenchido'),
    body('discount_type').isString().notEmpty().withMessage('Tipo de desconto precisa ser preenchido'),
], new UpdateDiscountController().handle)

router.delete('/:id', new DeleteDiscountController().handle)

export default router 