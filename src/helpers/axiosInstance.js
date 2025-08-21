import axios from "axios";

const axiosInstance = axios.create(); // create an instance of axios

axiosInstance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;