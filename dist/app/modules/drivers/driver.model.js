"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const mongoose_1 = require("mongoose");
const driver_interface_1 = require("./driver.interface");
const DriverSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    vehicleModel: {
        type: String,
        required: true,
    },
    vehiclePlate: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: driver_interface_1.STATUS,
        default: driver_interface_1.STATUS.PENDING,
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    currentRide: {
        type: mongoose_1.Schema.Types.ObjectId || null,
        ref: 'Ride',
        default: null
    },
    location: {
        lat: { type: Number },
        lng: { type: Number },
    },
}, {
    timestamps: true,
});
exports.Driver = (0, mongoose_1.model)('Driver', DriverSchema);
