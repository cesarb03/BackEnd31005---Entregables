import { Router } from "express";
const router = Router();
import {
  getForm,
  getProducts,
  addProduct,
} from "../controllers/productControllers.js";

//ROUTES
////Devuelve el listado de productos
router.get("/productos", getProducts);
//Devuelve el form donde se vargan los productos
router.get("/", getForm);
//Recibe y agrega un producto
router.post("/productos", addProduct);

export default router;
