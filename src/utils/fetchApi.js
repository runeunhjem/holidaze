// src/utils/fetchApi.js
import { API_BASE_URL_V1, ENDPOINTS } from "../constants/api.js";
// import { API_BASE_URL_V2, ENDPOINTS } from "../constants/api.js";

export const fetchApi = async (endpointKey, options = {}, params = {}, accessToken) => {
  let endpoint = ENDPOINTS[endpointKey];

  Object.keys(params).forEach((key) => {
    endpoint = endpoint.replace(`{${key}}`, encodeURIComponent(params[key]));
  });

  const url = `${API_BASE_URL_V1}${endpoint}`;
  // const url = `${API_BASE_URL_V2}${endpoint}`;

  // Ensure headers object exists in options and automatically include API key and Authorization header
  const headers = {
    "Content-Type": "application/json",
    // "X-Noroff-API-Key": "c075c601-8a18-47c6-832d-1fcf1c464946",
    // "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    ...options.headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
  const fetchOptions = {
    ...options,
    headers,
  };

  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    const error = new Error(`API request failed with status: ${response.status} and text: ${response.statusText}`);
    error.status = response.status; // Add status property to the error
    throw error;
  }
  return response.json();
};
