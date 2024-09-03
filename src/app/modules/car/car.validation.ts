// import { z } from "zod";

// const carValidationSchema = z.object({
//   body: z.object({
//     name: z.string().min(1, { message: "Name is required" }),
//     description: z.string().min(1, { message: "Description is required" }),
//     color: z.string().min(1, { message: "Color is required" }),
//     isElectric: z.boolean({ required_error: "Electric status is required" }),
//     features: z.array(
//       z.string().min(1, { message: "Feature must be a non-empty string" }),
//       { required_error: "Features are required" }
//     ),
//     pricePerHour: z
//       .number({ required_error: "Price per hour is required" })
//       .refine((val) => val >= 0, {
//         message: "Price per hour must be a non-negative number",
//       }),
//   }),
// });

// const updateCarValidationSchema = z.object({
//   body: z.object({
//     name: z.string().optional(),
//     description: z.string().optional(),
//     color: z.string().optional(),
//     isElectric: z.boolean().optional(),
//     status: z.enum(["available", "unavailable"]).optional(),
//     features: z
//       .array(
//         z.string().min(1, { message: "Feature must be a non-empty string" })
//       )
//       .optional(),
//     pricePerHour: z.number().optional(),
//     isDeleted: z.boolean().optional(),
//   }),
// });

// export const CarValidation = {
//   carValidationSchema,
//   updateCarValidationSchema,
// };
import { z } from "zod";


// Validation schema for creating a car
const carValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    color: z.string().min(1, { message: "Color is required" }),
    isElectric: z.boolean({ required_error: "Electric status is required" }),
    status: z.enum(["available", "unavailable"]).optional(),
    features: z.array(
      z.string().min(1, { message: "Feature must be a non-empty string" }),
      { required_error: "Features are required" }
    ),
    pricePerHour: z
      .number({ required_error: "Price per hour is required" })
      .refine((val) => val >= 0, {
        message: "Price per hour must be a non-negative number",
      }),
    images: z
      .array(z.string().url({ message: "Each image must be a valid URL" }))
      .nonempty({ message: "At least one image is required" }),
    type: z.string().min(1, { message: "Type is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    model: z.string().min(1, { message: "Model is required" }),
    fuelType: z.string().min(1, { message: "Fuel type is required" }),
    transmission: z.string().min(1, { message: "Transmission type is required" }),
    seatingCapacity: z
      .number({ required_error: "Seating capacity is required" })
      .int({ message: "Seating capacity must be an integer" })
      .refine((val) => val > 0, {
        message: "Seating capacity must be a positive number",
      }),
  }),
});

// Validation schema for updating a car
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
    pricePerHour: z
      .number()
      .int()
      .refine((val) => val >= 0, {
        message: "Price per hour must be a non-negative number",
      })
      .optional(),
    isDeleted: z.boolean().optional(),
    images: z
      .array(z.string().url({ message: "Each image must be a valid URL" }))
      .optional(),
    type: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    fuelType: z.string().optional(),
    transmission: z.string().optional(),
    seatingCapacity: z
      .number()
      .int()
      .refine((val) => val > 0, {
        message: "Seating capacity must be a positive number",
      })
      .optional(),
  }),
});

export const CarValidation = {
  carValidationSchema,
  updateCarValidationSchema,
};
