import { z } from "zod";

export const BookingValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    date: z.date(),
    user: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      address: z.string(),
      profileImg: z.string(),
      isDeleted: z.boolean(),
      isAdmin: z.boolean(),
    }),
    car: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      color: z.string(),
      isElectric: z.boolean(),
      status: z.enum(['available', 'unavailable']),
      features: z.array(z.string()),
      pricePerHour: z.number(),
      isDeleted: z.boolean(),
    }),
    startTime: z.date(),
    endTime: z.date(),
    totalCost: z.number(),
    isBooked: z.enum(["unconfirmed", "confirmed"]),
  }),
});

export const bookingValidations = {
  BookingValidationSchema,
};
