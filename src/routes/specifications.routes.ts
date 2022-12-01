import { Router } from 'express';
import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationRoutes.post('/', (req, res) => {
   const { name, description } = req.body;
   const createSpecificationService = new CreateSpecificationService(specificationsRepository);

   createSpecificationService.execute({ name, description });

   return res.status(201).json({ message: 'Specification created' });
});


export { specificationRoutes }