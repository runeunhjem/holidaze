import PropTypes from "prop-types";
import Header from "../Header";
import Footer from "../Footer";
import * as S from "./index.styled";

function Layout({ children }) {
  return (
    <S.LayoutContainer className="App">
      <Header />
      <S.MainContent>{children}</S.MainContent>
      <Footer />
    </S.LayoutContainer>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
