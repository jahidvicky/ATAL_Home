import axios from "axios";

let setLoadingFn;

export const registerLoader = (fn) => {
  setLoadingFn = fn;
};

// 🔹 Base URL for backend API
export const BASE_URL = "https://api.ataloptical.org";
// export const BASE_URL = "http://localhost:4000";

// 🔹 Chat API base URL
export const CHAT_API_URL = `${BASE_URL}/api`;

// 🔹 WebSocket URL (proxied via Nginx)
export const SOCKET_URL = "wss://ataloptical.org/socket.io";

// 🔹 File URLs
export const IMAGE_URL = `${BASE_URL}/uploads/`;
export const PDF_URL = `${BASE_URL}/api`;

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  if (setLoadingFn) setLoadingFn(true);
  return config;
});

API.interceptors.response.use(
  (response) => {
    if (setLoadingFn) setLoadingFn(false);
    return response;
  },
  (error) => {
    if (setLoadingFn) setLoadingFn(false);
    return Promise.reject(error);
  }
);

export default API;
