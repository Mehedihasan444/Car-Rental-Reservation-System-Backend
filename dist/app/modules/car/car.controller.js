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
exports.CarControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const car_service_1 = require("./car.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
//Create Car
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carData = req.body;
    const result = yield car_service_1.CarServices.createCar(carData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Car is created successfully",
        data: result,
    });
});
//get all cars
const getAllCars = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queries = req.query;
    const result = yield car_service_1.CarServices.getAllCars(queries);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cars are retrieved successfully",
        data: result,
    });
}));
//get a single car
const getACar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_service_1.CarServices.getACar(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Car is retrieved successfully",
        data: result,
    });
}));
//update a Car
const updateACar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carId = req.params.id;
    const updateData = req.body;
    const result = yield car_service_1.CarServices.updateACar(carId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Car is updated successfully",
        data: result,
    });
}));
// delete a Car
const deleteACar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const CarId = req.params.id;
    const result = yield car_service_1.CarServices.deleteACar(CarId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Car is deleted successfully",
        data: result,
    });
}));
const checkCarAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queries = req.query;
    const result = yield car_service_1.CarServices.checkCarAvailability(queries);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cars availability checked successfully",
        data: result
    });
}));
// ------------------------========================-----------------------------
exports.CarControllers = {
    createCar,
    getACar,
    updateACar,
    deleteACar,
    getAllCars,
    checkCarAvailability
};
