
import { z } from 'zod';

export const UserValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['user', 'admin'], {
    invalid_type_error: 'Role must be either "user" or "admin"',
  }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  phone: z.string().optional(),
  address: z.string().optional(),
});


export const UserValidation = {
  UserValidationSchema,
};
