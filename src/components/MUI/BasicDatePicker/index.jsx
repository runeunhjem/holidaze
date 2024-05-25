import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider } from "styled-components";
import { TextField, createTheme } from "@mui/material";
import dayjs from "dayjs";

const theme = createTheme();

export default function BasicDatePickers({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  onCloseDatepicker,
}) {
  const today = dayjs();

  const handleDateFromChange = (date) => {
    setDateFrom(date);
    if (date && dateTo && date.isAfter(dateTo, "day")) {
      setDateTo(null);
    }
    onCloseDatepicker();
  };

  const handleDateToChange = (date) => {
    setDateTo(date);
    onCloseDatepicker();
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex w-full justify-around gap-2">
          <DatePicker
            className="w-full md:w-1/2"
            label="Check-in"
            value={dateFrom}
            onChange={handleDateFromChange}
            minDate={today}
            slots={{ textField: TextField }} // Use the textField slot
          />
          <DatePicker
            className="w-full md:w-1/2"
            label="Check-out"
            value={dateTo}
            onChange={handleDateToChange}
            minDate={dateFrom ? dateFrom.add(1, "day") : today}
            slots={{ textField: TextField }} // Use the textField slot
          />
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

BasicDatePickers.propTypes = {
  dateFrom: PropTypes.object,
  setDateFrom: PropTypes.func,
  dateTo: PropTypes.object,
  setDateTo: PropTypes.func,
  onCloseDatepicker: PropTypes.func,
};
