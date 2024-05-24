import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import defaultAvatarImage from "../../assets/images/default-profile-image.png";

const VenueManagerSection = ({ owner, created, updated }) => {
  const getAvatarUrl = (avatarUrl) => {
    if (!avatarUrl || avatarUrl === "https://url.com/image.jpg") {
      return defaultAvatarImage;
    }
    return avatarUrl;
  };

  return (
    <div
      style={{
        backgroundColor: "var(--header-bg-color)",
        color: "var(--profile-text-color)",
      }}
      className="manager-container flex w-full max-w-1200 flex-wrap items-center justify-start gap-4 rounded-lg py-4 md:justify-around"
    >
      <div className="manager-avatar ms-3 flex items-center">
        <img
          src={getAvatarUrl(owner?.avatar?.url)}
          alt="Illustration of the Manager's avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "1px 2px 4px var(--link-color)",
          }}
        />
        <p className="ms-3 flex flex-col">
          <strong>Venue is managed by</strong>{" "}
          <Link
            className="header-nav-links rounded"
            to={`/profile/${encodeURIComponent(owner?.name)}`}
          >
            {owner?.name}
          </Link>
        </p>
      </div>
      <div className="flex flex-col md:ms-3">
        <span className="ms-3 flex justify-between">
          <strong className="me-2">Venue Added:</strong>{" "}
          {new Date(created).toLocaleDateString()}
        </span>
        <span className="ms-3 flex justify-between">
          <strong className="me-2">Venue Updated:</strong>{" "}
          {new Date(updated).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

VenueManagerSection.propTypes = {
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  created: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
};

export default VenueManagerSection;
