import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import "../../pages/VenueDetailsPage/index.css";

const VenueDeletedSnackbar = ({
  open,
  message,
  onClose,
  autoHideDuration = 3000,
  anchorOrigin = { vertical: "top", horizontal: "center" },
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <div className="overlay-success-alert">{message}</div>
    </Snackbar>
  );
};

VenueDeletedSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  autoHideDuration: PropTypes.number,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(["top", "bottom"]),
    horizontal: PropTypes.oneOf(["left", "center", "right"]),
  }),
};

export default VenueDeletedSnackbar;
