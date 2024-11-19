import { z } from 'zod';
import { loginSchema } from './login';

export const registerSchema = loginSchema.merge(
  z.object({
    name: z.string().min(2, 'prenom trop court').max(20, 'trop long'),
  }),
);

export type RegisterFormData = z.infer<typeof registerSchema>;
