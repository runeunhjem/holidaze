import propTypes from "prop-types";
import ReactCountryFlag from "react-country-flag";
import unknownFlag from "../../assets/images/unknown-flag.svg";

function CountryFlag({ countryCode }) {
  if (countryCode === "Unknown") {
    return (
      <img
        src={unknownFlag}
        alt="Unspecified Country"
        title="Unspecified Country"
        style={{
          width: "2rem",
          height: "auto",
          borderRadius: "5px",
        }}
      />
    );
  }

  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: "2rem",
        height: "auto",
        borderRadius: "5px",
      }}
      title={ countryCode }
      alt={ countryCode }
    />
  );
}

CountryFlag.propTypes = {
  countryCode: propTypes.string.isRequired,
};

export default CountryFlag;
