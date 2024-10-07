import { Router } from "express";
import { UserController } from "../controller/userController";

const userRouter = Router()

//GET
userRouter.get('/', UserController.getAllUser)
userRouter.get('/:id', UserController.getUserId)

//POST
userRouter.post('/', UserController.createUser)

//DELETE
userRouter.delete('/:id', UserController.deleteUser)

//PUT
userRouter.put('/:id', UserController.editUser)

export default userRouter;