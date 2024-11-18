import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://78fd-90-58-170-121.ngrok-free.app/',
});

httpClient.interceptors.response.use(
  (success) => success,
  (error) => {
    if (error.response?.status === 401) {
      console.log('401');
    }

    return Promise.reject(error);
  },
);

export default httpClient;
