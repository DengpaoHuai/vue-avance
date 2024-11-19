import httpClient from '@/modules/http-client';
import { useQuery, type QueryKey, type UndefinedInitialQueryOptions } from '@tanstack/vue-query';

export type Product = {
  _id: string;
  name: string;
  price: number;
  __v: number;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await httpClient.get('/products');
  return response.data;
};

const productsCacheConfig = {
  queryKey: ['products'],
  queryFn: getProducts,
  staleTime: 1000 * 60 * 5,
};

export const useProducts = () => {
  return useQuery(productsCacheConfig);
};
