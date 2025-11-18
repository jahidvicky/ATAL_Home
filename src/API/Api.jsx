import axios from "axios";

let setLoadingFn;

export const registerLoader = (fn) => {
  setLoadingFn = fn;
};

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  // baseURL: "https://api.ataloptical.org/api",
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
// export const IMAGE_URL = "https://api.ataloptical.org/uploads/"
export const IMAGE_URL = "http://localhost:4000/uploads/"
// export const PDF_URL = "https://api.ataloptical.org/api"
export const PDF_URL = "http://localhost:4000/api"
