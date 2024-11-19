import { z } from 'zod';
import { loginSchema } from './login';
import httpClient from '@/modules/http-client';

export const registerSchema = loginSchema.merge(
  z.object({
    name: z.string().min(2, 'prenom trop court').max(20, 'trop long'),
  }),
);

export type RegisterFormData = z.infer<typeof registerSchema>;

export const register = async (payload: RegisterFormData) => {
  const response = await httpClient.post('/auth/register', payload);
  return response.data;
};
