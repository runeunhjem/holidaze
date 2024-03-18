import { useState } from "react";
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import ToggleTheme from "../ToggleTheme";
import SearchBar from "../SearchBar";
import MenuListComposition from "../MUI/Menu";

const pages = ["Home", "Venues", "Profile", "About", "Contact"];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State to control the visibility of the SearchBar

  return (
    <header className="text-gray-800 bg-white p-5 pb-2 dark:bg-gray-900 dark:text-gray-100 border-b w-full mx-auto">
      <div className="container mx-auto md:flex justify-between items-center max-w-6xl">
        <div className="flex items-center w-full p-0 m-0 justify-between">
          <a href="/" className="font-bold text-xl">
            Holidaze
          </a>
          <nav className={`hidden md:flex items-start justify-start text-left ${isOpen ? "flex" : "hidden"}`}>
            {pages.map((page) => (
              <a key={page} href={`/${page.toLowerCase()}`} className="text-left md:flex text-lg mx-2 my-1 md:my-0">
                {page}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex items-start mx-auto justify-between md:justify-end max-w-1200">
        <div className="text-left w-full p-0 m-0">
          <button onClick={() => setIsOpen(!isOpen)} className="text-xl my-4 md:hidden">
            {isOpen ? <FiX /> : <FiMenu />}
            <span className="hidden">Menu</span>
          </button>
          <nav className={`flex flex-col md:hidden items-start justify-start text-left ${isOpen ? "flex-col" : "hidden"}`}>
            {pages.map((page) => (
              <a key={page} href={`/${page.toLowerCase()}`} className="text-left md:flex text-lg mx-2 my-1 md:my-0">
                {page}
              </a>
            ))}
          </nav>
        </div>
        <button onClick={() => setIsSearchVisible(!isSearchVisible)}>
          <FiSearch
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className="cursor-pointer me-3 my-4 items-center"
            size={20}
          />
          <span className="hidden">Search</span>
        </button>
        <button>
          <FiUser className="cursor-pointer me-3 my-4 items-center" size={20} />
          <span className="hidden">Profile</span>
        </button>
        <button>
          <FiShoppingCart className="cursor-pointer me-3 my-4 items-center" size={20} />
          <span className="hidden">Cart</span>
        </button>
        <ToggleTheme className="items-center my-4" />

        <MenuListComposition className="m-0 p-0 justify-end w-full" />
      </div>
      {isSearchVisible && <SearchBar />}
    </header>
  );
}

export default Header;
