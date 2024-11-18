import { onMounted, reactive } from 'vue';
const authStore = reactive<{
  token: string | null;
  refreshToken: string | null;
}>({
  token: null,
  refreshToken: null,
});

const useAuthStore = () => {
  onMounted(() => {
    authStore.token = localStorage.getItem('token');
    authStore.refreshToken = localStorage.getItem('refreshToken');
  });

  const setTokens = (token: string, refreshToken: string) => {
    authStore.token = token;
    authStore.refreshToken = refreshToken;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  };

  return {
    authStore,
    setTokens,
  };
};

export default useAuthStore;
