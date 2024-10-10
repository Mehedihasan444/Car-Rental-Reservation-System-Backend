"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: [true, "Date id is required"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User id is required"],
        ref: "User",
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Car id is required"],
        ref: "Car",
    },
    startTime: {
        type: String,
        required: [true, "startTime id is required"],
    },
    endTime: {
        type: String,
        default: null
    },
    totalCost: {
        type: Number,
        default: 0
    },
    isBooked: {
        type: String,
        enum: ["unconfirmed", "confirmed", "canceled", "returned"],
        default: "unconfirmed",
    },
    payment: {
        type: String,
        enum: ["paid", "due"],
        default: "due",
    },
    transactionId: {
        type: String,
        default: null,
    },
    returnDate: {
        type: String,
        default: null,
    },
    pickupLocation: {
        type: String,
        required: [true, "Pickup location is required"],
    },
    destination: {
        type: String,
        required: [true, "Destination is required"],
    },
    bookedUserInfo: {
        userName: {
            type: String,
            required: [true, "User name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
        },
        nid: {
            type: String,
            required: [true, "National ID is required"],
        },
        drivingLicense: {
            type: String,
            // required: [true, "Driving license is required"],
        }
    },
    additionalFeatures: {
        childSeat: {
            type: Boolean,
            default: false,
        },
        gps: {
            type: Boolean,
            default: false,
        },
        insurance: {
            type: Boolean,
            default: false,
        },
    }
}, {
    timestamps: true,
});
// Pre-hook to prevent overlapping bookings
bookingSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const conflictingBooking = yield exports.Booking.findOne({
            car: this.car,
            $or: [
                { date: { $lt: this.returnDate, $gt: this.date } },
                { returnDate: { $gt: this.date, $lt: this.returnDate } },
            ],
        });
        if (conflictingBooking) {
            throw new Error("The car is already booked during this time.");
        }
        next();
    });
});
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
