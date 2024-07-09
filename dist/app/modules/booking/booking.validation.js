"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = exports.BookingValidationSchema = void 0;
const zod_1 = require("zod");
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
exports.BookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().min(1, { message: "Date is required" }),
        user: zod_1.z.string().optional(),
        carId: zod_1.z.string().min(1, { message: "Car ID is required" }),
        startTime: zod_1.z.string().min(1, { message: "Start time is required" }),
    }),
});
const carReturnValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string().min(1, { message: "Booking ID is required" }),
        endTime: zod_1.z.string().min(1, { message: "End time is required" }),
    }),
});
exports.bookingValidations = {
    BookingValidationSchema: exports.BookingValidationSchema,
    carReturnValidationSchema,
};
