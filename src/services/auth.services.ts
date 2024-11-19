import httpClient from '@/modules/http-client';

import type { LoginFormData, RegisterFormData } from '@/schemas/auth.schema';

export const login = async (payload: LoginFormData) => {
  const response = await httpClient.post('/auth/login', payload);
  return response.data;
};

export const register = async (payload: RegisterFormData) => {
  const response = await httpClient.post('/auth/register', payload);
  return response.data;
};
