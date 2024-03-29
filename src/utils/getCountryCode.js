import { getCode } from "country-list";

function getCountryCode(countryName) {
  return getCode(countryName) || "Unknown";
}

export default getCountryCode;

{/* <CountryFlag countryCode={getCountryCode(venue.location.country)} />; */}
