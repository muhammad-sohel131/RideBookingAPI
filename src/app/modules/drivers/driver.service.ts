import AppError from "../../helpers/AppError";
import { User } from "../user/user.model";
import { IDriver } from "./driver.interface";
import { Driver } from "./driver.model";
import httpStatus from 'http-status-codes'

const registerDriver = async(userId: string, payload: Partial<IDriver>) => {
    const {
      licenseNumber,
      vehicleType,
      vehicleModel,
      vehiclePlate,
      location
    } = payload;

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "Register as User before a driver")
    }

    // Check if already a driver
    const existingDriver = await Driver.findOne({ userId });
    if (existingDriver) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User is already registered as a driver')
    }

    // Create driver profile
    const driver = await Driver.create({
      user: userId,
      licenseNumber,
      vehicleType,
      vehicleModel,
      vehiclePlate,
      location
    });

    return driver
}

const getAllDrivers = async() => {
    const drivers = await Driver.find().populate({
        path: 'user',
        select: 'name phone'
    })

    return drivers
}

const updateDriver = async(userId:string, payload: Partial<IDriver>) => {
  const updatedDriver = await Driver.findByIdAndUpdate(userId, payload, {
    new: true
  })

  return updatedDriver
}


export const driverService = {
    registerDriver,
    getAllDrivers,
    updateDriver
}