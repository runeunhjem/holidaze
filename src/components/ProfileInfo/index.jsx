// ProfileInfo.js
import PropTypes from "prop-types";
import { TbHomeEdit, TbUserEdit } from "react-icons/tb";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import "./index.css";

const ProfileInfo = ({ viewedProfile }) => {
  return (
    <div className="profile-info container mx-auto w-full max-w-1200 px-4 pb-8 pt-20">
      {/* Centered Heading */}
      <h1 className="text-center text-4xl font-bold capitalize">
        {viewedProfile.name}
      </h1>

      {/* Conditional rendering for profile type */}
      {viewedProfile.venueManager ? (
        <div className="mt-2 flex items-center justify-center">
          <TbHomeEdit className="me-2 text-2xl" />
          <h2 className="text-2xl font-bold capitalize">Venue Manager</h2>
        </div>
      ) : (
        <div className="mt-2 flex items-center justify-center">
          <HiOutlineUser className="me-2 text-2xl" />
          <h2 className="text-2xl font-bold capitalize">Registered User</h2>
        </div>
      )}

      {/* Edit profile */}
      <div className="mt-2 flex items-center justify-center">
        <TbUserEdit className="me-2 text-2xl" />
        <h2 className="text-2xl font-bold capitalize">Edit Profile</h2>
      </div>

      {/* Email information */}
      <div className="mt-2 flex items-center justify-center">
        <MdOutlineMarkEmailRead className="text-1xl me-2" />
        <h3 className="text-1xl text-center font-bold">
          {viewedProfile.email}
        </h3>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  viewedProfile: PropTypes.object.isRequired,
};

export default ProfileInfo;
