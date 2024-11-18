import { onMounted, ref, type Ref } from 'vue';

const useFetch = <T>(url: string) => {
  const isLoading: Ref = ref(false);
  const data = ref<T[] | null>(null);
  const error = ref<string | null>(null);

  onMounted(() => {
    isLoading.value = true;
    error.value = null;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(data);
        data.value = response.results;
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

export default useFetch;
