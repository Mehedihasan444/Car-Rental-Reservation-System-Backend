"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = exports.BookingValidationSchema = void 0;
const zod_1 = require("zod");
exports.BookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string(),
        user: zod_1.z.string().optional(),
        car: zod_1.z.string(),
        startTime: zod_1.z.string(),
        endTime: zod_1.z.string().optional(),
        totalCost: zod_1.z.number().optional(),
        isBooked: zod_1.z.enum(["unconfirmed", "confirmed"]).optional(),
    }),
});
const carReturnValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string(),
        endTime: zod_1.z.string(),
    }),
});
exports.bookingValidations = {
    BookingValidationSchema: exports.BookingValidationSchema,
    carReturnValidationSchema,
};
