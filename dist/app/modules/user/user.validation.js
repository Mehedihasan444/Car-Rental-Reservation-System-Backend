"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.signInUserValidationSchema = exports.signUpUserValidationSchema = void 0;
const zod_1 = require("zod");
// export const signUpUserValidationSchema = z.object({
//   body: z.object({
//     name: z.string(),
//     email: z.string(),
//     role: z.enum(["user", "admin"], {
//       invalid_type_error: 'Role must be either "user" or "admin"',
//     }),
//     password: z.string(),
//     phone: z.string(),
//     address: z.string(),
//   }),
// });
// export const signInUserValidationSchema = z.object({
//   body: z.object({
//     email: z.string(),
//     password: z.string(),
//   }),
// });
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
exports.UserValidation = {
    signUpUserValidationSchema: exports.signUpUserValidationSchema,
    signInUserValidationSchema: exports.signInUserValidationSchema,
};
