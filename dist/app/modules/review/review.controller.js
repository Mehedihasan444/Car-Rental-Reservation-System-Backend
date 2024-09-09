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
exports.ReviewControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const review_service_1 = require("./review.service");
//Create Review
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewData = req.body;
    const result = yield (yield review_service_1.ReviewServices.createReview(reviewData)).populate("car");
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review is created successfully",
        data: result,
    });
});
//get all Reviews
const getAllReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_service_1.ReviewServices.getAllReviews();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Reviews are retrieved successfully",
        data: result,
    });
}));
//get a single Review
const getAReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_service_1.ReviewServices.getAReview(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review is retrieved successfully",
        data: result,
    });
}));
//update a Review
const updateAReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ReviewId = req.params.id;
    const updateData = req.body;
    const result = yield review_service_1.ReviewServices.updateAReview(ReviewId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review is updated successfully",
        data: result,
    });
}));
// delete a Review
const deleteAReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ReviewId = req.params.id;
    const result = yield review_service_1.ReviewServices.deleteAReview(ReviewId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review is deleted successfully",
        data: result,
    });
}));
// ------------------------========================-----------------------------
exports.ReviewControllers = {
    createReview,
    getAReview,
    updateAReview,
    deleteAReview,
    getAllReviews,
};
