import { z } from "zod";

export const BookingValidationSchema = z.object({
  body: z.object({
    date: z.string().min(1, { message: "Date is required" }),
    user: z.string().optional(),
    carId: z.string().min(1, { message: "Car ID is required" }),
    startTime: z.string().min(1, { message: "Start time is required" }),
  }),
});


export const BookingUpdateValidationSchema = z.object({
  body: z.object({
    date: z.string().optional(),
    user: z.string().optional(),
    carId: z.string().optional(),
    startTime: z.string().optional(),
  }),
});

const carReturnValidationSchema = z.object({
  body: z.object({
    bookingId: z.string().min(1, { message: "Booking ID is required" }),
    endTime: z.string().min(1, { message: "End time is required" }),
  }),
});

export const bookingValidations = {
  BookingValidationSchema,
  carReturnValidationSchema,
  BookingUpdateValidationSchema,
};
