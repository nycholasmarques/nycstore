import { Router } from 'express';


import userRoutes from './users.routes';
import rolesRoutes from './roles.routes';
import productsRoutes from './products.routes';

const router = Router();



router.use('/users', userRoutes);
router.use('/roles', rolesRoutes);
router.use('/products', productsRoutes);


export { router }