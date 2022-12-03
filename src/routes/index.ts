import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import "reflect-metadata"
const router =  Router();


router.use("/categories", categoriesRoutes);
router.use('/specifications', specificationRoutes);

export { router }