import propTypes from "prop-types";
import { Link } from "react-router-dom";
import CardImageCarousel from "../MUI/CardImageCarousel"; // Adjust the path as necessary
import RatingStar from "../RatingStar";
import getCountryCode from "../../utils/getCountryCode";

function VenueCard({ venue }) {
  const countryCode = getCountryCode(venue.location.country);

  // Check for at least one image and a valid country code
  const hasAtLeastOneImage = venue.media && venue.media.length > 0;
  const hasValidTitle = venue.name && !venue.name.includes("zz");
  if (!hasAtLeastOneImage || !hasValidTitle || !countryCode || countryCode === "Unknown") return null;
  // if (!hasAtLeastOneImage || !countryCode || countryCode === "Unknown") return null;

  // console.log(venue);
  return (
    <div
      className="rounded overflow-hidden shadow-lg my-2 flex flex-col pb-4 dark:outline dark:outline-1 dark:outline-blue-800"
      style={{ width: "300px", maxWidth: "300px", height: "370px" }}>
      {/* Image container */}
      <CardImageCarousel
        images={venue.media}
        countryName={venue.location.country}
        continent={venue.location.continent}
        venueId={venue.id}
        venueName={venue.name}
      />
      <div></div>
      {/* Title/Name */}
      <div
        className="w-full flex items-center px-4"
        style={{
          height: "70px",
          alignItems: "flex-start",
        }}>
        <div className="font-bold">{venue.name}</div>
      </div>
      {/* Rating */}
      <div className="h-50px w-full flex items-center px-4" style={{ height: "50px" }}>
        <span className="me-1">{venue.rating.toFixed(1)}</span>
        <RatingStar rating={venue.rating} />
      </div>
      {/* Price / Night */}
      <div className="h-50px w-full flex items-center justify-between px-4" style={{ height: "50px" }}>
        <span>${venue.price} / night</span>
        <Link
          to={`/venues/${venue.id}`}
          className="bg-secondary hover:bg-hoverPrimary rounded-full px-3 py-1 text-sm font-semibold text-primary shadow">
          View Details
        </Link>
      </div>
    </div>
  );
}

VenueCard.propTypes = {
  venue: propTypes.shape({
    media: propTypes.arrayOf(propTypes.string).isRequired,
    name: propTypes.string.isRequired,
    rating: propTypes.number.isRequired,
    price: propTypes.number.isRequired,
    id: propTypes.string.isRequired,
    location: propTypes.shape({
      country: propTypes.string.isRequired,
      continent: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default VenueCard;
