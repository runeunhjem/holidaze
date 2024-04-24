// getCountryCode.js
import { getCode } from "country-list";

function getCountryCode(countryName) {
  // Ensure countryName is a string and not empty
  if (typeof countryName === "string" && countryName.trim() !== "") {
    return getCode(countryName) || "Unknown";
  }
  return "Unknown";
}

export default getCountryCode;
