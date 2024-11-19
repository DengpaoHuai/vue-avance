import { defineStore } from 'pinia';
import { onMounted, reactive, ref, watch } from 'vue';
import { getProfile } from '../services/user.services';

const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null);
    const refreshToken = ref<string | null>(null);
    const name = ref<string | null>(null);
    const email = ref<string | null>(null);

    const setTokens = (token1: string, refreshToken1: string) => {
      token.value = token1;
      refreshToken.value = refreshToken1;
    };

    watch(
      () => token.value,
      (value) => {
        console.log('token', value);
        if (value) {
          getProfile().then((response) => {
            name.value = response.name;
            email.value = response.email;
          });
        }
      },
      { immediate: true },
    );

    return {
      setTokens,
      name,
      email,
      token,
      refreshToken,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  },
);

export default useAuthStore;
