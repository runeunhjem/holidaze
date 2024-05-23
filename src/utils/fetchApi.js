// src/utils/fetchApi.js
import { API_BASE_URL_V2 } from "../constants/api";

export const fetchApi = async (url, options = {}, accessToken) => {
  const headers = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers,
  };

  const fetchOptions = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL_V2}${url}`, fetchOptions);
  const responseData = response.status !== 204 ? await response.json() : null;

  return {
    status: response.status,
    data: responseData,
    error: response.ok ? null : responseData,
  };
};
