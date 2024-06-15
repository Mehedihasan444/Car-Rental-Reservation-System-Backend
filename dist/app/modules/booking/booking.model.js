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
        // required: [true, "User id is required"],
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
        enum: ["unconfirmed", "confirmed"],
        default: "unconfirmed",
    },
}, {
    timestamps: true,
});
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
