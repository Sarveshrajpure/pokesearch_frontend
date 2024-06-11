import axios from "axios";
let baseUrl = `${process.env.REACT_APP_BASE_URL}/api` || "http://localhost:3002/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
