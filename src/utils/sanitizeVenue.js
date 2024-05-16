import {
  sanitizeFields,
  hasValidTitle,
  hasValidCountry,
  hasValidContinent,
  hasValidImages,
} from "./options";

export const sanitizeVenue = (venue, options) => {
  const sanitizedVenue = {
    ...venue,
    name: hasValidTitle(venue.name, options) ? venue.name : "Unspecified title",
    location: {
      ...venue.location,
      country: hasValidCountry(venue.location.country, options)
        ? venue.location.country
        : "Unspecified country",
      continent: hasValidContinent(venue.location.continent, options)
        ? venue.location.continent
        : "Unspecified continent",
      city: sanitizeFields(venue.location.city)
        ? venue.location.city
        : "Unspecified city",
    },
    media: venue.media.filter((img) => hasValidImages(img, options)),
  };

  return sanitizedVenue;
};
