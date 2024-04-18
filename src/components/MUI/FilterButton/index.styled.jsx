import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const FilterButtonStyled = styled(Button)(({ theme }) => ({
  boxSizing: "border-box",
  width: "87px",
  height: "20px",
  position: "absolute",
  bottom: "-20px",
  left: "50%",
  transform: "translateX(-50%)",
  borderRadius: "0 0 5px 5px",
  fontSize: "0.9rem",
  fontWeight: "bold",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "var(--yellow-400)" : "var(--sky-300)",
  backgroundColor: theme.palette.mode === "dark" ? "var(--yellow-400)" : "var(--sky-300)",
  color: theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--gray-900)",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--sky-200)",
    borderColor: theme.palette.mode === "dark" ? "var(--yellow-400, #f0b429)" : "var(--sky-300, #77c9d4) !important",

    color: theme.palette.mode === "dark" ? "var(--yellow-400)" : "var(--sky-900)",
    border: "1px solid",
  },
  outline: "none",
  boxShadow: "none",
  textTransform: "none",
}));
