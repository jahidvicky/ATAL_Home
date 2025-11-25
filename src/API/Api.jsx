import axios from "axios";

let setLoadingFn;

export const registerLoader = (fn) => {
  setLoadingFn = fn;
};

//  REST API base
// export const CHAT_API_URL = "http://localhost:4000/api";
export const CHAT_API_URL = "https://api.ataloptical.org/api";

//  WebSocket base (direct server URL)
// export const SOCKET_URL = "http://localhost:4000";
export const SOCKET_URL = "https://api.ataloptical.org";

//  Image / File Base URL
export const IMAGE_URL = "https://api.ataloptical.org/uploads/";
// export const IMAGE_URL = "http://localhost:4000/uploads/";

export const PDF_URL = "https://api.ataloptical.org/api";
// export const PDF_URL = "http://localhost:4000/api";

const API = axios.create({
  baseURL: CHAT_API_URL,
  withCredentials: true,
});

//  Loader Handlers
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
