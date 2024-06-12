import { z } from 'zod';

export const BookingValidationSchema = z.object({
  id: z.string(),
  date: z.date(),
  user: z.string(),
  car: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  totalCost: z.number(),
  isBooked: z.enum(["unconfirmed", "confirmed"]),
});

export const bookingValidations = {
    BookingValidationSchema
  };