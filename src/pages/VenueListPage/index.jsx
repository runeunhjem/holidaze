import { useEffect, useState } from "react";
import useVenues from "../../hooks/useVenues";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PaginationButtons from "../../components/MUI/Pagination";
import Filters from "../../components/Filters";

function VenueListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 100;
  const [filters, setFilters] = useState({});
  const { venues, venuesMeta, error, loading } = useVenues(
    Number(currentPage),
    filters,
    limit,
  ); // Ensure currentPage is a number

  const handleFiltersChange = (newFilters) => {
    setCurrentPage(1); // Reset page when filters change
    setFilters(newFilters);
  };

  useEffect(() => {
    console.log("Fetching venues for page:", currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    console.log("Page changed to:", value);
    setCurrentPage(Number(value)); // Ensure value is converted to a number
  };



  return (
    <div className="venue-list-container mx-auto flex flex-col items-center gap-4 overflow-x-hidden pb-4">
      <Filters onFiltersChange={handleFiltersChange} />
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}

      {loading && <p>Loading...</p>}

      {venuesMeta && venuesMeta.pageCount && (
        <>
          <PaginationButtons
            count={venuesMeta.pageCount}
            page={currentPage}
            onChange={handlePageChange}
          />

          <div className="flex flex-wrap justify-center gap-4 px-5">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>

          <PaginationButtons
            count={venuesMeta.pageCount}
            page={currentPage}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default VenueListPage;
