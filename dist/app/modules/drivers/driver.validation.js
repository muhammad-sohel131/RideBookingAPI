"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDriverStatusZodSchema = exports.updateDriverZodSchema = exports.createDriverZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createDriverZodSchema = zod_1.default.object({
    licenseNumber: zod_1.default.string({}),
    vehicleType: zod_1.default.string(),
    vehicleModel: zod_1.default.string(),
    vehiclePlate: zod_1.default.string(),
    location: zod_1.default
        .object({
        lat: zod_1.default.number().optional(),
        lng: zod_1.default.number().optional(),
    })
        .optional(),
});
exports.updateDriverZodSchema = zod_1.default.object({
    licenseNumber: zod_1.default.string().optional(),
    vehicleType: zod_1.default.string().optional(),
    vehicleModel: zod_1.default.string().optional(),
    vehiclePlate: zod_1.default.string().optional(),
    isAvailable: zod_1.default.boolean().optional()
});
exports.updateDriverStatusZodSchema = zod_1.default.object({
    status: zod_1.default.enum(["PENDING", "APPROVED", "SUSPENDED"]),
});
