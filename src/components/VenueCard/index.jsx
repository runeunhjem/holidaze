import propTypes from "prop-types";
import { Link } from "react-router-dom";
import CardImageCarousel from "../MUI/CardImageCarousel"; // Adjust the path as necessary
import RatingStar from "../RatingStar";
import getCountryCode from "../../utils/getCountryCode";
import { TbHeartPlus, TbHeartFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";

function VenueCard({ venue }) {

  const [isFavorite, setIsFavorite] = useState(false);
  const { addFavoriteVenue, removeFavoriteVenue, favorites } = useStore(
    (state) => state,
  );

  // Validation functions
  function validateField(field) {
    const invalidValues = [null, undefined, "string", "", "aaa", "Unknown"]; // Extend this list as needed
    return invalidValues.includes(field) ? "Unspecified" : field;
  }

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.id === venue.id));
  }, [favorites, venue.id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteVenue(venue.id);
    } else {
      addFavoriteVenue(venue);
    }
    setIsFavorite(!isFavorite);
  };

  const hasAtLeastOneImage = venue.media && venue.media.length >= 0;
  const hasValidTitle = venue.name && !venue.name.includes("aaa");
  // Apply validation to country and continent
  const validCountry = validateField(venue.location.country);
  const validContinent = validateField(venue.location.continent);

  // Check for at least one image and a valid title

  // if (!hasAtLeastOneImage || !hasValidTitle) return null;
  const countryCode = getCountryCode(venue.location.country);
  if (!hasAtLeastOneImage || !hasValidTitle || !countryCode || countryCode === "Unknown") return null;

  // Extract URLs from media objects for the carousel
  const imageUrls = venue.media.map((item) => item.url);

  return (
    <div
      className="my-2 flex flex-col overflow-hidden rounded pb-4 shadow-lg dark:outline dark:outline-1 dark:outline-blue-800"
      style={{ width: "300px", maxWidth: "300px", height: "370px" }}
    >
      {/* Image container */}
      <CardImageCarousel
        images={imageUrls}
        countryName={validCountry}
        continent={validContinent}
        venueId={venue.id}
        venueName={venue.name}
      />
      {/* Title/Name */}
      <div
        className="flex w-full items-center px-4"
        style={{ height: "70px", alignItems: "flex-start" }}
      >
        <div className="font-bold">{venue.name}</div>
      </div>
      {/* Rating */}
      <div
        className="h-50px flex w-full items-center justify-between px-4"
        style={{ height: "50px" }}
      >
        <div className="flex items-center justify-start">
          <span className="me-1">{venue.rating.toFixed(1)}</span>
          <RatingStar rating={venue.rating} />
        </div>
        <button className="text-lg text-red-500" onClick={toggleFavorite}>
          {isFavorite ? <TbHeartFilled /> : <TbHeartPlus />}
        </button>
      </div>
      {/* Price / Night */}
      <div
        className="h-50px flex w-full items-center justify-between px-4"
        style={{ height: "50px" }}
      >
        <span>${venue.price} / night</span>
        <Link
          to={`/venues/${venue.id}`}
          className="hover:bg-hoverPrimary rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-primary shadow"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

VenueCard.propTypes = {
  venue: propTypes.shape({
    media: propTypes.arrayOf(
      propTypes.shape({
        url: propTypes.string.isRequired,
        alt: propTypes.string,
      })
    ).isRequired,
    name: propTypes.string.isRequired,
    rating: propTypes.number.isRequired,
    price: propTypes.number.isRequired,
    id: propTypes.string.isRequired,
    location: propTypes.shape({
      country: propTypes.string,
      continent: propTypes.string,
    }).isRequired,
  }).isRequired,
};

export default VenueCard;
