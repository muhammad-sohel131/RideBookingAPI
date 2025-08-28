"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const ride_interface_1 = require("./ride.interface");
const RideSchema = new mongoose_1.Schema({
    rider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    driver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    pickupLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    dropLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    status: {
        type: String,
        enum: ride_interface_1.RideStatus,
        default: ride_interface_1.RideStatus.REQUESTED,
    },
    fare: {
        type: Number,
        required: true,
    },
    requestedAt: {
        type: Date,
        default: Date.now,
    },
    acceptedAt: Date,
    startedAt: Date,
    completedAt: Date,
    cancelledAt: Date,
}, {
    timestamps: false,
});
exports.Ride = (0, mongoose_1.model)('Ride', RideSchema);
