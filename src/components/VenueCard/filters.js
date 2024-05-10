import getCountryCode from "../../utils/getCountryCode";

// src/utils/Filters.js
export const hasValidImages = (media, options) => {
  if (!options.checkImage) return true;
  return (
    media.length > 0 &&
    !media.some((img) => img.url === "https://url.com/image.jpg")
  );
};

export const hasValidTitle = (title, options) => {
  if (!options.checkTitle) return true;
  const undesiredKeywords = ["unknown", "string", "aaa", "asdf", "3"]; // Extend this list as needed
  return !undesiredKeywords.some((keyword) =>
    title.toLowerCase().includes(keyword),
  );
};


export const hasValidCountry = (country, options) => {
  if (!options.checkCountry) return true;
  const validCountryCode = getCountryCode(country); // Assuming getCountryCode is a valid imported function
  return validCountryCode !== "Unknown";
};

export const sanitizeFields = (
  value,
  undesiredValues = [null, undefined, "", "unknown", "string", "slide"],
) => {
  // Check if value is null or undefined and return "Unspecified" right away
  if (value === null || value === undefined || typeof value !== "string") {
    return "Unspecified";
  }

  // Convert value to lower case and check against undesired values
  const valueLowerCase = value.trim().toLowerCase();
  return undesiredValues.includes(valueLowerCase) ? "Unspecified" : value;
};
