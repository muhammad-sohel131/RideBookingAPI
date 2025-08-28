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
exports.driverService = void 0;
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const driver_interface_1 = require("./driver.interface");
const driver_model_1 = require("./driver.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const ride_model_1 = require("../ride/ride.model");
const ride_interface_1 = require("../ride/ride.interface");
const registerDriver = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { licenseNumber, vehicleType, vehicleModel, vehiclePlate, location } = payload;
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Register as User before a driver");
    }
    if (user.role !== user_interface_1.Role.RIDER) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Only A normal user can be driver.");
    }
    // Check if already a driver
    const existingDriver = yield driver_model_1.Driver.findOne({ user: userId });
    if (existingDriver) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User is already registered as a driver");
    }
    // Create driver profile
    const driver = yield driver_model_1.Driver.create({
        user: userId,
        licenseNumber,
        vehicleType,
        vehicleModel,
        vehiclePlate,
        location,
    });
    return driver;
});
const getAllDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    const drivers = yield driver_model_1.Driver.find().populate({
        path: "user",
        select: "name phone",
    });
    return drivers;
});
const getMyEarnings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const earningsHistory = yield ride_model_1.Ride.find({
        driver: userId,
        status: ride_interface_1.RideStatus.COMPLETED
    });
    return earningsHistory;
});
const getRequestedDrivers = () => __awaiter(void 0, void 0, void 0, function* () {
    const drivers = yield driver_model_1.Driver.find({ status: driver_interface_1.STATUS.PENDING }).populate({
        path: "user",
        select: "name phone",
    });
    return drivers;
});
const updateDriver = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedDriver = yield driver_model_1.Driver.findByIdAndUpdate(userId, payload, {
        new: true,
    });
    if ((updatedDriver === null || updatedDriver === void 0 ? void 0 : updatedDriver.status) === driver_interface_1.STATUS.APPROVED) {
        yield user_model_1.User.findByIdAndUpdate(updatedDriver === null || updatedDriver === void 0 ? void 0 : updatedDriver.user, {
            role: user_interface_1.Role.DRIVER,
        });
    }
    else {
        yield user_model_1.User.findByIdAndUpdate(updatedDriver === null || updatedDriver === void 0 ? void 0 : updatedDriver.user, {
            role: user_interface_1.Role.RIDER,
        });
    }
    return updatedDriver;
});
const approveDriver = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedDriver = yield driver_model_1.Driver.findOneAndUpdate({
        user: userId
    }, {
        status: driver_interface_1.STATUS.APPROVED,
        isAvailable: true
    }, {
        new: true,
    });
    if (!updatedDriver) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Did not made any request by the user to be a rider.");
    }
    yield user_model_1.User.findByIdAndUpdate(updatedDriver.user, {
        role: user_interface_1.Role.DRIVER,
    });
    return updatedDriver;
});
exports.driverService = {
    registerDriver,
    getAllDrivers,
    updateDriver,
    getRequestedDrivers,
    approveDriver,
    getMyEarnings
};
