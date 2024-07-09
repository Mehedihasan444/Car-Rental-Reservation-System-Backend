import { z } from "zod";

// export const BookingValidationSchema = z.object({
//   body: z.object({
//     date: z.string(),
//     user: z.string().optional(),
//     carId: z.string(),
//     startTime: z.string(),
//     endTime: z.string().optional(),
//     totalCost: z.number().optional(),
//     isBooked: z.enum(["unconfirmed", "confirmed"]).optional(),
//   }),
// });
// const carReturnValidationSchema = z.object({
//   body: z.object({
//     bookingId: z.string(),
//     endTime: z.string(),
//   }),
// });
export const BookingValidationSchema = z.object({
  body: z.object({
    date: z.string().min(1, { message: "Date is required" }),
    user: z.string().optional(),
    carId: z.string().min(1, { message: "Car ID is required" }),
    startTime: z.string().min(1, { message: "Start time is required" }),
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
};
