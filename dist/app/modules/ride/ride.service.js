"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideService = void 0;
const ride_interface_1 = require("./ride.interface");
const ride_model_1 = require("./ride.model");
const user_interface_1 = require("../user/user.interface");
const actionValidity_1 = require("../../utils/actionValidity");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const driver_model_1 = require("../drivers/driver.model");
const getDistanceInKm_1 = require("../../utils/getDistanceInKm");
const user_model_1 = require("../user/user.model");
const driver_interface_1 = require("../drivers/driver.interface");
const createRide = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, 'User is not found!');
    }
    if (user.isBlocked) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, 'Your account is blocked.');
    }
    if (user.currentRide) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You can not request for multiple rides at the same time.");
    }
    const distance = (0, getDistanceInKm_1.getDistanceInKm)(payload.pickupLocation, payload.dropLocation);
    payload.fare = 50 * distance;
    payload.rider = userId;
    const ride = yield ride_model_1.Ride.create(payload);
    yield user_model_1.User.findByIdAndUpdate(userId, {
        currentRide: ride._id
    });
    return ride;
});
const getRides = () => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_model_1.Ride.find();
    return rides;
});
const getRequestedRides = () => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_model_1.Ride.find({ status: ride_interface_1.RideStatus.REQUESTED });
    return rides;
});
const getMyRides = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const myRides = yield ride_model_1.Ride.find({ rider: userId });
    return myRides;
});
const updateRideStatus = (_a) => __awaiter(void 0, [_a], void 0, function* ({ rideId, user, payload, }) {
    var _b, _c, _d;
    const role = user.role;
    const ride = yield ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Ride not found");
    }
    const currentRideStatus = ride.status;
    const newRideStatus = payload.status;
    const isValidAction = (0, actionValidity_1.actionValidity)(currentRideStatus, newRideStatus, role);
    if (!isValidAction) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "It is not a valid request");
    }
    if (role === user_interface_1.Role.RIDER) {
        if (ride.rider.toString() !== user.userId) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not allowed for this action.");
        }
    }
    if (role === user_interface_1.Role.RIDER && newRideStatus === ride_interface_1.RideStatus.CANCELLED) {
        const updatedRide = yield ride_model_1.Ride.findByIdAndUpdate(rideId, { status: ride_interface_1.RideStatus.CANCELLED, cancelledAt: Date.now() }, { new: true });
        yield user_model_1.User.findByIdAndUpdate(user.userId, {
            currentRide: null
        });
        return updatedRide;
    }
    const driver = yield driver_model_1.Driver.findOne({ user: user.userId });
    if (!driver) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Driver not found");
    }
    if (newRideStatus === ride_interface_1.RideStatus.ACCEPTED) {
        if (driver.status === driver_interface_1.STATUS.PENDING) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You account has not been approved yet.");
        }
        if (driver.status === driver_interface_1.STATUS.SUSPENDED) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You account has not been SUSPENDED.");
        }
        if (driver.currentRide) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not allowed to accept multiple rides at the same time.");
        }
        yield driver_model_1.Driver.findByIdAndUpdate(driver._id, { currentRide: ride._id, isAvailable: false });
        yield ride_model_1.Ride.findByIdAndUpdate(rideId, {
            driver: user.userId,
            status: ride_interface_1.RideStatus.ACCEPTED,
            acceptedAt: Date.now(),
        });
    }
    if (newRideStatus === ride_interface_1.RideStatus.CANCELLED) {
        if (((_b = ride.driver) === null || _b === void 0 ? void 0 : _b.toString()) !== user.userId) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not allowed for this action.");
        }
        yield driver_model_1.Driver.findByIdAndUpdate(driver._id, { currentRide: null, isAvailable: true });
        yield ride_model_1.Ride.findByIdAndUpdate(rideId, {
            status: ride_interface_1.RideStatus.CANCELLED,
            cancelledAt: Date.now(),
        });
        yield user_model_1.User.findByIdAndUpdate(ride.rider, {
            currentRide: null
        });
    }
    if (newRideStatus === ride_interface_1.RideStatus.COMPLETED) {
        if (((_c = ride.driver) === null || _c === void 0 ? void 0 : _c.toString()) !== user.userId) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not allowed for this action.");
        }
        yield driver_model_1.Driver.findByIdAndUpdate(user.userId, { currentRide: null, isAvailable: true });
        yield ride_model_1.Ride.findByIdAndUpdate(rideId, {
            status: ride_interface_1.RideStatus.COMPLETED,
            completedAt: Date.now(),
        });
        yield user_model_1.User.findByIdAndUpdate(ride.rider, {
            currentRide: null
        });
    }
    if (newRideStatus === ride_interface_1.RideStatus.STARTED) {
        if (((_d = ride.driver) === null || _d === void 0 ? void 0 : _d.toString()) !== user.userId) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not allowed for this action.");
        }
        yield ride_model_1.Ride.findByIdAndUpdate(rideId, {
            status: ride_interface_1.RideStatus.STARTED,
            startedAt: Date.now(),
        });
    }
    // Return updated ride
    const updatedRide = yield ride_model_1.Ride.findById(rideId).populate("driver");
    return updatedRide;
});
exports.rideService = {
    createRide,
    getRides,
    updateRideStatus,
    getRequestedRides,
    getMyRides
};
