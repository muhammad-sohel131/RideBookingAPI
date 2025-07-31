import { Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const route = Router()

route.get('/', userController.getAllUsers)
route.post('/register', userController.createUser)
route.patch('/status/:userId', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userController.changeUserStatus)
export const userRoutes = route