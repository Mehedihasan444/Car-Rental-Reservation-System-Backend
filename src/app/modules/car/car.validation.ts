import { z } from "zod";

const carValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
    isElectric: z.boolean(),
    status: z.enum(["available", "unavailable"]).optional(),
    features: z.array(z.string()),
    pricePerHour: z.number(),
    isDeleted: z.boolean().optional(),
  }),
});
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    status: z.enum(["available", "unavailable"]).optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const carReturnValidationSchema = z.object({
  body: z.object({
      bookingId:z.string(),
      endTime:z.string()
  })
  })
export const CarValidation = {
  carValidationSchema,
  updateCarValidationSchema,
  carReturnValidationSchema
};
