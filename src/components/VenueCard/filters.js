// filters.js

export const validateField = (
  field,
  invalidValues = [null, undefined, "string", "", "aaa", "Unknown"],
) => {
  return invalidValues.includes(field) ? "Unspecified" : field;
};

export const hasValidImages = (
  media,
  undesiredUrl = "https://url.com/image.jpg",
) => {
  return media.length > 0 && !media.some((img) => img.url === undesiredUrl);
};

export const hasValidTitle = (name) => {
  return !(name && name.includes("aaa"));
};
