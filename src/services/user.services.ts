import httpClient from '@/modules/http-client';

import type { User } from '@/types/user.types';

export const getProfile = async (): Promise<User> => {
  const response = await httpClient.get('/auth/profile');
  return response.data;
};
