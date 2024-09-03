import { z } from "zod";


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

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email format" }).optional(),
    role: z.enum(["user", "admin"]).optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const UserValidation = {
  signUpUserValidationSchema,
  signInUserValidationSchema,
  updateUserValidationSchema
};
