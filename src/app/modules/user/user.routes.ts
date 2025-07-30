import { Request, Response, Router } from "express";
import { userController } from "./user.controller";

const route = Router()

route.get('/', userController.getAllUsers)
route.post('/create', userController.createUser)
route.patch('/status/:userId', userController.changeUserStatus)
export const userRoutes = route