import axios from 'axios';
import { store } from '../store/store';

export const axiosInstanse = axios.create({
  baseURL: 'https://api-peakspace.elcho.dev/api/v1',
});
axiosInstanse.interceptors.request.use(
  function (config) {
    const updateConfig = { ...config };
    const { token } = store.getState().auth;
    if (token) {
      return (updateConfig.headers.Authorization = `Bearer ${token}`);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstanse.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
