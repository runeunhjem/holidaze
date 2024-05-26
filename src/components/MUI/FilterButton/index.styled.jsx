import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  maxWidth: "100%",
  boxSizing: "border-box",
  height: "20px",
  position: "absolute",
  bottom: "-20px",
  left: "50%",
  transform: "translateX(-50%)",
});

// Filtering out the activeCount prop before passing the remaining props to the Button component
export const FilterButtonStyled = styled(({ activeCount, ...other }) => (
  <Button {...other} />
))(({ theme, activeCount }) => ({
  borderRadius: "0 0 5px 5px",
  fontSize: "0.9rem",
  border: "1px solid",
  borderColor:
    theme.palette.mode === "dark" ? "var(--yellow-400)" : "var(--sky-300)",
  backgroundColor:
    theme.palette.mode === "dark" ? "var(--yellow-400)" : "var(--sky-300)",
  color: theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--gray-900)",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--sky-200)",
    borderColor:
      theme.palette.mode === "dark"
        ? "var(--yellow-400)"
        : "var(--sky-300) !important",
    color:
      theme.palette.mode === "dark" ? "var(--yellow-400)" : "var(--sky-900)",
    border: "1px solid",
  },
  outline: "none",
  boxShadow: "none",
  textTransform: "none",
  width: activeCount > 0 ? "150px" : "120px",
  transition: "width 0.3s ease-in-out",
}));
