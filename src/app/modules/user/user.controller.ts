import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { userServices } from "./user.services"

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await userServices.getAllUsers()
    
    sendResponse(res, {
        success: true,
        message: "Retrieved All users!",
        statusCode: 200,
        data: users
    })
})

const createUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const createdUser = await userServices.createUser(payload)
    
    sendResponse(res, {
        success: true,
        message: "Created Rider Account",
        statusCode: 201,
        data: createdUser
    })
})

const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId
    const payload = req.body
    const updatedUser = await userServices.changeUserStatus(userId, payload)
    
    sendResponse(res, {
        success: true,
        message: "Created Rider Account",
        statusCode: 200,
        data: updatedUser
    })
})
export const userController = {
    getAllUsers,
    createUser,
    changeUserStatus
}