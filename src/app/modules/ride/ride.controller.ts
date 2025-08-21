import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes'
import { rideService } from "./ride.service";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../user/user.interface";
import AppError from "../../helpers/AppError";

const createRide = catchAsync(async(req: Request, res: Response) => {
    const user = req.user as JwtPayload
    console.log(user.role)
    const ride = await rideService.createRide(user.userId, req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'A new ride is created.',
        success: true,
        data: ride
    })
})

const getRides = catchAsync(async(req: Request, res: Response) => {
    const ride = await rideService.getRides()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Retrieved all Rides.',
        success: true,
        data: ride
    })
})

const getRequestedRides = catchAsync(async(req: Request, res: Response) => {
    const ride = await rideService.getRequestedRides()


    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Retrieved Requested Rides.',
        success: true,
        data: ride
    })
})

const updateRide = catchAsync(async(req: Request, res: Response) => {
    const rideId = req.params.rideId
    const user = req.user as JwtPayload
    const payload = req.body

    const ride = await rideService.updateRideStatus({rideId, user, payload})


    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Ride is updated.',
        success: true,
        data: ride
    })
})
export const rideController = {
    createRide,
    getRides,
    updateRide,
    getRequestedRides
}