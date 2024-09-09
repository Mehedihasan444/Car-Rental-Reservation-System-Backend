"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
// Validation schema for creating a review
const reviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        car: zod_1.z.string().min(1, { message: "Car ID is required" }),
        name: zod_1.z.string().min(1, { message: "Name is required" }),
        email: zod_1.z
            .string()
            .min(1, { message: "Email is required" })
            .email({ message: "Invalid email format" }),
        rating: zod_1.z
            .number({ required_error: "Rating is required" })
            .min(1, { message: "Rating must be at least 1" })
            .max(5, { message: "Rating must be at most 5" }), // Assuming rating is between 1 and 5
        comment: zod_1.z.string().min(1, { message: "Comment is required" }),
    }),
});
// Validation schema for updating a review
const updateReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        car: zod_1.z.string(),
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email({ message: "Invalid email format" }).optional(),
        rating: zod_1.z
            .number()
            .min(1, { message: "Rating must be at least 1" })
            .max(5, { message: "Rating must be at most 5" })
            .optional(), // Optional for updates
        comment: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.ReviewValidation = {
    reviewValidationSchema,
    updateReviewValidationSchema,
};
