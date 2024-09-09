"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const review_controller_1 = require("./review.controller");
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(review_validation_1.ReviewValidation.reviewValidationSchema), review_controller_1.ReviewControllers.createReview);
router.get("/", review_controller_1.ReviewControllers.getAllReviews);
router.get("/:id", review_controller_1.ReviewControllers.getAReview);
router.put("/:id", (0, validateRequest_1.default)(review_validation_1.ReviewValidation.updateReviewValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.user), review_controller_1.ReviewControllers.updateAReview);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), review_controller_1.ReviewControllers.deleteAReview);
exports.ReviewRoutes = router;
