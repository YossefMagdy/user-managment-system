// src/setupAxiosInstance.ts
import axios from "axios";

export function setupAxiosInstance(baseURL: string) {
  const axiosInstance = axios.create({
    baseURL, // Set baseURL dynamically
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    function (config) {
      // Show spinner or perform other actions
      return config;
    },
    function (error) {
      // Handle request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    function (response) {
      // Hide spinner or perform other actions
      return response;
    },
    function (error) {
      // Hide spinner or perform other actions
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}
