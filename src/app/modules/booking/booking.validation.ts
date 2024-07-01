import { z } from "zod";

export const BookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    user: z.string().optional(),
    carId: z.string(),
    startTime: z.string(),
    endTime: z.string().optional(),
    totalCost: z.number().optional(),
    isBooked: z.enum(["unconfirmed", "confirmed"]).optional(),
  }),
});
const carReturnValidationSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: z.string(),
  }),
});

export const bookingValidations = {
  BookingValidationSchema,
  carReturnValidationSchema,
};
