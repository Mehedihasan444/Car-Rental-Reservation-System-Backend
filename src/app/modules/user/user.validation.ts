import { z } from "zod";

export const signUpUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    role: z.enum(["user", "admin"], {
      invalid_type_error: 'Role must be either "user" or "admin"',
    }),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
});
export const signInUserValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const UserValidation = {
  signUpUserValidationSchema,
  signInUserValidationSchema,
};
