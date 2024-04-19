// src/utils/fetchApi.js
import { API_BASE_URL_V2, ENDPOINTS } from "../constants/api.js";

export const fetchApi = async (endpointKey, options = {}, params = {}, accessToken) => {
  let endpoint = ENDPOINTS[endpointKey];

  // Filter out empty parameters
  const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value) {
      // This will exclude empty strings, null, and undefined
      acc[key] = value;
    }
    return acc;
  }, {});

  // Replace direct parameters in the endpoint URL (e.g., {id})
  Object.keys(params).forEach((key) => {
    if (endpoint.includes(`{${key}}`)) {
      endpoint = endpoint.replace(`{${key}}`, encodeURIComponent(params[key]));
      delete params[key]; // Remove the parameter from params as it's already used
    }
  });

  // Building query string from the filtered params
  const queryString = Object.entries(filteredParams).reduce((acc, [key, value], index) => {
    const prefix = index === 0 ? "?" : "&";
    return `${acc}${prefix}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }, "");

  const url = `${API_BASE_URL_V2}${endpoint}${queryString}`;

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
  // Check if the response was not ok (i.e., status code outside of 2xx)
  if (!response.ok) {
    // Try to parse the response body to get detailed error messages
    let errorMessage = `API request failed with status: ${response.status}`;
    try {
      const errorBody = await response.json(); // Parse the JSON body of the response
      if (errorBody.errors && errorBody.errors.length > 0) {
        // Assuming the first error in the array contains the relevant message
        errorMessage += ` and message: ${errorBody.errors[0].message}`;
      }
    } catch (parseError) {
      console.error("Error parsing the error response:", parseError);
      // Optionally handle JSON parse error, if the response is not in JSON format
      errorMessage += `. Unable to parse error response body.`;
    }
    throw new Error(errorMessage);
  }
  return response.json();
};
