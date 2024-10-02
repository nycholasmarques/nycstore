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

router.post('/', [
    body('name').isString().notEmpty().withMessage('Nome precisa ser preenchido'),
    body('description').isString().notEmpty().withMessage('Descrição precisa ser preenchida'),
    body('price').isNumeric().notEmpty().withMessage('Preço precisa ser preenchido'),
    body('stock_quantity').isNumeric().notEmpty().withMessage('Quantidade precisa ser preenchida'),	
], upload.single('file'), new CreateProductController().handle)

router.get('/:id', new ListProductController().handle)

router.get('/', new ListAllProductController().handle)

router.put('/', [
    body('name').isString().notEmpty().withMessage('Nome precisa ser preenchido'),
    body('description').isString().notEmpty().withMessage('Descrição precisa ser preenchida'),
    body('price').isNumeric().notEmpty().withMessage('Preço precisa ser preenchido'),
    body('stock_quantity').isNumeric().notEmpty().withMessage('Quantidade precisa ser preenchida'),	
], upload.single('file'), new UpdateProductController().handle)

router.delete('/', new DeleteProductController().handle)

export default router