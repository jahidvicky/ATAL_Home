import axios from "axios";

let setLoadingFn;

export const registerLoader = (fn) => {
  setLoadingFn = fn;
};

const API = axios.create({
  // baseURL: "http://localhost:4000/api",
  baseURL: "https://atal-back-updated.onrender.com/api",
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
// export const IMAGE_URL = "http://localhost:4000/uploads/";
export const IMAGE_URL = "https://atal-back-updated.onrender.com/uploads/"
// export const PDF_URL = "http://localhost:4000/api";
export const PDF_URL = "https://atal-back-updated.onrender.com/api"
