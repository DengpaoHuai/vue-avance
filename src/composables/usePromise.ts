import { onMounted, ref, type Ref } from 'vue';

const usePromise = <T>(callback: () => Promise<T>) => {
  const isLoading = ref(false);
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);

  onMounted(() => {
    isLoading.value = true;
    error.value = null;

    callback()
      .then((response) => {
        console.log(data);
        data.value = response;
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          error.value = err.message;
        } else if (typeof err === 'string') {
          error.value = err;
        } else {
          error.value = 'Une erreur est survenue';
        }
      })
      .finally(() => {
        isLoading.value = false;
      });
  });

  return {
    isLoading,
    data,
    error,
  };
};

export default usePromise;
