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
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Required Name"],
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    engineType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["available", "booked", "maintenance"],
        default: "available",
    },
    features: {
        type: [String],
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    images: {
        type: [String],
        default: [],
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    fuelType: {
        type: String,
        required: true,
    },
    transmission: {
        type: String,
        required: true,
    },
    seatingCapacity: {
        type: Number,
        required: true,
    },
    noOfDoors: {
        type: Number,
        required: true,
    },
    currentLocation: {
        type: String,
        required: true,
        default: "Chapainawabganj",
    },
}, {
    timestamps: true,
});
carSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isCarExists = yield exports.Car.findOne({ name: this.name });
        if (isCarExists) {
            throw new Error("Car is already exists !");
        }
        next();
    });
});
carSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
carSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
carSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
exports.Car = (0, mongoose_1.model)("Car", carSchema);
