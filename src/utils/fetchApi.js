// src/utils/fetchApi.js
import { API_BASE_URL, ENDPOINTS } from "../constants/api.js";

/**
 * Fetch data from a specified API endpoint.
 * @param {string} endpointKey - The key from ENDPOINTS corresponding to the API endpoint.
 * @param {Object} options - Additional fetch options (method, headers, body, etc.).
 * @param {Object} params - Parameters to replace in the endpoint URL.
 * @returns {Promise<any>} - The response data from the fetch request.
 */
export const fetchApi = async (endpointKey, options = {}, params = {}) => {
  let endpoint = ENDPOINTS[endpointKey];

  // Replace URL placeholders with actual values from params
  Object.keys(params).forEach((key) => {
    endpoint = endpoint.replace(`{${key}}`, params[key]);
  });

  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
};
