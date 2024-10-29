import { Router } from "express";
import { UserController } from "../controller/userController";
import authMiddleware from "../middlewares/authMiddlewares";

import { login } from "../controller/authController";

const userRouter = Router()

 
//GET
userRouter.get('/', authMiddleware, UserController.getAllUser)
userRouter.get('/:id', UserController.getUserId)

//POST
userRouter.post('/', UserController.createUser)
userRouter.post('/login', UserController.getUserPrivilege)

//DELETE
userRouter.delete('/:id', UserController.deleteUser)

//PUT
userRouter.put('/:id', UserController.editUser)

export default userRouter;