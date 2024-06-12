import { z } from 'zod';

 const carValidationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  color: z.string(),
  isElectric: z.boolean(),
  status: z.enum(['available', 'unavailable']),
  features: z.array(z.string()),
  pricePerHour: z.number(),
  isDeleted: z.boolean(),
});

export const CarValidation = {
    carValidationSchema,
  };
