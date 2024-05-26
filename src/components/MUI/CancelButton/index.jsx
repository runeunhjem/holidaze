import propTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";

const CancelButton = ({ onClick }) => {
  const theme = useTheme();
  return (
    <Button
      type="button"
      onClick={onClick}
      sx={{
        width: "50%",
        borderRadius: "5px",
        fontSize: "1rem",
        textTransform: "none",
        backgroundColor:
          theme.palette.mode === "dark" ? "var(--red-700)" : "var(--red-500)",
        color:
          theme.palette.mode === "dark" ? "var(--gray-100)" : "var(--gray-900)",
        "&:hover": {
          color:
            theme.palette.mode === "dark"
              ? "var(--gray-900) !important"
              : "var(--gray-100)",
          backgroundColor:
            theme.palette.mode === "dark" ? "var(--red-500)" : "var(--red-700)",
        },
        outline: "none",
        border: "none",
        boxShadow: "none",
      }}
    >
      Cancel
    </Button>
  );
};

CancelButton.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default CancelButton;
