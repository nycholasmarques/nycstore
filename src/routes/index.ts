import { Router } from 'express';
import multer from 'multer';
import uploadConfig from "../config/multer";
import userRoutes from './users.routes';
import rolesRoutes from './roles.routes';

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));

router.use('/users', userRoutes);
router.use('/roles', rolesRoutes);


export { router, upload }