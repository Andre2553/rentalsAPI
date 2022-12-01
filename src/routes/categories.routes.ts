import { Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) => {
   return createCategoryController.handle(req,res);
});

categoriesRoutes.get('/', (_, res) => {
   return listCategoriesController.handle(_,res);
});

export { categoriesRoutes }