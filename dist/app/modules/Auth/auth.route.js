"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const user_validation_1 = require("../user/user.validation");
const router = express_1.default.Router();
router.post('/signin', (0, validateRequest_1.default)(user_validation_1.UserValidation.signInUserValidationSchema), auth_controller_1.authControllers.signin);
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.UserValidation.signUpUserValidationSchema), auth_controller_1.authControllers.signup);
exports.AuthRoutes = router;
