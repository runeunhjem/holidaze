import getCountryCode from "./getCountryCode";

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
  const undesiredKeywords = [
    "unknown",
    "unspecified",
    "string",
    "aaa",
    "asdf",
    "3",
  ];
  return !undesiredKeywords.some((keyword) =>
    title.toLowerCase().includes(keyword),
  );
};

export const hasValidCountry = (country, options) => {
  if (!options.checkCountry) return true;
  const validCountryCode = getCountryCode(country);
  return validCountryCode !== "Unspecified";
};

export const sanitizeFields = (
  value,
  undesiredValues = [
    null,
    undefined,
    "",
    "unknown",
    "unspecified",
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
    usa: "United States",
    suomi: "Finland",
  },
) => {
  if (value === null || value === undefined || typeof value !== "string") {
    return "Unspecified";
  }

  const valueLowerCase = value.trim().toLowerCase();
  const translatedValue = translations[valueLowerCase] || value;

  return undesiredValues.includes(valueLowerCase)
    ? "Unspecified"
    : translatedValue;
};
