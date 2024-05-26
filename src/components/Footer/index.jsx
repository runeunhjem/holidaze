import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaYoutube,
  FaChevronUp,
} from "react-icons/fa";
import useStore from "../../hooks/useStore";
import logoLight from "../../assets/logo/holidaze-dark.png";
import logoDark from "../../assets/logo/holidaze-yellow.png";
import * as S from "./index.styled";

function Footer() {
  const { isDarkMode } = useStore();
  const logo = isDarkMode ? logoDark : logoLight;

  return (
    <S.StyledFooter theme={isDarkMode ? "dark" : "light"} className="flex-col sm:flex-row">
      <div className="footer-section footer-left">
        <Link className="header-nav-links flex sm:ms-8 text-center" to="/">Home</Link>
        <Link className="header-nav-links flex sm:ms-8 text-center" to="/about">About Us</Link>
        <Link className="header-nav-links flex sm:ms-8 text-center" to="/contact">Contact Us</Link>
        <Link className="header-nav-links flex sm:ms-8 text-center" to="/destinations">Destinations</Link>
      </div>
      <div className="footer-section footer-middle">
        <h4 className="flex justify-center text-center w-full">Follow us on</h4>
        <h5 className="flex justify-center text-center w-full mb-4">social media</h5>
        <div className="social-icons">
          <a
            href="https://www.snapchat.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSnapchat className="social-icon" />
            <span className="visually-hidden">Snapchat</span>
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="social-icon" />
            <span className="visually-hidden">Facebook</span>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon" />
            <span className="visually-hidden">Instagram</span>
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="social-icon" />
            <span className="visually-hidden">YouTube</span>
          </a>
        </div>
      </div>
      <div className="footer-section footer-right">
        <div className="back-to-top w-full">
          <FaChevronUp
            className="back-to-top-icon w-full"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>
        <Link to="/" className="logo w-full flex justify-center">
          <img src={logo} alt="Holidaze Logo" className="footer-logo sm:ps-6" />
        </Link>
      </div>
      <S.FooterText>
        &copy; {new Date().getFullYear()} Holidaze. All rights reserved.
      </S.FooterText>
      <S.FooterText className="credits">
        Design and development by{" "}
        <Link to="https://portfolio1-ca.netlify.app/" target="_new">
          Rune Unhjem
        </Link>
      </S.FooterText>
    </S.StyledFooter>
  );
}

export default Footer;
