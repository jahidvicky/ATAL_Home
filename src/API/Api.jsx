import axios from "axios";

let setLoadingFn;

export const registerLoader = (fn) => {
  setLoadingFn = fn;
};

// 🔹 Base URL for backend
// export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "https://api.ataloptical.org";

// 🔹 REST API base URL
const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

// 🔹 Socket URL (for WebSocket connection)
export const SOCKET_URL = BASE_URL;

// 🔹 Chat API base URL
export const CHAT_API_URL = `${BASE_URL}/api`;

// 🔹 File URLs
export const IMAGE_URL = `${BASE_URL}/uploads/`;
export const PDF_URL = `${BASE_URL}/api`;

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
