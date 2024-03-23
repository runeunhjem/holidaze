import propTypes from "prop-types";
import { Link } from "react-router-dom";
import CardImageCarousel from "../MUI/CardImageCarousel"; // Adjust the path as necessary
import RatingStar from "../RatingStar";

function VenueCard({ venue }) {
  // Placeholder image URL
  const placeholderImage = "https://picsum.photos/200/300";

  // Prepare images for carousel or use placeholder if none
  const imagesForCarousel =
    venue.media && venue.media.length > 0
      ? venue.media.map((img) => img.url) // Extract URL strings if images exist
      : [placeholderImage]; // Use placeholder if no images

  return (
    <div
      className="rounded overflow-hidden shadow-lg my-2 flex flex-col pb-4 dark:outline dark:outline-1 dark:outline-blue-800"
      style={{ maxWidth: "300px", height: "auto" }}>
      {/* Image container */}
      <div>
        <Link to={`/venues/${venue.id}`}>
          <CardImageCarousel images={imagesForCarousel} />
        </Link>
      </div>
      {/* Title/Name */}
      <div className="px-4 py-2">
        <div className="font-bold text-xl mb-2">{venue.name}</div>
      </div>
      {/* Rating */}
      <div className="px-4 py-1">
        <RatingStar rating={venue.rating || 0} />
        <span className="text-sm ml-2">{venue.rating ? venue.rating.toFixed(2) : "N/A"}</span>
      </div>
      {/* Price / Night */}
      <div className="px-4 py-2 flex justify-between items-center">
        <span className="text-lg">${venue.price} / night</span>
        <Link to={`/venues/${venue.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
    rating: propTypes.number,
    price: propTypes.number.isRequired,
    id: propTypes.string.isRequired,
  }).isRequired,
};

export default VenueCard;
