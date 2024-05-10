import getCountryCode from "../../utils/getCountryCode";

export const hasValidImages = (media, options) => {
  if (!options.checkImage) return true;
  return (
    media.length > 0 &&
    !media.some((img) => img.url === "https://url.com/image.jpg")
  );
};

export const hasMinimumImages = (media, options) => {
  if (!options.minImagesCount) return true;
  return media.length >= 2;
};

const validContinents = [
  "Africa",
  "Antarctica",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "South America",
];

export const hasValidContinent = (continent, options) => {
  if (!options.checkContinent) return true;
  return (
    continent &&
    continent.trim().length > 0 &&
    validContinents.includes(continent.trim())
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
  undesiredValues = [
    null,
    undefined,
    "",
    "unknown",
    "string",
    "slide",
    "asdf",
    "sfsfsf",
  ],
  translations = {
    afrika: "Africa",
    antarktis: "Antarctica",
    asia: "Asia",
    europa: "Europe",
    "nord-amerika": "North America",
    oseania: "Oceania",
    "sør-amerika": "South America",
    amerika: "America",
    norge: "Norway",
    danmark: "Denmark",
    sverige: "Sweden",
    sweeden: "Sweden",
    // "united arab emirates": "UAE",
  },
) => {
  // Check if value is null or undefined and return "Unspecified" right away
  if (value === null || value === undefined || typeof value !== "string") {
    return "Unspecified";
  }

  // Convert value to lower case and check against undesired values
  const valueLowerCase = value.trim().toLowerCase();

  // Replace Norwegian terms with English equivalents if they exist in the translations dictionary
  const translatedValue = translations[valueLowerCase] || value;

  // Return 'Unspecified' if the value is in the list of undesired values, otherwise return the possibly translated value
  return undesiredValues.includes(valueLowerCase)
    ? "Unspecified"
    : translatedValue;

};

