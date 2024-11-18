import { defineStore } from 'pinia';
import { onMounted, reactive, ref } from 'vue';

const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null);
    const refreshToken = ref<string | null>(null);

    const setTokens = (token1: string, refreshToken1: string) => {
      token.value = token1;
      refreshToken.value = refreshToken1;
    };

    return {
      token,
      refreshToken,
      setTokens,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ['auth'],
    },
  },
);

export default useAuthStore;
