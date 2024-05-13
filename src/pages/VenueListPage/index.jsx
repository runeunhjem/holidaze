import { useEffect } from "react";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PaginationButtons from "../../components/MUI/Pagination";
import useStore from "../../hooks/useStore";
import { fetchApi } from "../../utils/fetchApi";
import { ENDPOINTS } from "../../constants/api";
import Filters from "../../components/Filters"; // Make sure Filters is imported if it's used

function VenueListPage() {
  const {
    venues,
    venuesMeta,
    error,
    loading,
    currentPage,
    setCurrentPage,
    filters,
    venuesPerPage,
    setVenues,
    setLoading,
    setError,
    updateFilterOptions,
  } = useStore();

  useEffect(() => {
    async function fetchVenues() {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: venuesPerPage,
        sortOrder: "asc",
        _owner: true,
        _bookings: true,
        ...filters, // Ensure filters are applied correctly
      };
      const queryParams = new URLSearchParams(params).toString();

      try {
        const response = await fetchApi(
          `${ENDPOINTS.venues}?${queryParams.toString()}`,
        );
        if (response && response.data) {
          setVenues(response.data, response.meta);
          updateFilterOptions(response.data); // Update filter options based on the filtered venues
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        setError("Failed to fetch venues: " + error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [
    currentPage,
    venuesPerPage,
    filters,
    setLoading,
    setError,
    setVenues,
    updateFilterOptions,
  ]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Function to count active filters
  const countActiveFilters = () => {
    return Object.values(filters).reduce((count, value) => {
      if (value && value !== "" && !(Array.isArray(value) && value.length === 0)) {
        count += 1;
      }
      return count;
    }, 0);
  };

  const activeFilterCount = countActiveFilters();

  return (
    <div className="venue-list-container mx-auto mt-8 flex flex-col items-center gap-4 overflow-x-hidden pb-4">
      <Filters />
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
      {activeFilterCount > 0 && <p>You have {activeFilterCount} active filters</p>}
      {venues.length > 0 ? (
        <>
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
      ) : (
        <p>No venues found with the current filters.</p>
      )}
    </div>
  );
}

export default VenueListPage;
