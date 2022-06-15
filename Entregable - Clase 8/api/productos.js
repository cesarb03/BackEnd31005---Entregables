import { Router } from 'express'
const router = Router()
import {updateProduct, deleteProduct, allArray, addProduct, viewProduct} from'../controllers/mainClass.js'


//ROUTES
////Devuelve todos los productos
router.get('/productos', allArray)
//Recibe y agrega un producto
router.post('/productos', addProduct)
//Busca y devuelve producto segun su id
router.get('/productos/:id', viewProduct)
//Recibe y actualiza un producto segun su id
router.put('/productos/:id', updateProduct)
//Elimina un producto segun su id
router.delete('/productos/:id', deleteProduct)

export default router