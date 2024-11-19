import httpClient from '@/modules/http-client';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'mdp trop court').max(20, 'trop long'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const login = async (payload: LoginFormData) => {
  const response = await httpClient.post('/auth/login', payload);
  return response.data;
};
