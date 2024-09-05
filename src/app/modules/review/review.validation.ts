import { z } from "zod";

// Validation schema for creating a review
const reviewValidationSchema = z.object({
  body: z.object({
    car: z.string().min(1, { message: "Car ID is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    rating: z
      .number({ required_error: "Rating is required" })
      .min(1, { message: "Rating must be at least 1" })
      .max(5, { message: "Rating must be at most 5" }), // Assuming rating is between 1 and 5
    comment: z.string().min(1, { message: "Comment is required" }),
  }),
});

// Validation schema for updating a review
const updateReviewValidationSchema = z.object({
  body: z.object({
    car: z.string(),
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email format" }).optional(),
    rating: z
      .number()
      .min(1, { message: "Rating must be at least 1" })
      .max(5, { message: "Rating must be at most 5" })
      .optional(), // Optional for updates
    comment: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ReviewValidation = {
  reviewValidationSchema,
  updateReviewValidationSchema,
};
