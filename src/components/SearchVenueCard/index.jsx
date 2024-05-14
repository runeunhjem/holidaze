import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TbHeartPlus, TbHeartFilled } from "react-icons/tb";
import RatingStar from "../RatingStar";
import useStore from "../../hooks/useStore";
import "./index.css";

function SearchVenueCard({ venue, onClose }) {
  const { favorites, addFavoriteVenue, removeFavoriteVenue } = useStore();
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((fav) => fav.id === venue.id),
  );

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.id === venue.id));
  }, [favorites, venue.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent the search bar from closing
    if (isFavorite) {
      removeFavoriteVenue(venue.id);
    } else {
      addFavoriteVenue(venue);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="search-venue-card-wrapper">
      <div className="search-venue-card">
        <img
          src={venue.media[0]?.url}
          alt={venue.media[0]?.alt || venue.name}
          className="search-venue-image"
          onClick={onClose}
        />
        <div className="search-venue-info">
          <div className="search-venue-name truncate">
            {venue.name}
          </div>
          <div className="search-venue-details">
            <div className="search-venue-rating">
              <span className="me-1">{venue.rating.toFixed(1)}</span>
              <RatingStar rating={venue.rating} />
            </div>
            <div className="search-venue-actions">
              <button className="text-lg text-red-500" onClick={toggleFavorite}>
                {isFavorite ? (
                  <TbHeartFilled className="text-xl transition-transform hover:scale-125" />
                ) : (
                  <TbHeartPlus className="text-xl transition-transform hover:scale-125" />
                )}
                <span className="visually-hidden">Toggle favorite</span>
              </button>
              <div className="search-venue-price">${venue.price} / night</div>
            </div>
          </div>
          <Link
            to={`/venues/${venue.id}`}
            className="search-venue-link"
            onClick={onClose}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

SearchVenueCard.propTypes = {
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
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchVenueCard;
