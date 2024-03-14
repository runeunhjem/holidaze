import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <div className="w-full flex justify-around gap-2">
          <DatePicker label="Check-in" className="w-1/2" />
          <DatePicker label="Check-out" className="w-1/2" />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
