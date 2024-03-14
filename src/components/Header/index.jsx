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
    <header className="text-gray-800 bg-white p-5 dark:bg-gray-900 dark:text-gray-100 border-b ">
      <div className="container mx-auto md:flex justify-between items-center">
        <div className="flex items-center w-full justify-between">
          <a href="/" className="font-bold text-xl">
            Holidaze
          </a>
          <button onClick={() => setIsOpen(!isOpen)} className="text-xl mr-6 md:hidden">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        <nav className={`md:flex items-center ${isOpen ? "block" : "hidden"}`}>
          {pages.map((page) => (
            <a key={page} href={`/${page.toLowerCase()}`} className="text-lg mx-2 my-2 md:my-0">
              {page}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center mx-auto justify-between md:justify-end fs-1">
        <button onClick={() => setIsSearchVisible(!isSearchVisible)}>
          <FiSearch className="mx-1" />
        </button>
        <FiUser className="mx-1" />
        <FiShoppingCart className="mx-1" />
        <ToggleTheme />
        <MenuListComposition className="m-0 p-0" />
      </div>
      {isSearchVisible && <SearchBar />}
    </header>
  );
}

export default Header;
