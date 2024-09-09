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
exports.CarServices = void 0;
const car_model_1 = require("./car.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
// create a new car in the database
const createCar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.create(payload);
    return result;
});
// get a single car from the database
const getACar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findById(id);
    return result;
});
// update a car with a new value
const updateACar = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    return result;
});
// delete a car from the database
const deleteACar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findByIdAndDelete(id);
    return result;
});
// get all car from the database
const getAllCars = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await Car.find();
    // return result;
    // Create a new QueryBuilder instance for the car query
    const carQuery = new QueryBuilder_1.default(car_model_1.Car.find({}), payload)
        .search(["features",])
        .filter()
        .sort()
        .paginate();
    // Execute the query to get the paginated results
    const result = yield carQuery.modelQuery;
    // Create a separate query to count the total number of cars matching the filter criteria
    const countQuery = new QueryBuilder_1.default(car_model_1.Car.find({}), payload)
        .search(["name", "description"])
        .filter();
    // Execute the count query to get the total count
    const totalCount = yield countQuery.modelQuery.countDocuments();
    // Return both the paginated results and the total count
    return {
        totalCount,
        cars: result,
    };
});
exports.CarServices = {
    createCar,
    getACar,
    updateACar,
    deleteACar,
    getAllCars,
};
