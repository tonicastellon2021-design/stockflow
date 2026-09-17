import axios from "axios";

export const catalogApi = axios.create({
  baseURL: import.meta.env.VITE_API_CATALOG_URL,
});

export const orderAPI = axios.create({
  baseURL: import.meta.env.VITE_API_ORDERS_URL,
});
