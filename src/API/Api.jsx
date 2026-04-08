import axios from "axios";

let setLoadingFn;

export const registerLoader = (fn) => {
  setLoadingFn = fn;
};

// local
export const CHAT_API_URL = "http://localhost:4000/api";
export const SOCKET_URL = "http://localhost:4000";
export const IMAGE_URL = "http://localhost:4000/uploads/";
export const PDF_URL = "http://localhost:4000/api";

// LIVE
// export const CHAT_API_URL = "https://api.ataloptical.org/api";
// export const SOCKET_URL = "https://api.ataloptical.org";
// export const IMAGE_URL = "https://api.ataloptical.org/uploads/";
// export const PDF_URL = "https://api.ataloptical.org/api";

const API = axios.create({
  baseURL: CHAT_API_URL,
  withCredentials: true,
});

//  Auto-attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (setLoadingFn) setLoadingFn(true);
  return config;
});

//  Auto-logout on 401
API.interceptors.response.use(
  (response) => {
    if (setLoadingFn) setLoadingFn(false);
    return response;
  },
  (error) => {
    if (setLoadingFn) setLoadingFn(false);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;