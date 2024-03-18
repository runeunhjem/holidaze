import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function VenueCard({ venue }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-2">
      <img
        className="w-full"
        src={venue.media[0].url}
        alt={venue.media[0].alt !== null && venue.media[0].alt !== undefined ? venue.media[0].alt : "Image of venue"}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{venue.name}</div>
        <p className="text-gray-700 text-base">{venue.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Price: ${venue.price}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Max Guests: {venue.maxGuests}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Rating: {venue.rating}
        </span>
      </div>
      <div className="px-6 pt-4 pb-2">
        {venue.meta.wifi && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Wifi
          </span>
        )}
        {venue.meta.parking && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Parking
          </span>
        )}
        {venue.meta.breakfast && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Breakfast
          </span>
        )}
        {venue.meta.pets && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Pets Allowed
          </span>
        )}
      </div>
      <Link
        to={`/venues/${venue.id}`}
        className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
        View Details
      </Link>
    </div>
  );
}

VenueCard.propTypes = {
  venue: propTypes.object.isRequired,
};


export default VenueCard;
