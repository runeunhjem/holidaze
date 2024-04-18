import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTextField: {
      // Assuming DatePicker uses TextField under the hood
      styleOverrides: {
        root: {
          input: {
            color: "green", // Change to your desired color
          },
        },
      },
    },
  },
});

export default function BasicDatePicker() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <div className="w-full flex justify-around gap-2">
            <DatePicker
              label="Check-in"
              className="w-1/2 z-10000"
              sx={{
                ".MuiInputLabel-root": {
                  color: (theme) => (theme.palette.mode === "dark" ? "var(--gray-400)" : "var(--gray-700)"),
                },
              }}
            />
            <DatePicker
              label="Check-out"
              className="w-1/2 z-10000"
              sx={{
                ".MuiInputLabel-root": {
                  color: (theme) => (theme.palette.mode === "dark" ? "var(--gray-400)" : "var(--gray-700)"),
                },
              }}
            />
          </div>
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
