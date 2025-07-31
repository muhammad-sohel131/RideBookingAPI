import { Request, Response } from 'express';
import { driverService } from './driver.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status-codes'
import { JwtPayload } from 'jsonwebtoken';
import { catchAsync } from '../../utils/catchAsync';

const registerDriver = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as JwtPayload
    const registeredDriver = await driverService.registerDriver(user.userId, req.body)

    sendResponse(res, {
        success: true,
        message: "Driver registration is successful.",
        statusCode: httpStatus.CREATED,
        data: registeredDriver
    })
})

const getAllDrivers = catchAsync(async (req: Request, res: Response) => {
    const drivers = await driverService.getAllDrivers()

    sendResponse(res, {
        message: "Retrieved All Drivers",
        success: true,
        statusCode: httpStatus.OK,
        data: drivers
    })
})

const updateDriver = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId
    const updatedDriver = await driverService.updateDriver(userId, req.body)

    sendResponse(res, {
        message: "Driver's info updated.",
        success: true,
        statusCode: httpStatus.OK,
        data: updatedDriver
    })
})
export const driverController = {
    registerDriver,
    getAllDrivers,
    updateDriver
}
