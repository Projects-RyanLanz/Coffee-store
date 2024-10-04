import { Router } from "express";
import { productController } from "../controller/productController";

const controller = productController
const productRouter = Router()

//GET
productRouter.get('/', controller.getAllProduct)
productRouter.get('/:id', controller.getProductId)

//POST
productRouter.post('/', controller.createProduct)

//UPDATE
productRouter.put('/:id', controller.updateProduct)

export default productRouter