import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

const FavoriteProfilesDropdown = () => {
  const navigate = useNavigate();
  const { favoriteProfiles, removeFavoriteProfile, userDetails } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleNavigation = (profileName) => {
    navigate(`/profile/${encodeURIComponent(profileName)}`);
    setIsOpen(false); // Close the dropdown after navigation
  };

  const handleRemove = (profileId, event) => {
    event.stopPropagation(); // Prevent navigation when clicking the bin
    removeFavoriteProfile(profileId);
    setIsOpen(false); // Optionally close the dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative md:ps-8" ref={dropdownRef}>
      <button
        style={{
          color: "var(--profile-text-color)",
          backgroundColor: "var(--header-bg-color)",
          outline: "none",
          border: "none",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "var(--header-bg-color)",
          },
        }}
        onClick={toggleDropdown}
        className="rounded-md pt-0"
      >
        ❤️ Fav&apos;s
      </button>
      {isOpen && (
        <ul
          style={{
            color: "var(--username-color)",
            backgroundColor: "var(--header-bg-color)",
            minWidth: "200px",
            top: "30px",
            border: "1px solid var(--border-color)",
            textDecoration: "none",
          }}
          className="absolute z-10 mt-1 w-full rounded-md"
        >
          {favoriteProfiles.length > 0 ? (
            favoriteProfiles
              .filter((p) => p.name !== userDetails.name)
              .map((profile) => (
                <li
                  key={profile.id}
                  style={{
                    color: "var(--username-color)",
                    backgroundColor: "var(--header-bg-color)",
                    outline: "none",
                    textDecoration: "none",
                  }}
                  className="flex cursor-pointer items-center justify-between rounded-md p-2"
                  onClick={() => handleNavigation(profile.name)}
                >
                  {profile.name}
                  <RiDeleteBin6Line
                    className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
                    onClick={(e) => handleRemove(profile.id, e)}
                  />
                </li>
              ))
          ) : (
            <li
              className="flex cursor-pointer items-center justify-between rounded-md p-2"
              style={{
                color: "var(--profile-text-color)",
                backgroundColor: "var(--header-bg-color)",
                padding: "10px",
                textAlign: "center",
                cursor: "default",
              }}
            >
              No favorites added
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default FavoriteProfilesDropdown;
