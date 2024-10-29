import { Router } from "express";
import { productController } from "../controller/productController";
import authMiddleware from "../middlewares/authMiddlewares";

const controller = productController
const productRouter = Router()

//GET
productRouter.get('/', controller.getAllProduct)
productRouter.get('/:id', controller.getProductId)

//POST
productRouter.post('/', authMiddleware, controller.createProduct)

//DELETE
productRouter.delete('/:id', authMiddleware, controller.deleteProduct)

//UPDATE
productRouter.put('/:id', authMiddleware, controller.updateProduct)

export default productRouter