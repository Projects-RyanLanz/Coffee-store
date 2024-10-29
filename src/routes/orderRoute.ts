import { Router } from "express";
import { orderController } from "../controller/orderController";

const orderRoute = Router();

//GET
orderRoute.get('/', orderController.getAllOrders)
orderRoute.get('/:id', orderController.getOrderId)

//POST
orderRoute.post('/', orderController.createOrder)

//DELETE
orderRoute.delete('/:id', orderController.deleteOrder)

//EDIT
orderRoute.put('/:id', orderController.editOrder)

export default orderRoute