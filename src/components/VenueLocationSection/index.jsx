import PropTypes from "prop-types";
import { MdLocationPin } from "react-icons/md";
import GoogleMap from "../GoogleMap";

const VenueLocationSection = ({ location, description }) => {
  return (
    <div className="mt-6 space-y-2">
          <p className="py-3 tracking-wider">
            {description || "No description provided."}
          </p>
      <hr
        style={{
          borderTop: "0px solid var(--border-color)",
          width: "75%",
          margin: "0 auto",
          marginBottom: "3rem",
        }}
      />
      <div className="location mb-3 flex w-full flex-col !justify-between gap-4 sm:flex-row">
        <div
          className="mb-3 w-full flex-col items-start p-4 sm:flex sm:w-1/2 md:w-1/4 md:items-end"
          style={{
            backgroundColor: "var(--header-bg-color)",
            borderRadius: "15px",
          }}
        >
          <div className="flex justify-end whitespace-nowrap text-right font-bold tracking-wide">
            <MdLocationPin className="mr-2 ms-4 text-2xl text-red-500" />
            <span className="w-full whitespace-nowrap text-left font-bold tracking-wide sm:text-right">
              {location.address}
            </span>
          </div>
          <div className="flex justify-end whitespace-nowrap text-right font-bold tracking-wide">
            <MdLocationPin className="invisible mr-2 ms-4 text-2xl text-red-500" />
            <p className="w-full whitespace-nowrap text-left font-bold tracking-wide sm:text-right">
              {location.zip || "Zip"} {location.city || "Unspecified city"}
            </p>
          </div>
          <div className="flex justify-end whitespace-nowrap text-right font-bold tracking-wide">
            <MdLocationPin className="invisible mr-2 ms-4 text-2xl text-red-500" />
            <p className="w-full whitespace-nowrap text-left font-bold tracking-wide sm:text-right">
              {location.country || "Unspecified country"}
            </p>
          </div>
          <div className="flex justify-end whitespace-nowrap text-right font-bold tracking-wide">
            <MdLocationPin className="invisible mr-2 ms-4 text-2xl text-red-500" />
            <p className="w-full whitespace-nowrap text-left font-bold tracking-wide sm:text-right">
              {location.continent || "Unspecified continent"}
            </p>
          </div>
        </div>
        <div
          className="mb-3 flex w-full flex-col items-start sm:w-1/2 md:w-3/4"
          style={{
            backgroundColor: "transparent",
            borderRadius: "15px",
          }}
        >
          <GoogleMap location={location} />
        </div>
      </div>
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
