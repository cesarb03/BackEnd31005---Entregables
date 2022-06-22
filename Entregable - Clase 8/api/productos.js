import { Router } from 'express'
const router = Router()
import {updateProduct, deleteProduct, allArray, addProduct, viewProduct} from'../controllers/mainClass.js'


//ROUTES
////Devuelve todos los productos
router.get('/', allArray)
//Recibe y agrega un producto
router.post('/', addProduct)
//Busca y devuelve producto segun su id
router.get('/:id', viewProduct)
//Recibe y actualiza un producto segun su id
router.put('/:id', updateProduct)
//Elimina un producto segun su id
router.delete('/:id', deleteProduct)

export default router