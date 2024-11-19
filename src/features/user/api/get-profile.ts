import httpClient from '@/modules/http-client';
import { useQuery } from '@tanstack/vue-query';

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  __v: number;
  refreshToken: string;
};

export const getProfile = async (): Promise<User> => {
  const response = await httpClient.get('/auth/profile');
  return response.data;
};

/*
    export const useProfile = () => {
        return useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: 1000 * 60 * 5,
        });
    };
*/
