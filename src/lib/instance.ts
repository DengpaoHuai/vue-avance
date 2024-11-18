import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5000',
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
