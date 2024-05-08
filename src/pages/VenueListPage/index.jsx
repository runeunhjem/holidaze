import { useEffect } from "react";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PaginationButtons from "../../components/MUI/Pagination";
import Filters from "../../components/Filters";
import Options from "../../components/Options";
import useStore from "../../hooks/useStore";

function VenueListPage() {
  const {
    venues,
    venuesMeta,
    error,
    loading,
    currentPage,
    setCurrentPage,
    // options,
  } = useStore((state) => ({
    venues: state.venues,
    venuesMeta: state.venuesMeta,
    error: state.error,
    loading: state.loading,
    currentPage: state.currentPage,
    setCurrentPage: state.setCurrentPage,
    options: state.options,
  }));

  useEffect(() => {
    console.log("Fetching venues for page:", currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(Number(value));
  };

  return (
    <div className="venue-list-container mx-auto mt-8 flex flex-col items-center gap-4 overflow-x-hidden pb-4">
      <Options />
      <Filters />
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
