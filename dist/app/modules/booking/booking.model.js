"use strict";
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
            required: [true, "Driving license is required"],
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
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
