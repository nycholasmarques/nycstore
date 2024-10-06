import { Router } from 'express';
import { body } from 'express-validator';
import { CreateProductController } from '../controllers/product/CreateProductController';
import uploadConfig from "../config/multer";
import multer from 'multer';
import { ListAllProductController } from '../controllers/product/ListAllProductController';
import { DeleteProductController } from '../controllers/product/DeleteProductController';
import { UpdateProductController } from '../controllers/product/UpdateProductController';
import { ListProductController } from '../controllers/product/ListProductController';

const upload = multer(uploadConfig.upload('./tmp'));

const router = Router();

router.post('/',  upload.single('file'), [
    body('name').isString().notEmpty().withMessage('Nome precisa ser preenchido'),
    body('description').isString().notEmpty().withMessage('Descrição precisa ser preenchida'),
    body('price').isNumeric().notEmpty().withMessage('Preço precisa ser preenchido'),
    body('stock_quantity').isNumeric().notEmpty().withMessage('Quantidade precisa ser preenchida'),
    body('categories').isString().notEmpty().withMessage('A categoria precisa ser preenchida e ter virgulas entre as categorias'),
    body('discount_id').isString().notEmpty().withMessage('O desconto precisa ser preenchido'),
], new CreateProductController().handle)

router.get('/:id', new ListProductController().handle)

router.get('/', new ListAllProductController().handle)

router.patch('/', upload.single('file'), [
    body('name').optional().isString().withMessage('Nome precisa ser uma string'),
    body('description').optional().isString().withMessage('Descrição precisa ser uma string'),
    body('price').optional().isNumeric().withMessage('Preço precisa ser um número'),
    body('stock_quantity').optional().isNumeric().withMessage('Quantidade precisa ser um número'),
    body('discount_id').isString().notEmpty().withMessage('O desconto precisa ser preenchido'),
], new UpdateProductController().handle);

router.delete('/', new DeleteProductController().handle)

export default router