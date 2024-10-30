import { Router } from "express";
import { UserController } from "../controller/userController";
import authMiddleware from "../middlewares/authMiddlewares";

import { login } from "../controller/authController";

const userRouter = Router()

 
//GET
userRouter.get('/', authMiddleware, UserController.getAllUser)
userRouter.get('/:id', authMiddleware, UserController.getUserId)
userRouter.get('/:id/order', authMiddleware, UserController.getUserOders)
//userRouter.get('/login', UserController.getUserPrivilege)

//POST
userRouter.post('/', authMiddleware, UserController.createUser)
userRouter.post('/login', UserController.getUserPrivilege)

//DELETE
userRouter.delete('/:id', authMiddleware, UserController.deleteUser)

//PUT
userRouter.put('/:id', authMiddleware, UserController.editUser)

export default userRouter;