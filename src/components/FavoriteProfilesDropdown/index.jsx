import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import "./index.css";

const FavoriteProfilesDropdown = () => {
  const navigate = useNavigate();
  const { favoriteProfiles, removeFavoriteProfile, addFavoriteProfile } =
    useStore();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const defaultFavorites = [
      { id: "Spooky", name: "Spooky" },
      { id: "kyrre", name: "kyrre" },
      { id: "ninuskaninus", name: "ninuskaninus" },
      { id: "mrgold", name: "mrgold" },
      { id: "vaz01", name: "vaz01" },
    ];
    defaultFavorites.forEach((profile) => {
      if (!favoriteProfiles.some((p) => p.name === profile.name)) {
        addFavoriteProfile(profile);
      }
    });
  }, [favoriteProfiles, addFavoriteProfile]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleNavigation = (profileName) => {
    navigate(`/profile/${encodeURIComponent(profileName)}`);
    setIsOpen(false);
  };

  const handleRemove = (profileId, event) => {
    event.stopPropagation();
    removeFavoriteProfile(profileId);
    setIsOpen(false);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative ps-8" ref={dropdownRef}>
      <button
        style={{
          color: "var(--profile-text-color)",
          backgroundColor: "var(--header-bg-color)",
          outline: "none",
          border: "none",
          textDecoration: "none",
          "&:hover": { backgroundColor: "var(--header-bg-color)" },
        }}
        onClick={toggleDropdown}
        className="rounded-md pt-0"
      >
        ❤️ Fav&apos;s
      </button>

      {isOpen && (
        <ul
          style={{
            color: "var(--profile-text-color)",
            backgroundColor: "var(--header-bg-color)",
            minWidth: "200px",
            top: "30px",
            border: "1px solid var(--border-color)",
            textDecoration: "none",
          }}
          className="absolute z-10 mt-1 w-full rounded-md"
        >
          {favoriteProfiles.length > 0 ? (
            favoriteProfiles.map((profile) => (
              <li
                key={profile.name}
                style={{
                  "&:hover": {
                    backgroundColor: "var(--menu-hover-bg-color) !important",
                    // color: "var(--gray-900) !important",
                  },
                }}
                className="flex cursor-pointer items-center justify-between rounded-md p-2 menu-hover"
                onClick={() => handleNavigation(profile.name)}
              >
                {profile.name}
                <RiDeleteBin6Line
                  className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
                  onClick={(e) => handleRemove(profile.name, e)}
                />
              </li>
            ))
          ) : (
            <li
              className="flex cursor-pointer items-center justify-between rounded-md p-2"
              style={{
                color: "var(--profile-text-color)",
                backgroundColor: "var(--header-bg-color)",
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
