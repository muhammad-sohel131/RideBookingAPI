import { z } from "zod";
import { RideStatus } from "./ride.interface";

const locationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const createRideSchema = z.object({
  pickupLocation: locationSchema,
  dropLocation: locationSchema,
});

export const updateRideSchema = z.object({
  status: z.enum(Object.values(RideStatus)),
});
