import { Router } from 'express';


import userRoutes from './users.routes';
import rolesRoutes from './roles.routes';
import productsRoutes from './products.routes';
import categoriesRoutes from './categories.routes';
import discountsRoutes from './discounts.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/roles', rolesRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/discounts', discountsRoutes);


export { router }