import { Button as BaseButton, buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { useTheme } from "@emotion/react";

export default function CustomButton() {

  const theme = useTheme();

  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{
        width: "100%",
        height: "40px",
        justifyContent: "center",
      }}>
      <Button
        type="submit"
        aria-label="Submit search form"
        sx={{
          boxSizing: "border-box",
          width: "50%",
          height: "40px",
          borderRadius: "5px",
          fontSize: "1rem",
          backgroundColor: theme.palette.mode === "dark" ? "var(--yellow-400)" : "var(--sky-300)",
          color: theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--gray-900)",
          ":hover": {
            backgroundColor: theme.palette.mode === "dark" ? "var(--gray-900)" : "var(--sky-200)",
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
      <Button
        type="button"
        aria-label="Cancel search form"
        sx={{
          width: "50%",
          borderRadius: "5px",
          fontSize: "1rem",
          backgroundColor: theme.palette.mode === "dark" ? "var(--red-700)" : "var(--red-500)",
          color: theme.palette.mode === "dark" ? "var(--gray-100)" : "var(--gray-900)",
          ":hover": {
            color: theme.palette.mode === "dark" ? "var(--gray-900) !important" : "var(--gray-100)",
            backgroundColor: theme.palette.mode === "dark" ? "var(--red-500)" : "var(--red-700)",
          },
          outline: "none",
          border: "none",
          boxShadow: "none",
        }}>
        Cancel
      </Button>
    </Stack>
  );
}

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[600]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[800]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
    outline: none;
  }

  &.${buttonClasses.disabled} {
    background-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
  `
);
