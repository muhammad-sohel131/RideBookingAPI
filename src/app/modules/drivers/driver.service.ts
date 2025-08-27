import { Types } from "mongoose";
import AppError from "../../helpers/AppError";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { IDriver, STATUS } from "./driver.interface";
import { Driver } from "./driver.model";
import httpStatus from "http-status-codes";
import { Ride } from "../ride/ride.model";
import { RideStatus } from "../ride/ride.interface";

const registerDriver = async (userId: string, payload: Partial<IDriver>) => {
  const { licenseNumber, vehicleType, vehicleModel, vehiclePlate, location } =
    payload;

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Register as User before a driver"
    );
  }

  if (user.role !== Role.RIDER) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only A normal user can be driver."
    );
  }

  // Check if already a driver
  const existingDriver = await Driver.findOne({ user: userId });

  if (existingDriver) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User is already registered as a driver"
    );
  }

  // Create driver profile
  const driver = await Driver.create({
    user: userId,
    licenseNumber,
    vehicleType,
    vehicleModel,
    vehiclePlate,
    location,
  });

  return driver;
};

const getAllDrivers = async () => {
  const drivers = await Driver.find().populate({
    path: "user",
    select: "name phone",
  });

  return drivers;
};
const getMyEarnings = async(userId: string) => {
  const earningsHistory = await Ride.find({
    driver: userId,
    status: RideStatus.COMPLETED
  })

  return earningsHistory
}
const getRequestedDrivers = async () => {
  const drivers = await Driver.find({ status: STATUS.PENDING }).populate({
    path: "user",
    select: "name phone",
  });

  return drivers;
};

const updateDriver = async (userId: string, payload: Partial<IDriver>) => {
  const updatedDriver = await Driver.findByIdAndUpdate(userId, payload, {
    new: true,
  });

  if (updatedDriver?.status === STATUS.APPROVED) {
    await User.findByIdAndUpdate(updatedDriver?.user, {
      role: Role.DRIVER,
    });
  } else {
    await User.findByIdAndUpdate(updatedDriver?.user, {
      role: Role.RIDER,
    });
  }

  return updatedDriver;
};

const approveDriver = async (userId: string) => {
  const updatedDriver = await Driver.findOneAndUpdate(
    {
      user: userId
    },
    {
      status: STATUS.APPROVED,
      isAvailable: true
    },
    {
      new: true,
    }
  );

  if (!updatedDriver) {
    throw new AppError(httpStatus.NOT_FOUND, "Did not made any request by the user to be a rider.")
  }

  await User.findByIdAndUpdate(updatedDriver.user, {
    role: Role.DRIVER,
  });

  return updatedDriver;
};

export const driverService = {
  registerDriver,
  getAllDrivers,
  updateDriver,
  getRequestedDrivers,
  approveDriver,
  getMyEarnings
};
