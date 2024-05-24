import PropTypes from "prop-types";
import { MdLocationPin } from "react-icons/md";

const VenueLocationSection = ({ location, description }) => {
  return (
    <div className="mt-6 space-y-2">
      <div className="mb-3 flex align-middle">
        <MdLocationPin className="mr-2 text-2xl text-red-500" />
        <p className="font-bold tracking-wide">
          {location.address}, {location.zip}{" "}
          {location.city || "Unspecified city"},{" "}
          {location.country || "Unspecified country"}
        </p>
      </div>
      <hr />
      <p className="py-3 tracking-wider">
        {description || "No description provided."}
      </p>
    </div>
  );
};

VenueLocationSection.propTypes = {
  location: PropTypes.shape({
    address: PropTypes.string,
    zip: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
  description: PropTypes.string,
};

export default VenueLocationSection;
