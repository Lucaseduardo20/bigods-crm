import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  const companyId = localStorage.getItem("tenant_company_id");

  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }

  if (companyId) {
    config.headers["X-Company-Id"] = companyId;
  }

  return config;
}, error => Promise.reject(error));
