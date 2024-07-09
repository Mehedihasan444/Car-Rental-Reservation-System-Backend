"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidation = void 0;
const zod_1 = require("zod");
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
const carValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }),
        description: zod_1.z.string().min(1, { message: "Description is required" }),
        color: zod_1.z.string().min(1, { message: "Color is required" }),
        isElectric: zod_1.z.boolean({ required_error: "Electric status is required" }),
        features: zod_1.z.array(zod_1.z.string().min(1, { message: "Feature must be a non-empty string" }), { required_error: "Features are required" }),
        pricePerHour: zod_1.z
            .number({ required_error: "Price per hour is required" })
            .refine((val) => val >= 0, {
            message: "Price per hour must be a non-negative number",
        }),
    }),
});
const updateCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        color: zod_1.z.string().optional(),
        isElectric: zod_1.z.boolean().optional(),
        status: zod_1.z.enum(["available", "unavailable"]).optional(),
        features: zod_1.z
            .array(zod_1.z.string().min(1, { message: "Feature must be a non-empty string" }))
            .optional(),
        pricePerHour: zod_1.z.number().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.CarValidation = {
    carValidationSchema,
    updateCarValidationSchema,
};
