import { useEffect, useState } from "react";
import { FiMenu, FiX, FiSearch, FiShoppingCart } from "react-icons/fi";
import ToggleTheme from "../ToggleTheme";
import SearchBar from "../SearchBar";
import MenuListComposition from "../MUI/Menu";
import { Link } from "react-router-dom";
import { StyledHeader } from "./index.styled";
import useStore from "../../hooks/useStore";

const pages = ["Home", "Destinations", "About", "Contact"];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { isDarkMode } = useStore();

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
        <div className="flex items-center w-full p-0 m-0 justify-between">
          <Link to="/" className="font-bold text-xl">
            Holidaze
          </Link>
          <nav className={`hidden md:flex items-start justify-start text-left ${isOpen ? "flex" : "hidden"}`}>
            {pages.map((page) => (
              <Link to={`/${page.toLowerCase()}`} key={page} className="text-left md:flex md:text-md mx-2 my-1 md:my-0">
                {page}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex items-start mx-auto justify-between md:justify-end max-w-1200">
        <div className="text-left w-full p-0 m-0">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from propagating to the document
              setIsOpen(!isOpen);
            }}
            className="text-xl my-4 md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
          <nav className={`flex flex-col md:hidden items-start justify-start text-left ${isOpen ? "flex-col" : "hidden"}`}>
            {pages.map((page) => (
              <Link to={`/${page.toLowerCase()}`} key={page} className="text-left md:flex text-sm mx-2 my-1 md:my-0">
                {page}
              </Link>
            ))}
          </nav>
        </div>
        <button onClick={() => setIsSearchVisible(!isSearchVisible)} aria-label="Search">
          <FiSearch
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="cursor-pointer me-3 my-4 items-center"
            size={20}
          />
          <span className="hidden">Search</span>
        </button>
        <button aria-label="Shopping cart">
          <FiShoppingCart className="cursor-pointer me-3 my-4 items-center" size={20} />
          <span className="hidden">Cart</span>
        </button>
        <ToggleTheme className="items-center my-4" />

        <MenuListComposition className="m-0 p-0 justify-end w-full" />
      </div>
      {isSearchVisible && <SearchBar />}
    </StyledHeader>
  );
}

export default Header;
