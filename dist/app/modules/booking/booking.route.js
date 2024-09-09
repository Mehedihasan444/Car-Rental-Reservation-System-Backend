"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(booking_validation_1.bookingValidations.BookingValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.BookingControllers.createBooking);
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.BookingControllers.getAllBookings);
router.get("/my-bookings", (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.BookingControllers.getUsersBooking);
router.put("/:id", (0, validateRequest_1.default)(booking_validation_1.bookingValidations.BookingUpdateValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), booking_controller_1.BookingControllers.updateBooking);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), booking_controller_1.BookingControllers.deleteBooking);
exports.BookingRoutes = router;
