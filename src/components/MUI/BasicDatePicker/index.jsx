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
  const [dateFromDate, setDateFromDate] = useState(null);
  const [dateToDate, setDateToDate] = useState(null);
  const today = dayjs();

  const handleDateFromDateChange = (date) => {
    setDateFromDate(date);
    // Reset check-out date if it is before the new check-in date
    if (date && dateToDate && date.isAfter(dateToDate, "day")) {
      setDateToDate(null);
    }
  };

  const handleDateToDateChange = (date) => {
    setDateToDate(date);

  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-full flex justify-around gap-2">
          <DatePicker
          className="w-full md:w-1/2"
            label="Check-in"
            value={dateFromDate}
            onChange={handleDateFromDateChange}
            minDate={today}
            TextField={(params) => <TextField {...params} fullWidth />}
          />
          <DatePicker
          className="w-full md:w-1/2"
            label="Check-out"
            value={dateToDate}
            onChange={handleDateToDateChange}
            minDate={dateFromDate ? dateFromDate.add(1, "day") : today}
            TextField={(params) => <TextField {...params} fullWidth />}
          />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
