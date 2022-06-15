import { Router } from 'express'
const router = Router()
import {mainController, addNewProduct, singleProduct, updateProduct, deleteProduct} from'../controllers/mainClass.js'


//ROUTES
////Devuelve todos los productos
router.get('/', mainController)
//Recibe y agrega un producto
router.post('/', addNewProduct)
//Busca y devuelve producto segun su id
router.get('/:id', singleProduct)
//Recibe y actualiza un producto segun su id
router.put('/:id', updateProduct)
//Elimina un producto segun su id
router.delete('/:id', deleteProduct)

export default router