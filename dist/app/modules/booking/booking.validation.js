"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = exports.BookingUpdateValidationSchema = exports.BookingValidationSchema = void 0;
const zod_1 = require("zod");
exports.BookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().min(1, { message: "Date is required" }),
        user: zod_1.z.string().optional(),
        carId: zod_1.z.string().min(1, { message: "Car ID is required" }), // Renamed to 'car'
        startTime: zod_1.z.string().min(1, { message: "Start time is required" }),
        returnDate: zod_1.z.string().optional(),
        pickupLocation: zod_1.z.string().min(1, { message: "Pickup location is required" }), // Added .min(1)
        destination: zod_1.z.string().min(1, { message: "Destination is required" }), // Added .min(1)
        bookedUserInfo: zod_1.z.object({
            userName: zod_1.z.string().min(1, { message: "Name is required" }), // Added .min(1)
            email: zod_1.z.string().min(1, { message: "Email is required" }), // Added .min(1)
            phone: zod_1.z.string().min(1, { message: "Phone is required" }), // Added .min(1)
            nid: zod_1.z.string().min(1, { message: "NID is required" }), // Fixed the message (NID instead of Address)
            drivingLicense: zod_1.z.string().optional(),
        }),
        additionalFeatures: zod_1.z.object({
            childSeat: zod_1.z.boolean({ message: "Child seat is required" }).optional(),
            gps: zod_1.z.boolean({ message: "GPS is required" }).optional(),
            insurance: zod_1.z.boolean({ message: "Insurance is required" }).optional(),
        }),
    }),
});
exports.BookingUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().optional(),
        user: zod_1.z.string().optional(),
        carId: zod_1.z.string().optional(),
        startTime: zod_1.z.string().optional(),
        returnDate: zod_1.z.string().optional(),
        pickupLocation: zod_1.z
            .string({ message: "pickupLocation is required" })
            .optional(),
        destination: zod_1.z.string({ message: "Destination is required" }).optional(),
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
    BookingUpdateValidationSchema: exports.BookingUpdateValidationSchema,
};
