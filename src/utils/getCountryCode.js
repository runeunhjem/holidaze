// getCountryCode.js
import { getCode } from "country-list";

function getCountryCode(countryName) {
  if (typeof countryName === "string" && countryName.trim() !== "") {
    const code = getCode(countryName);
    return code || "Unspecified";
  }
  return "Unspecified";
}

export default getCountryCode;
