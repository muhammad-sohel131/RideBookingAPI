import z from "zod";

export const updateUserSchema = z.object({
  isBlocked: z.boolean(),
});