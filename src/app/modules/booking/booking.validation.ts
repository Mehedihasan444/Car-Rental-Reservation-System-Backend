import { z } from "zod";

export const BookingValidationSchema = z.object({
    date: z.date(),
    user: z.string().optional(),
    car: z.string(),
    startTime: z.date(),
    endTime: z.date().optional(),
    totalCost: z.number().optional(),
    isBooked: z.enum(["unconfirmed", "confirmed"]).optional(),
  })


export const bookingValidations = {
  BookingValidationSchema,
};
