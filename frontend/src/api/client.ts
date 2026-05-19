import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

const client = axios.create({
  baseURL: API_BASE_URL,
});

export default client;
