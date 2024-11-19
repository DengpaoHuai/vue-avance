import useAuthStore from '@/stores/auth';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://c7fd-90-58-170-121.ngrok-free.app/',
});

httpClient.interceptors.response.use(
  (success) => success,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      const authStore = useAuthStore();
      const refreshToken = authStore.refreshToken;

      if (refreshToken) {
        return refresh(refreshToken).then((token) => {
          if (token) {
            authStore.setTokens(token, refreshToken);
            error.config.headers.Authorization = `Bearer ${token}`;
            return axios.request(error.config);
          }
        });
      }
    }

    return Promise.reject(error);
  },
);

httpClient.interceptors.request.use((config) => {
  const authStore = useAuthStore();

  const token = authStore.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const refresh = async (refresh: string) => {
  let accessToken = '';

  const params = { refreshToken: refresh };

  try {
    const response = await axios.post(
      `https://c7fd-90-58-170-121.ngrok-free.app/auth/refresh-token`,
      params,
    );

    accessToken = response.data.accessToken;
    console.log('Token Refreshed');
  } catch (error) {
    console.log(error);
  } finally {
    return accessToken;
  }
};

export default httpClient;
