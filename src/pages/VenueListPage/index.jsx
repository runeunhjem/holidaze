import { useEffect, useState } from "react";
import useVenues from "../../hooks/useVenues";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PaginationButtons from "../../components/MUI/Pagination";

function VenueListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { venues, venuesMeta, error, loading } = useVenues(currentPage, limit);

  useEffect(() => {
    // console.log("Fetching venues for page:", currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    console.log("Page changed to:", value);
    setCurrentPage(value);
  };

  return (
    <div className="venue-list-container mx-auto flex flex-col items-center gap-4 pb-4">
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}

      {loading && <p>Loading...</p>}

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
    </div>
  );
}

export default VenueListPage;
