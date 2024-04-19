import PropTypes from "prop-types";
import Header from "../Header";
import Footer from "../Footer";
import * as S from "./index.styled";
import { useState } from "react";
import SearchBar from "../SearchBar";

function Layout({ children }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  return (
    <S.LayoutContainer className="App">
      <Header onSearchClick={toggleSearch} />
      {isSearchVisible && <SearchBar onClose={toggleSearch} />}
      <S.MainContent>{children}</S.MainContent>
      <Footer />
    </S.LayoutContainer>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
