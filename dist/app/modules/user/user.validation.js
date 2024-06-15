"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.signInUserValidationSchema = exports.signUpUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.signUpUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        role: zod_1.z.enum(["user", "admin"], {
            invalid_type_error: 'Role must be either "user" or "admin"',
        }),
        password: zod_1.z.string(),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
    }),
});
exports.signInUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
});
exports.UserValidation = {
    signUpUserValidationSchema: exports.signUpUserValidationSchema,
    signInUserValidationSchema: exports.signInUserValidationSchema,
};
