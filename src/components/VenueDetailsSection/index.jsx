import PropTypes from "prop-types";
import { RiStarSFill } from "react-icons/ri";
import { FiWifi } from "react-icons/fi";
import { TbParking } from "react-icons/tb";
import { MdFastfood, MdPets } from "react-icons/md";

const VenueDetailsSection = ({ venue }) => {
  return (
    <div className="details-container">
      <div className="details-left">
        <p
          className="font-bold"
          style={{
            color: "var(--profile-text-color)",
          }}
        >
          Details:
        </p>
        <ul className="details-list">
          <li className="flex w-full whitespace-nowrap align-top">
            <strong className="me-1">Price:</strong> ${venue.price || "N/A"} /
            night
          </li>
          <li className="flex w-full whitespace-nowrap align-top">
            <strong className="me-1">Max Guests:</strong>{" "}
            {venue.maxGuests || "N/A"}
          </li>
          <li className="flex w-full whitespace-nowrap align-top">
            <strong>Rating:</strong>
            <RiStarSFill className="mt-0.3 inline text-xl text-yellow-500" />
            {venue.rating || "No rating"} stars
          </li>
        </ul>
      </div>

      {venue.meta && (
        <div className="details-right">
          <p
            className="font-bold"
            style={{
              color: "var(--profile-text-color)",
            }}
          >
            Amenities:
          </p>
          <ul className="amenities-list">
            {venue.meta.wifi && (
              <li className="flex">
                <FiWifi className="amenities me-3 text-xl" />
                Free Wi-Fi
              </li>
            )}
            {venue.meta.parking && (
              <li className="flex">
                <TbParking className="amenities me-3 text-xl" />
                Free Parking
              </li>
            )}
            {venue.meta.breakfast && (
              <li className="flex">
                <MdFastfood className="amenities me-3 text-xl" />
                Breakfast included
              </li>
            )}
            {venue.meta.pets && (
              <li className="flex">
                <MdPets className="amenities me-3 text-xl" />
                Pets Allowed
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

VenueDetailsSection.propTypes = {
  venue: PropTypes.shape({
    price: PropTypes.number,
    maxGuests: PropTypes.number,
    rating: PropTypes.number,
    meta: PropTypes.shape({
      wifi: PropTypes.bool,
      parking: PropTypes.bool,
      breakfast: PropTypes.bool,
      pets: PropTypes.bool,
    }),
  }).isRequired,
};

export default VenueDetailsSection;
