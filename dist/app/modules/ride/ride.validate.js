"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRideSchema = exports.createRideSchema = void 0;
const zod_1 = require("zod");
const ride_interface_1 = require("./ride.interface");
const locationSchema = zod_1.z.object({
    lat: zod_1.z.number().min(-90).max(90),
    lng: zod_1.z.number().min(-180).max(180),
});
exports.createRideSchema = zod_1.z.object({
    pickupLocation: locationSchema,
    dropLocation: locationSchema,
});
exports.updateRideSchema = zod_1.z.object({
    status: zod_1.z.enum(Object.values(ride_interface_1.RideStatus)),
});
