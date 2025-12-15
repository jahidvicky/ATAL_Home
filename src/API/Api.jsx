import axios from "axios";

let setLoadingFn;

export const registerLoader = (fn) => {
  setLoadingFn = fn;
};


//local
export const CHAT_API_URL = "http://localhost:4000/api";
export const SOCKET_URL = "http://localhost:4000";
// export const IMAGE_URL = "http://localhost:4000/uploads/";
export const PDF_URL = "http://localhost:4000/api";

//LIVE
// export const CHAT_API_URL = "https://api.ataloptical.org/api";
// export const SOCKET_URL = "https://api.ataloptical.org";
export const IMAGE_URL = "https://api.ataloptical.org/uploads/";
// export const PDF_URL = "https://api.ataloptical.org/api";

//  File URLs (LOCAL)


const API = axios.create({
  baseURL: CHAT_API_URL,
  withCredentials: true,
})

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
