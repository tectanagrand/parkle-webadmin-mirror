import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuthHook = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
  headers: { "Content-Type": "application/json" },
});
