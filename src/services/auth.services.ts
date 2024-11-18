import httpClient from '@/lib/instance';
import type { LoginFormData } from '@/schemas/login.schema';

export const login = async (payload: LoginFormData) => {
  const response = await httpClient.post('/auth/login', payload);
  return response.data;
};
