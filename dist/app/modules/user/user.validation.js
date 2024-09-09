"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.updateUserValidationSchema = exports.signInUserValidationSchema = exports.signUpUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.signUpUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }),
        email: zod_1.z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" }),
        role: zod_1.z.enum(["user", "admin"], {
            required_error: "Role is required",
            invalid_type_error: 'Role must be either "user" or "admin"',
        }),
        password: zod_1.z.string().min(1, { message: "Password is required" }),
        phone: zod_1.z.string().min(1, { message: "Phone number is required" }),
        address: zod_1.z.string().min(1, { message: "Address is required" }),
    }),
});
exports.signInUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" }),
        password: zod_1.z.string().min(1, { message: "Password is required" }),
    }),
});
exports.updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email({ message: "Invalid email format" }).optional(),
        role: zod_1.z.enum(["user", "admin"]).optional(),
        password: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        status: zod_1.z.enum(["active", "blocked"]).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.UserValidation = {
    signUpUserValidationSchema: exports.signUpUserValidationSchema,
    signInUserValidationSchema: exports.signInUserValidationSchema,
    updateUserValidationSchema: exports.updateUserValidationSchema
};
