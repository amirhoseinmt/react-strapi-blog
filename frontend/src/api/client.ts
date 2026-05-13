import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_URL || "http://localhost:1337",
});

export default apiClient;
