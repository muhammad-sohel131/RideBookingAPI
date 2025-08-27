import { JwtPayload } from "jsonwebtoken";
import { IRide, RideStatus } from "./ride.interface";
import { Ride } from "./ride.model";
import { Types } from "mongoose";
import { Role } from "../user/user.interface";
import { actionValidity } from "../../utils/actionValidity";
import AppError from "../../helpers/AppError";
import httpStatus from "http-status-codes";
import { Driver } from "../drivers/driver.model";
import { getDistanceInKm, Location } from "../../utils/getDistanceInKm";
import { User } from "../user/user.model";
import { STATUS } from "../drivers/driver.interface";

const createRide = async (userId: Types.ObjectId, payload: Partial<IRide>) => {
  const user = await User.findById(userId)
  if(!user){
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found!')
  }
  if(user.isBlocked){
    throw new AppError(httpStatus.BAD_REQUEST, 'Your account is blocked.')
  }

  if(user.currentRide){
    throw new AppError(httpStatus.BAD_REQUEST, "You can not request for multiple rides at the same time.")
  }

  const distance = getDistanceInKm(
    payload.pickupLocation as Location,
    payload.dropLocation as Location
  );
  payload.fare = 50 * distance;
  payload.rider = userId;
  const ride = await Ride.create(payload);
  await User.findByIdAndUpdate(userId, {
    currentRide: ride._id
  })
  return ride;
};

const getRides = async () => {
  const rides = await Ride.find();
  return rides;
};

const getRequestedRides = async () => {
  const rides = await Ride.find({status: RideStatus.REQUESTED});
  return rides;
};

const getMyRides = async (userId: string) => {
  const myRides = await Ride.find({rider: userId})

  return myRides
}

const updateRideStatus = async ({
  rideId,
  user,
  payload,
}: {
  rideId: string;
  user: JwtPayload;
  payload: Partial<IRide>;
}) => {
  const role = user.role;
  const ride = await Ride.findById(rideId);

  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  const currentRideStatus = ride.status as RideStatus;
  const newRideStatus = payload.status as RideStatus;

  const isValidAction = actionValidity(currentRideStatus, newRideStatus, role);
  if (!isValidAction) {
    throw new AppError(httpStatus.BAD_REQUEST, "It is not a valid request");
  }

  if (role === Role.RIDER) {
    if (ride.rider.toString() !== user.userId) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You are not allowed for this action."
      );
    }
  }

  if (role === Role.RIDER && newRideStatus === RideStatus.CANCELLED) {
    const updatedRide = await Ride.findByIdAndUpdate(
      rideId,
      { status: RideStatus.CANCELLED, cancelledAt: Date.now() },
      { new: true }
    );

    await User.findByIdAndUpdate(user.userId, {
      currentRide: null
    })

    return updatedRide;
  }


  const driver = await Driver.findOne({ user: user.userId });
  if (!driver) {
    throw new AppError(httpStatus.NOT_FOUND, "Driver not found");
  }

  if (newRideStatus === RideStatus.ACCEPTED) {
    if(driver.status === STATUS.PENDING){
      throw new AppError(httpStatus.BAD_REQUEST, "You account has not been approved yet.")
    }
    if(driver.status === STATUS.SUSPENDED){
      throw new AppError(httpStatus.BAD_REQUEST, "You account has not been SUSPENDED.")
    }
    if (driver.currentRide) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You are not allowed to accept multiple rides at the same time."
      );
    }

    await Driver.findByIdAndUpdate(driver._id, { currentRide: ride._id, isAvailable: false });
    await Ride.findByIdAndUpdate(rideId, {
      driver: user.userId,
      status: RideStatus.ACCEPTED,
      acceptedAt: Date.now(),
    });
  }

  if (newRideStatus === RideStatus.CANCELLED) {
    if (ride.driver?.toString() !== user.userId) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You are not allowed for this action."
      );
    }
    await Driver.findByIdAndUpdate(driver._id, { currentRide: null, isAvailable: true });
    await Ride.findByIdAndUpdate(rideId, {
      status: RideStatus.CANCELLED,
      cancelledAt: Date.now(),
    });
    await User.findByIdAndUpdate(ride.rider, {
      currentRide: null
    })
  }

  if (newRideStatus === RideStatus.COMPLETED) {
    if (ride.driver?.toString() !== user.userId) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You are not allowed for this action."
      );
    }
    await Driver.findByIdAndUpdate(user.userId, { currentRide: null, isAvailable: true });
    await Ride.findByIdAndUpdate(rideId, {
      status: RideStatus.COMPLETED,
      completedAt: Date.now(),
    });
    await User.findByIdAndUpdate(ride.rider, {
      currentRide: null
    })
  }

  if (newRideStatus === RideStatus.STARTED) {
    if (ride.driver?.toString() !== user.userId) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "You are not allowed for this action."
      );
    }
    await Ride.findByIdAndUpdate(rideId, {
      status: RideStatus.STARTED,
      startedAt: Date.now(),
    });
  }

  // Return updated ride
  const updatedRide = await Ride.findById(rideId).populate("driver");
  return updatedRide;
};

export const rideService = {
  createRide,
  getRides,
  updateRideStatus,
  getRequestedRides,
  getMyRides
};
