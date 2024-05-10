import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CardImageCarousel from "../MUI/CardImageCarousel";
import RatingStar from "../RatingStar";
import { TbHeartPlus, TbHeartFilled } from "react-icons/tb";
import useStore from "../../hooks/useStore";
import {
  hasValidImages,
  hasValidTitle,
  hasValidCountry,
  hasValidContinent,
  hasMinimumImages,
  sanitizeFields,
} from "../../utils/filters";
import "./index.css";

function VenueCard({ venue }) {
  const { options, favorites, addFavoriteVenue, removeFavoriteVenue, filters } =
    useStore();

  const [isFavorite, setIsFavorite] = useState(
    favorites.some((fav) => fav.id === venue.id),
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkFilters = () => {
      return (
        hasValidImages(venue.media, options) &&
        hasValidTitle(venue.name, options) &&
        hasValidCountry(venue.location.country, options) &&
        hasValidContinent(venue.location.continent, options) &&
        hasMinimumImages(venue.media, options)
      );
    };

    setIsVisible(checkFilters());
    setIsFavorite(favorites.some((fav) => fav.id === venue.id));
  }, [favorites, venue, options, filters]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteVenue(venue.id);
    } else {
      addFavoriteVenue(venue);
    }
    setIsFavorite(!isFavorite);
  };

  if (!isVisible) return null;

  const sanitizedVenue = {
    ...venue,
    name: sanitizeFields(venue.name),
    country: sanitizeFields(venue.location.country),
    continent: sanitizeFields(venue.location.continent),
    price: sanitizeFields(`${venue.price}`),
  };
  return (
    <div
      className="wrapper relative my-2 flex flex-col overflow-hidden rounded pb-4 shadow-lg"
      style={{
        width: "300px",
        maxWidth: "300px",
        height: "370px",
        outline: "1px solid var(--border-color)",
      }}
    >
      <CardImageCarousel
        images={venue.media.map((item) => item.url)}
        countryName={sanitizedVenue.country}
        continent={sanitizedVenue.continent}
        venueId={venue.id}
        venueName={sanitizedVenue.name}
      />
      <div className="card-info">
        <div
          className="flex w-full items-center px-4"
          style={{ height: "40px", alignItems: "flex-start" }}
        >
          <div className="font-bold">{sanitizedVenue.name}</div>
        </div>
        <div
          className="h-50px flex w-full items-center justify-between px-4"
          style={{ height: "50px", transition: "transform 0.3s" }}
        >
          <div className="flex items-center justify-start pt-8">
            <span className="me-1">{venue.rating.toFixed(1)}</span>
            <RatingStar rating={venue.rating} />
          </div>
          <button
            className="pt-8 text-lg text-red-500"
            onClick={toggleFavorite}
          >
            {isFavorite ? (
              <TbHeartFilled className="text-xl transition-transform hover:scale-125" />
            ) : (
              <TbHeartPlus className="text-xl transition-transform hover:scale-125" />
            )}
          </button>
        </div>
        <div
          className="h-50px flex w-full items-center justify-between px-4"
          style={{ height: "50px", transition: "transform 0.3s" }}
        >
          <span>${venue.price} / night</span>
          <Link
            to={`/venues/${venue.id}`}
            className="venue-card-button px-3 py-1 text-sm font-semibold shadow"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

VenueCard.propTypes = {
  venue: PropTypes.shape({
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    location: PropTypes.shape({
      country: PropTypes.string,
      continent: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default VenueCard;
