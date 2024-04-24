import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function RatingStar({ rating }) {
  return (
    <Stack spacing={1}>
      <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
    </Stack>
  );
}

RatingStar.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default RatingStar;
