import propTypes from "prop-types";
import ReactCountryFlag from "react-country-flag";

function CountryFlag({ countryCode }) {
  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: "2em",
        height: "auto",
        borderRadius: "50%",
      }}
      title={countryCode}
    />
  );
}

CountryFlag.propTypes = {
  countryCode: propTypes.string.isRequired,
};

export default CountryFlag;
