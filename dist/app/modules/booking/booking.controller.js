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
exports.BookingControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const booking_service_1 = require("./booking.service");
const user_model_1 = require("../user/user.model");
//Create Booking
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = req.body;
    const desireUser = yield user_model_1.User.findOne({ email: req.user.email });
    const newData = Object.assign(Object.assign({}, bookingData), { user: desireUser ? desireUser._id : null });
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
exports.BookingControllers = {
    createBooking,
    getAllBookings,
    getUsersBooking,
    returnTheCar
};
