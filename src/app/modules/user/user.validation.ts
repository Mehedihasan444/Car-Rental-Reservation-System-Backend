import { z } from "zod";

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

export const signUpUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" }),
    role: z.enum(["user", "admin"], {
      required_error: "Role is required",
      invalid_type_error: 'Role must be either "user" or "admin"',
    }),
    password: z.string().min(1, { message: "Password is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    address: z.string().min(1, { message: "Address is required" }),
  }),
});

export const signInUserValidationSchema = z.object({
  body: z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email format" }),
    password: z.string().min(1, { message: "Password is required" }),
  }),
});

export const UserValidation = {
  signUpUserValidationSchema,
  signInUserValidationSchema,
};
