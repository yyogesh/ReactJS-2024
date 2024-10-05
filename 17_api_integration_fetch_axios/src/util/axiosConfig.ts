import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Do something before request is sent
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  console.log('Request interceptor:', config);
  return config
}, (error: AxiosError) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
})


axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    console.log('Response interceptor:', response);
  return response;
}, (error: AxiosError) => {
    console.error('Response error:', error);
    if(error.response) {
        console.error('Response error data:', error.response.data);
        return Promise.reject(error);
    }
})