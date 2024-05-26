import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ToggleTheme from "../ToggleTheme";
import SearchBar from "../SearchBar";
import MenuListComposition from "../MUI/ProfileMenu";
import { Link } from "react-router-dom";
import { StyledHeader } from "./index.styled";
import useStore from "../../hooks/useStore";
import logoLight from "../../assets/logo/holidaze-dark.png";
import logoDark from "../../assets/logo/holidaze-yellow.png";
import NavigationMenu from "../MUI/NavigationMenu";
import FilterButton from "../MUI/FilterButton";
import FavoriteProfilesDropdown from "../../components/FavoriteProfilesDropdown";
import "./index.css";

const pages = ["Home", "Destinations", "About", "Contact"];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { isDarkMode, userDetails, favoriteProfiles } = useStore();
  const logo = isDarkMode ? logoDark : logoLight;
  const { toggleOptionsOpen, toggleFiltersOpen } = useStore();

  useEffect(() => {
    toggleOptionsOpen();
    toggleFiltersOpen();
  }, [toggleOptionsOpen, toggleFiltersOpen]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        !event.target.closest(
          ".header-container, .MuiDayCalendar-weekContainer",
        )
      ) {
        if (isOpen) {
          setIsOpen(false);
        }
        setIsSearchVisible(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpen]);

  return (
    <StyledHeader
      theme={isDarkMode ? "dark" : "light"}
      className="header-container"
    >
      <div className="container mx-auto max-w-6xl items-center justify-between md:flex">
        <Link
          to="/"
          style={{
            backgroundColor: "var(--header-bg-color)",
            "&:hover": {
              backgroundColor: "var(--header-bg-color)",
            },
          }}
        >
          <img
            src={logo}
            alt="Illustration of the Holidaze logo"
            style={{
              height: "70px",
              width: "100px",
              position: "absolute",
              top: "6px",
              left: "-2px",
            }}
          />
        </Link>
        <div className="m-0 flex w-full items-center justify-between p-0">
          <div>
            <Link to="/" className="logo ms-20 flex text-xl font-bold">
              Holidaze
            </Link>
          </div>
          <NavigationMenu className="flex md:hidden" />
          <nav
            className={`me-1 hidden items-start justify-start text-left md:flex ${isOpen ? "flex" : "hidden"}`}
          >
            {pages.map((page, index) => (
              <Link
                to={`/${page.toLowerCase()}`}
                key={page}
                className={`header-nav-links md:text-md z-1000 mx-2 my-1 text-left md:flex ${
                  index === pages.length - 1 ? "md:mr-0" : "md:mx-2"
                }`}
              >
                {page}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="me-3 flex max-w-1200 items-start justify-between md:mx-auto md:justify-end">
        <div className="m-0 w-full p-0 text-left"></div>
        <button
          onClick={() => setIsSearchVisible(!isSearchVisible)}
          aria-label="Search"
        >
          <FiSearch
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="my-4 me-3 cursor-pointer items-center"
            size={20}
          />
          <span className="visually-hidden">Search</span>
        </button>
        <ToggleTheme className="my-4 items-center" />

        <MenuListComposition className="m-0 w-full justify-end p-0" />
      </div>
      {isSearchVisible && (
        <SearchBar onClose={() => setIsSearchVisible(false)} />
      )}
      <nav
        style={{
          zIndex: 1000,
          width: "120px",
          border: "1px solid var(--border-color)",
          borderRadius: "5px",
          position: "absolute",
          top: "50px",
          right: "10px",
        }}
        className={`items-Start flex justify-start bg-white text-left md:hidden dark:bg-gray-900 ${
          isOpen ? "flex-col" : "hidden"
        }`}
      >
        {pages.map((page, index) => (
          <Link
            to={`/${page.toLowerCase()}`}
            key={page}
            className={`md:text-md z-1000 mx-2 my-1 text-left md:flex ${
              index === pages.length - 1 ? "md:mr-0" : "md:mx-2"
            }`}
          >
            {page}
          </Link>
        ))}
      </nav>

      <FilterButton />
      <div className="me-4 flex max-w-1200 justify-between text-right sm:-mt-2 md:mx-auto">
        {favoriteProfiles.length > 0 && <FavoriteProfilesDropdown />}
        {favoriteProfiles.length === 0 && <FavoriteProfilesDropdown />}
        {userDetails.name ? (
          <span className="flex flex-col items-end sm:flex-row sm:items-center">
            Welcome back
            <Link
              to={`/profile/${userDetails.name}`}
              className="header-nav-links"
              style={{
                color: "var(--profile-text-color)",
                paddingRight: 0,
              }}
            >
              {userDetails.name}
            </Link>
          </span>
        ) : (
          <div className="rounded pt-0.5 sm:pt-4">
            Welcome, please{" "}
            <Link
              className="header-nav-links rounded ps-1"
              to="/login"
              style={{
                color: "var(--button-bg-color-hover-cancel)",
              }}
            >
              log in
            </Link>
          </div>
        )}
      </div>
    </StyledHeader>
  );
}

export default Header;
