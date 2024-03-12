import PropTypes from "prop-types";
import Header from "../Header";
import Footer from "../Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

// My File/folder structure
// > public
// > src
//   > assets;
//     > images;
//     > logo;
//   > components;
//     > App;
//       - index.jsx
//     > Footer;
//       - index.jsx
//     > Header;
//       - index.jsx
//     > Layout;
//       - index.jsx
//   > hooks;
//   > pages;
//       - LogIn;
//       - Register
//   > styles;
// - index.css
// - main.jsx

// Path: src/components/App/index.jsx
