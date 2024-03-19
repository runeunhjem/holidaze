import propTypes from "prop-types";
import { Link } from "react-router-dom";
import CardImageCarousel from "../MUI/CardImageCarousel"; // Adjust the path as necessary

function VenueCard({ venue }) {
  // Adjust condition to check for at least two images
  const hasAtLeastTwoImages = venue.media && venue.media.length >= 2;
  // const placeholderImage = "https://picsum.photos/seed/picsum/200/300"; // Placeholder image URL

  // If the venue doesn't have at least two images, don't render the card
  if (!hasAtLeastTwoImages) return null;

  return (
    <div className="rounded overflow-hidden shadow-lg my-2 flex flex-col" style={{ maxWidth: "300px", height: "350px" }}>
      {/* Image container */}
      <div className="h-200px w-300px relative">
        <CardImageCarousel images={venue.media} />
      </div>
      {/* Title/Name */}
      <div className="h-50px w-full flex items-center px-4" style={{ height: "50px" }}>
        <div className="font-bold">{venue.name}</div>
      </div>
      {/* Rating */}
      <div className="h-50px w-full flex items-center px-4" style={{ height: "50px" }}>
        <span>Rating: {venue.rating}</span>
      </div>
      {/* Price / Night */}
      <div className="h-50px w-full flex items-center justify-between px-4" style={{ height: "50px" }}>
        <span>${venue.price} / night</span>
        <Link to={`/venues/${venue.id}`} className="bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white">
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
