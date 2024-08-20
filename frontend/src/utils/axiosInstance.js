import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // Conditionally add the Authorization header if the token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;
