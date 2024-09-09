"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidation = void 0;
const zod_1 = require("zod");
// Validation schema for creating a car
const carValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }),
        description: zod_1.z.string().min(1, { message: "Description is required" }),
        color: zod_1.z.string().min(1, { message: "Color is required" }),
        engineType: zod_1.z.string({ required_error: "Engine Type is required" }),
        status: zod_1.z.enum(["available", "booked", "maintenance"]).optional(),
        features: zod_1.z.array(zod_1.z.string().min(1, { message: "Feature must be a non-empty string" }), { required_error: "Features are required" }),
        pricePerHour: zod_1.z
            .number({ required_error: "Price per hour is required" })
            .refine((val) => val >= 0, {
            message: "Price per hour must be a non-negative number",
        }),
        images: zod_1.z
            .array(zod_1.z.string().url({ message: "Each image must be a valid URL" }))
            .nonempty({ message: "At least one image is required" }),
        type: zod_1.z.string().min(1, { message: "Type is required" }),
        brand: zod_1.z.string().min(1, { message: "Brand is required" }),
        model: zod_1.z.string().min(1, { message: "Model is required" }),
        fuelType: zod_1.z.string().min(1, { message: "Fuel type is required" }),
        transmission: zod_1.z.string().min(1, { message: "Transmission type is required" }),
        seatingCapacity: zod_1.z
            .number({ required_error: "Seating capacity is required" })
            .int({ message: "Seating capacity must be an integer" })
            .refine((val) => val > 0, {
            message: "Seating capacity must be a positive number",
        }),
        noOfDoors: zod_1.z
            .number({ required_error: "Number of doors is required" })
            .int({ message: "Number of doors must be an integer" })
            .refine((val) => val > 0, {
            message: "Number of doors must be a positive number",
        }),
    }),
});
// Validation schema for updating a car
const updateCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        color: zod_1.z.string().optional(),
        engineType: zod_1.z.string().optional(),
        status: zod_1.z.enum(["available", "booked", "maintenance"]).optional(),
        features: zod_1.z
            .array(zod_1.z.string().min(1, { message: "Feature must be a non-empty string" }))
            .optional(),
        pricePerHour: zod_1.z
            .number()
            .int()
            .refine((val) => val >= 0, {
            message: "Price per hour must be a non-negative number",
        })
            .optional(),
        isDeleted: zod_1.z.boolean().optional(),
        images: zod_1.z
            .array(zod_1.z.string().url({ message: "Each image must be a valid URL" }))
            .optional(),
        type: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
        model: zod_1.z.string().optional(),
        fuelType: zod_1.z.string().optional(),
        transmission: zod_1.z.string().optional(),
        seatingCapacity: zod_1.z
            .number()
            .int()
            .refine((val) => val > 0, {
            message: "Seating capacity must be a positive number",
        })
            .optional(),
        noOfDoors: zod_1.z
            .number()
            .int()
            .refine((val) => val > 0, {
            message: "Number of doors must be a positive number",
        })
            .optional(),
    }),
});
exports.CarValidation = {
    carValidationSchema,
    updateCarValidationSchema,
};
