import httpClient from '@/modules/http-client';
import type { Product } from './useProducts';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

export const productSchema = z.object({
  name: z.string(),
  price: z.number(),
});

export type CreateProductForm = z.infer<typeof productSchema>;

export const createProduct = async (product: CreateProductForm): Promise<Product> => {
  const response = await httpClient.post('/products', product);
  return response.data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};
