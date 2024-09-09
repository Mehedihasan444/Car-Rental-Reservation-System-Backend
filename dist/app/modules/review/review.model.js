"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Car id is required"],
        ref: "Car",
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
