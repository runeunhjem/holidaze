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
  const status = response.status;

  if (response.status === 204) {
    return { status, data: null, error: null };
  }

  if (!response.ok) {
    const errorBody = await response.json();
    const errorMessage = errorBody.message || `Status code: ${response.status}`;
    throw new Error(`API request failed: ${errorMessage}`);
  }
  return response.json();
};