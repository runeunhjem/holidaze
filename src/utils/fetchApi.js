// src/utils/fetchApi.js
import { API_BASE_URL_V1, ENDPOINTS } from "../constants/api.js";

export const fetchApi = async (endpointKey, options = {}, params = {}, accessToken) => {
  let endpoint = ENDPOINTS[endpointKey];

  // Replace direct parameters in the endpoint URL (e.g., {id})
  Object.keys(params).forEach((key) => {
    if (endpoint.includes(`{${key}}`)) {
      endpoint = endpoint.replace(`{${key}}`, encodeURIComponent(params[key]));
      delete params[key]; // Remove the parameter from params as it's already used
    }
  });

  // Building query string from the remaining params
  const queryString = Object.entries(params).reduce((acc, [key, value], index) => {
    const prefix = index === 0 ? "?" : "&";
    return `${acc}${prefix}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }, "");

  const url = `${API_BASE_URL_V1}${endpoint}${queryString}`;

  // Ensure headers object exists in options and automatically include API key and Authorization header
  const headers = {
    "Content-Type": "application/json",
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
