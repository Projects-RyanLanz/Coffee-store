import { Router } from "express";
import { UserController } from "../controller/userController";
import authMiddleware from "../middlewares/authMiddlewares";
import { login } from "../controller/authController";

const userRouter = Router()

userRouter.post('/login', login)

//GET
userRouter.get('/',authMiddleware, UserController.getAllUser)
userRouter.get('/a', UserController.getUserPrivilege)
userRouter.get('/:id', UserController.getUserId)

//POST
userRouter.post('/', UserController.createUser)

//DELETE
userRouter.delete('/:id', UserController.deleteUser)

//PUT
userRouter.put('/:id', UserController.editUser)

export default userRouter;