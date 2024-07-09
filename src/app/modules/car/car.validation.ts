import { z } from "zod";

// const carValidationSchema = z.object({
//   body: z.object({
//     name: z.string(),
//     description: z.string(),
//     color: z.string(),
//     isElectric: z.boolean(),
//     status: z.enum(["available", "unavailable"]).optional(),
//     features: z.array(z.string()),
//     pricePerHour: z.number(),
//     isDeleted: z.boolean().optional(),
//   }),
// });
// const updateCarValidationSchema = z.object({
//   body: z.object({
//     name: z.string().optional(),
//     description: z.string().optional(),
//     color: z.string().optional(),
//     isElectric: z.boolean().optional(),
//     status: z.enum(["available", "unavailable"]).optional(),
//     features: z.array(z.string()).optional(),
//     pricePerHour: z.number().optional(),
//     isDeleted: z.boolean().optional(),
//   }),
// });
const carValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    color: z.string().min(1, { message: "Color is required" }),
    isElectric: z.boolean({ required_error: "Electric status is required" }),
    features: z.array(
      z.string().min(1, { message: "Feature must be a non-empty string" }),
      { required_error: "Features are required" }
    ),
    pricePerHour: z
      .number({ required_error: "Price per hour is required" })
      .refine((val) => val >= 0, {
        message: "Price per hour must be a non-negative number",
      }),
  }),
});

const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    status: z.enum(["available", "unavailable"]).optional(),
    features: z
      .array(
        z.string().min(1, { message: "Feature must be a non-empty string" })
      )
      .optional(),
    pricePerHour: z.number().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const CarValidation = {
  carValidationSchema,
  updateCarValidationSchema,
};
