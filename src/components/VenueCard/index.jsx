import propTypes from "prop-types";
import { Link } from "react-router-dom";
import CardImageCarousel from "../MUI/CardImageCarousel"; // Adjust the path as necessary
import RatingStar from "../RatingStar";

function VenueCard({ venue }) {
  // Adjust condition to check for at least two images
  const hasAtLeastTwoImages = venue.media && venue.media.length >= 2;
  // const placeholderImage = "https://picsum.photos/seed/picsum/200/300"; // Placeholder image URL

  // If the venue doesn't have at least two images, don't render the card
  if (!hasAtLeastTwoImages) return null;

  return (
    <div
      className="rounded overflow-hidden shadow-lg my-2 flex flex-col pb-4 dark:outline dark:outline-1 dark:outline-blue-800"
      style={{ maxWidth: "300px", height: "370px" }}>
      {/* Image container */}
      <div>
        <Link to={`/venues/${venue.id}`}>
          <CardImageCarousel images={venue.media} />
        </Link>
      </div>
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
        <span className="me-1">{venue.rating.toFixed(2)}</span>
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
  }).isRequired,
};

export default VenueCard;
