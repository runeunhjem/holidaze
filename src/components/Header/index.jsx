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

const pages = ["Home", "Destinations", "About", "Contact"];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { isDarkMode } = useStore();

  const logo = isDarkMode ? logoDark : logoLight;

  // Effect for closing the menu when clicking anywhere on the page
  useEffect(() => {
    const handleDocumentClick = () => {
      // Close the menu if it's open
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // Add event listener when the menu is open
    if (isOpen) {
      document.addEventListener("click", handleDocumentClick);
    }

    // Cleanup the event listener when the component unmounts or isOpen changes
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [isOpen]);
  return (
    <StyledHeader theme={isDarkMode ? "dark" : "light"}>
      <div className="container mx-auto md:flex justify-between items-center max-w-6xl">
        <Link to="/" className="font-bold text-xl flex">
          <img
            src={logo}
            alt="Illustration of the Holidaze logo"
            style={{ height: "70px", width: "100px", position: "absolute", top: "6px", left: "-2px" }}
          />
        </Link>
        <div className="flex items-center w-full p-0 m-0 justify-between">
          <>
            <Link to="/" className="font-bold text-xl flex ms-20 logo">
              Holidaze
            </Link>
            {/* <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from propagating to the document
                setIsOpen(!isOpen);
              }}
              className="text-xl md:hidden me-3"
              style={{ zIndex: 1000 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}>
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button> */}
          </>
            <NavigationMenu className="flex md:hidden"/>
          <nav className={`hidden md:flex items-start justify-start me-1 text-left ${isOpen ? "flex" : "hidden"}`}>
            {pages.map((page) => (
              <Link
                to={`/${page.toLowerCase()}`}
                key={page}
                className="text-left md-flex md:text-md mx-2 my-1 md:my-0 z-1000 ">
                {page}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex items-start mx-auto me-3 justify-between md:justify-end max-w-1200">
        <div className="text-left w-full p-0 m-0">

        </div>
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
      {isSearchVisible && <SearchBar />}
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
        {pages.map((page) => (
          <Link to={`/${page.toLowerCase()}`} key={page} className="w-full text-left md:flex text-sm mx-auto my-1 md:my-0">
            {page}
          </Link>
        ))}
      </nav>
    </StyledHeader>
  );
}

export default Header;

