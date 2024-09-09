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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const booking_model_1 = require("./booking.model");
const user_model_1 = require("../user/user.model");
const car_model_1 = require("../car/car.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllBookings = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = {};
    if (queryData.carId) {
        data.carId = queryData.carId;
    }
    if (queryData.date) {
        data.date = queryData.date;
    }
    const result = yield booking_model_1.Booking.find(data).populate("user").populate("car");
    return result;
});
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.create(payload);
    const result1 = yield booking_model_1.Booking.findById(result._id)
        .populate("user")
        .populate("car");
    return result1;
});
const getUsersBooking = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const desireUser = yield user_model_1.User.findOne({ email });
    const result = yield booking_model_1.Booking.find({ user: desireUser._id })
        .populate("user")
        .populate("car");
    return result;
});
const returnTheCar = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const endTime = updateData.endTime;
    // get the specific bookings from the database
    const booking = yield booking_model_1.Booking.findById(updateData === null || updateData === void 0 ? void 0 : updateData.bookingId);
    if (!booking) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cannot find booking");
    }
    // get the specific car from the database
    const car = yield car_model_1.Car.findById(booking === null || booking === void 0 ? void 0 : booking.car);
    if (!car) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cannot find car");
    }
    // Extract hours and minutes from time strings
    const [startHour, startMinute] = booking.startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    // Create Date objects
    const start = new Date(1970, 0, 1, startHour, startMinute);
    const end = new Date(1970, 0, 1, endHour, endMinute);
    // Calculate the difference in hours
    const hours = Math.abs(end.getTime() - start.getTime()) / 36e5;
    // Calculate the total cost
    const totalCost = hours * car.pricePerHour;
    const result = yield booking_model_1.Booking.findByIdAndUpdate(updateData === null || updateData === void 0 ? void 0 : updateData.bookingId, { $set: { endTime, totalCost, isBooked: "returned" } }, { new: true })
        .populate("user")
        .populate("car");
    yield car_model_1.Car.findByIdAndUpdate(booking === null || booking === void 0 ? void 0 : booking.car, {
        $set: {
            status: "available",
        },
    }, { new: true });
    return result;
});
// update a car with a new value
const updateBooking = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    if (updateData.isBooked == "confirmed") {
        yield car_model_1.Car.findByIdAndUpdate(result === null || result === void 0 ? void 0 : result.car, {
            $set: {
                status: "booked",
            },
        }, { new: true });
    }
    return result;
});
// delete a car from the database
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndDelete(id);
    return result;
});
exports.BookingServices = {
    getAllBookings,
    createBooking,
    getUsersBooking,
    returnTheCar,
    updateBooking,
    deleteBooking,
};
