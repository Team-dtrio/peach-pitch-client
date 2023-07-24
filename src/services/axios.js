import axios from "axios";

const { VITE_PEACHPITCH_SERVER_URI } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: VITE_PEACHPITCH_SERVER_URI,
  timeout: 1000,
});

export default axiosInstance;
