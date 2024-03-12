import { useState } from "react";
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import ToggleTheme from "../ToggleTheme"; // Ensure the path is correct

const pages = ["Home", "About", "Services", "Blog", "Contact"];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-gray-200 p-5 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-xl mr-6 md:hidden">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
          <a href="/" className="font-bold text-xl">
            Holidaze
          </a>
        </div>
        <nav className={`md:flex items-center ${isOpen ? "block" : "hidden"}`}>
          {pages.map((page) => (
            <a key={page} href={`/${page.toLowerCase()}`} className="text-lg mx-2 my-2 md:my-0">
              {page}
            </a>
          ))}
          <div className="flex items-center ml-4">
            <FiSearch className="mr-4" />
            <FiUser className="mr-4" />
            <FiShoppingCart className="mr-4" />
            <ToggleTheme />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
