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

const pages = ["Home", "Destinations", "About", "Contact"];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { isDarkMode } = useStore();
  const logo = isDarkMode ? logoDark : logoLight;

  useEffect(() => {
    // This function handles closing the menu when clicking outside of the header container
    const handleDocumentClick = (event) => {
      if (!event.target.closest(".header-container, .MuiDayCalendar-weekContainer")) {
        if (isOpen) {
          setIsOpen(false);
        }
        setIsSearchVisible(false);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("click", handleDocumentClick);

    // Clean up the event listener when the component unmounts or the dependency changes
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpen]); // Only re-run the effect if isOpen changes

  return (
    <StyledHeader theme={isDarkMode ? "dark" : "light"} className="header-container">
      <div className="container mx-auto md:flex justify-between items-center max-w-6xl">
        <Link to="/" className="font-bold text-xl flex">
          <img
            src={logo}
            alt="Illustration of the Holidaze logo"
            style={{ height: "70px", width: "100px", position: "absolute", top: "6px", left: "-2px" }}
          />
        </Link>
        <div className="flex items-center w-full p-0 m-0 justify-between">
          <div>
            <Link to="/" className="font-bold text-xl flex ms-20 logo">
              Holidaze
            </Link>
          </div>
          <NavigationMenu className="flex md:hidden" />
          <nav className={`hidden md:flex items-start justify-start me-1 text-left ${isOpen ? "flex" : "hidden"}`}>
            {pages.map((page, index) => (
              <Link
                to={`/${page.toLowerCase()}`}
                key={page}
                className={`text-left md:flex md:text-md mx-2 my-1 z-1000 ${
                  index === pages.length - 1 ? "md:mr-0" : "md:mx-2"
                }`}>
                {page}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex items-start md:mx-auto me-3 justify-between md:justify-end max-w-1200">
        <div className="text-left w-full p-0 m-0"></div>
        <button onClick={() => setIsSearchVisible(!isSearchVisible)} aria-label="Search">
          <FiSearch
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="cursor-pointer me-3 my-4 items-center"
            size={20}
          />
          <span className="hidden">Search</span>
        </button>
        <ToggleTheme className="items-center my-4" />

        <MenuListComposition className="m-0 p-0 justify-end w-full" />
      </div>
      {isSearchVisible && <SearchBar onClose={() => setIsSearchVisible(false)} />}
      <nav
        style={{
          zIndex: 1000,
          width: "120px",
          border: "1px solid #fbbf24",
          borderRadius: "5px",
          position: "absolute",
          top: "50px",
          right: "10px",
        }}
        className={`flex md:hidden items-Start bg-white dark:bg-gray-900 justify-start text-left ${
          isOpen ? "flex-col" : "hidden"
        }`}>
        {pages.map((page, index) => (
          <Link
            to={`/${page.toLowerCase()}`}
            key={page}
            className={`text-left md:flex md:text-md mx-2 my-1 z-1000 ${
              index === pages.length - 1 ? "md:mr-0" : "md:mx-2"
            }`}>
            {page}
          </Link>
        ))}
      </nav>

      <FilterButton />
    </StyledHeader>
  );
}

export default Header;

