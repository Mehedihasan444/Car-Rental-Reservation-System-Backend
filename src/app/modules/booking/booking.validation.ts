import { z } from "zod";

export const BookingValidationSchema = z.object({
  body: z.object({
    date: z.string().min(1, { message: "Date is required" }),
    user: z.string().optional(),
    carId: z.string().min(1, { message: "Car ID is required" }),  // Renamed to 'car'
    startTime: z.string().min(1, { message: "Start time is required" }),
    returnDate: z.string().optional(),
    pickupLocation: z.string().min(1, { message: "Pickup location is required" }), // Added .min(1)
    destination: z.string().min(1, { message: "Destination is required" }),        // Added .min(1)
    bookedUserInfo: z.object({
      userName: z.string().min(1, { message: "Name is required" }),   // Added .min(1)
      email: z.string().min(1, { message: "Email is required" }),     // Added .min(1)
      phone: z.string().min(1, { message: "Phone is required" }),     // Added .min(1)
      nid: z.string().min(1, { message: "NID is required" }),         // Fixed the message (NID instead of Address)
      drivingLicense: z.string().optional(),
    }),
    additionalFeatures: z.object({
      childSeat: z.boolean({ message: "Child seat is required" }).optional(),
      gps: z.boolean({ message: "GPS is required" }).optional(),
      insurance: z.boolean({ message: "Insurance is required" }).optional(),
    }),
  }),
});


export const BookingUpdateValidationSchema = z.object({
  body: z.object({
    date: z.string().optional(),
    user: z.string().optional(),
    carId: z.string().optional(),
    startTime: z.string().optional(),
    returnDate: z.string().optional(),
    pickupLocation: z
      .string({ message: "pickupLocation is required" })
      .optional(),
    destination: z.string({ message: "Destination is required" }).optional(),
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
