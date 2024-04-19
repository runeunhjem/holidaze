import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";

export default function ButtonPair() {
  const theme = useTheme();

  return (
    <Button
      type="submit"
      aria-label="Submit search form"
      sx={{
        boxSizing: "border-box",
        width: "50%",
        height: "40px",
        borderRadius: "5px",
        fontSize: "1rem",
        textTransform: "none",
        backgroundColor: theme.palette.mode === "dark" ? "var(--yellow-400)" : "var(--sky-300)",
        color: theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--gray-900)",
        ":hover": {
          backgroundColor: theme.palette.mode === "dark" ? "var(--gray-800)" : "var(--sky-200)",
          borderColor: theme.palette.mode === "dark" ? "var(--yellow-400, #f0b429)" : "var(--sky-300, #77c9d4) !important",
          padding: "7px 16px 8px 16px",
          color: theme.palette.mode === "dark" ? "var(--yellow-400)" : "var(--gray-900)",
          border: "1px solid",
        },
        outline: "none",
        border: "none",
        boxShadow: "none",
      }}>
      Search
    </Button>
  );
}
