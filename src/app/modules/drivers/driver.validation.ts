import z from "zod";

export const createDriverZodSchema = z.object({
  licenseNumber: z.string({}),
  vehicleType: z.string(),
  vehicleModel: z.string(),
  vehiclePlate: z.string(),
  location: z
    .object({
      lat: z.number().optional(),
      lng: z.number().optional(),
    })
    .optional(),
});

export const updateDriverZodSchema = z.object({
  licenseNumber: z.string().optional(),
  vehicleType: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehiclePlate: z.string().optional(),
  isAvailable: z.boolean().optional()
});

export const updateDriverStatusZodSchema = z.object({
    status: z.enum(["PENDING", "APPROVED", "SUSPENDED"]),
})