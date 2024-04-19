// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider } from "styled-components";
import { TextField, createTheme } from "@mui/material";
import dayjs from "dayjs";

const theme = createTheme();

export default function DatePickers() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const today = dayjs();

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    // Reset check-out date if it is before the new check-in date
    if (date && checkOutDate && date.isAfter(checkOutDate, "day")) {
      setCheckOutDate(null);
    }
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-full flex justify-around gap-2">
          <DatePicker
            label="Check-in"
            value={checkInDate}
            onChange={handleCheckInDateChange}
            minDate={today}
            TextField={(params) => <TextField {...params} fullWidth />}
          />
          <DatePicker
            label="Check-out"
            value={checkOutDate}
            onChange={handleCheckOutDateChange}
            minDate={checkInDate ? checkInDate.add(1, "day") : today}
            TextField={(params) => <TextField {...params} fullWidth />}
          />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
