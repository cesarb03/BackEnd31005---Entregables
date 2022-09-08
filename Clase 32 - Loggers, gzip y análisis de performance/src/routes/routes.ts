import { Router } from "express";
const router = Router();
import { getFakerProducts } from "../controllers/fakerProductsController";
import { renderHome } from "../controllers/session";

//FAKER Endpoint
router.get("/products-test", getFakerProducts);

//HOME ENDPOINT
router.get("/", renderHome);

import { getAll } from "../controllers/productsControllers";

//Vinculo los endpoints con sus respectivos controllers.
router.get("/products", getAll); //Trae todo los productos.

export default router;
