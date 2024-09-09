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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const booking_service_1 = require("./booking.service");
const user_model_1 = require("../user/user.model");
//Create Booking
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { carId } = _a, data = __rest(_a, ["carId"]);
    const desireUser = yield user_model_1.User.findOne({ email: req.user.email });
    const newData = Object.assign({ car: carId, user: desireUser === null || desireUser === void 0 ? void 0 : desireUser._id }, data);
    const result = yield booking_service_1.BookingServices.createBooking(newData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Car booked successfully",
        data: result,
    });
});
//get all Booking
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryData = req.query;
    const result = yield booking_service_1.BookingServices.getAllBookings(queryData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bookings are retrieved successfully",
        data: result,
    });
}));
//get a Booking
const getUsersBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const result = yield booking_service_1.BookingServices.getUsersBooking(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bookings are retrieved successfully",
        data: result,
    });
}));
const returnTheCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = req.body;
    const result = yield booking_service_1.BookingServices.returnTheCar(updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Car returned successfully",
        data: result,
    });
}));
//update a Car
const updateBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = req.params.id;
    const updateData = req.body;
    const result = yield booking_service_1.BookingServices.updateBooking(bookingId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking is updated successfully",
        data: result,
    });
}));
// delete a Booking
const deleteBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BookingId = req.params.id;
    const result = yield booking_service_1.BookingServices.deleteBooking(BookingId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking is deleted successfully",
        data: result,
    });
}));
exports.BookingControllers = {
    createBooking,
    getAllBookings,
    getUsersBooking,
    returnTheCar,
    updateBooking,
    deleteBooking,
};
