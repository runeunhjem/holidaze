import propTypes from "prop-types";
import { styled } from "@mui/system";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  300: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#005CBF",
  800: "#004499",
  900: "#111827",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#6b7280",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#111827",
};

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  position: "relative",
  borderRadius: "5px",
  border: `1px solid ${theme.palette.mode === "dark" ? grey[700] : "rgba(0,0,0, 0.3)"}`,
  "&:hover": {
    borderColor: theme.palette.mode === "dark" ? grey[300] : grey[700],
  },
  backgroundColor: theme.palette.mode === "dark" ? grey[900] : "transparent",
}));

const StyledInput = styled("input")(({ theme }) => ({
  width: "100%",
  height: "50px",
  alignItems: "center",
  padding: "12px",
  fontSize: "0.975rem",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  fontWeight: 400,
  borderRadius: "5px",
  lineHeight: 1.5,
  color: theme.palette.mode === "dark" ? grey[300] : grey[500],
  backgroundColor: theme.palette.mode === "dark" ? grey[900] : "transparent",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? grey[700] : grey[100],
  outline: "none",
  "&::placeholder": {
    color: "transparent",
  },
  "&:focus": {
    border: "1px solid",
    borderColor: theme.palette.mode === "dark" ? grey[300] : blue[500],
  },
  "&:focus + label": {
    color: theme.palette.mode === "dark" ? blue[300] : blue[400],
  },
  "&:not(:focus):placeholder-shown + label": {
    color: theme.palette.mode === "dark" ? grey[500] : grey[500],
  },
  "&:focus + label, &:not(:placeholder-shown) + label": {
    transform: "scale(0.75) translateY(-10px) translateX(16px)",
    backgroundColor: theme.palette.mode === "dark" ? grey[900] : "#fff",
    padding: "0 6px",
  },
}));

const StyledLabel = styled("label")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  padding: "12px",
  pointerEvents: "none",
  transformOrigin: "top left",
  transition: "transform 0.2s, color 0.2s",
  color: theme.palette.mode === "dark" ? grey[100] : grey[500],
}));

function DestinationInput({ label, ...props }) {
  return (
    <Container>
      <StyledInput {...props} id="DestinationInputId" placeholder=" " type="text" label="Destination" />
      <StyledLabel htmlFor="DestinationInputId">{label}</StyledLabel>
    </Container>
  );
}

DestinationInput.propTypes = {
  label: propTypes.string.isRequired,
};

export default DestinationInput;
