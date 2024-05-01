import axios from "axios";
let baseUrl = "http://localhost:3002/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
