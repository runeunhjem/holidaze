import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PaginationButtons from "../../components/MUI/Pagination";
import useStore from "../../hooks/useStore";  // Assuming this hook provides access to the application state and methods

function SearchResultsPage() {
  const { venues, venuesMeta, loading, error, setCurrentPage, setFilter } = useStore();
  const location = useLocation();

  useEffect(() => {
    // Extract the URL parameters and set filters accordingly
    const searchParams = new URLSearchParams(location.search);
    const filters = {
      city: searchParams.get("city"),
      country: searchParams.get("country"),
      continent: searchParams.get("continent"),
      guests: searchParams.get("guests"),
      dateFrom: searchParams.get("dateFrom"),
      dateTo: searchParams.get("dateTo"),
    };

    console.log("Using filters:", filters);

    setFilter(filters);  // Make sure this method properly updates the filters used for fetching venues
    // Fetch venues based on new filters
  }, [location.search, setFilter]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="venue-list-container mx-auto mt-8 flex flex-col items-center gap-4 overflow-x-hidden pb-4">
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
      {loading && <p>Loading...</p>}
      <PaginationButtons
        count={venuesMeta?.pageCount || 0}
        page={venuesMeta?.currentPage || 1}
        onChange={handlePageChange}
      />
      {venues.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 px-5">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <p>No venues found with the current filters. Please adjust your search criteria.</p>
      )}
    </div>
  );
}

export default SearchResultsPage;
