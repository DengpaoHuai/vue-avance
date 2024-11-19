import httpClient from '@/modules/http-client';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { Product } from './useProducts';

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

const deleteProduct = async (id: string): Promise<void> => {
  await waitFor(2000);
  await httpClient.delete(`/products/${id}`);
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });

      const previousProducts = queryClient.getQueryData(['products']);

      queryClient.setQueryData(['products'], (old: Product[] | undefined) => {
        if (!old) {
          return [];
        }
        return old.filter((product) => product._id !== id);
      });

      return { previousProducts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['products'], context?.previousProducts);
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};
