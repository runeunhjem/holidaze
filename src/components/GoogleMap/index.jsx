// src/components/GoogleMap/index.jsx
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useStore from "../../hooks/useStore";
import { nightModeStyles } from "./mapStyles";

const GoogleMap = ({ location }) => {
  const mapRef = useRef(null);
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isDarkMode } = useStore((state) => ({
    isDarkMode: state.isDarkMode,
  }));

  useEffect(() => {
    const initMap = (lat, lng, styles) => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 15,
          styles,
        });

        new google.maps.Marker({
          position: { lat, lng },
          map,
        });
      }
    };

    const geocodeAddress = () => {
      const geocoder = new google.maps.Geocoder();
      const address = `${location.address}, ${location.city}, ${location.zip}, ${location.country}`;

      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          const { lat, lng } = results[0].geometry.location;
          const styles = isDarkMode ? nightModeStyles : null;
          initMap(lat(), lng(), styles);
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status,
          );
        }
      });
    };

    const styles = isDarkMode ? nightModeStyles : null;

    if (window.google) {
      if (
        location.lat &&
        location.lng &&
        location.lat !== 0 &&
        location.lng !== 0
      ) {
        initMap(location.lat, location.lng, styles);
      } else {
        geocodeAddress();
      }
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = () => {
        if (
          location.lat &&
          location.lng &&
          location.lat !== 0 &&
          location.lng !== 0
        ) {
          initMap(location.lat, location.lng, styles);
        } else {
          geocodeAddress();
        }
      };
      document.head.appendChild(script);
    }
  }, [location, GOOGLE_MAPS_API_KEY, isDarkMode]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "99%",
        maxWidth: "90%",
        minHeight: "150px",
        height: "100%",
        borderRadius: "15px",
        boxShadow: "1px 1px 10px 0 var(--link-color-hover)",
        margin: "0 auto",
      }}
    />
  );
};

GoogleMap.propTypes = {
  location: PropTypes.shape({
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    zip: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
};

export default GoogleMap;


