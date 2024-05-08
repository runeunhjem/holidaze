import { useEffect } from "react";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PaginationButtons from "../../components/MUI/Pagination";
import Filters from "../../components/Filters";
import Options from "../../components/Options";
import useStore from "../../hooks/useStore";
import { fetchApi } from "../../utils/fetchApi";
import { ENDPOINTS } from "../../constants/api";

function VenueListPage() {
  const {
    venues,
    venuesMeta,
    error,
    loading,
    currentPage,
    setCurrentPage,
    filters,
    setVenues,
    setLoading,
    setError,
  } = useStore((state) => ({
    venues: state.venues,
    venuesMeta: state.venuesMeta,
    error: state.error,
    loading: state.loading,
    currentPage: state.currentPage,
    setCurrentPage: state.setCurrentPage,
    filters: state.filters,
    setVenues: state.setVenues,
    setLoading: state.setLoading,
    setError: state.setError,
  }));

  useEffect(() => {
    async function fetchVenues() {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        sortBy: "name",
        sortOrder: "asc",
        ...filters,
      };
      const queryParams = new URLSearchParams(params).toString();

      try {
        const response = await fetchApi(`${ENDPOINTS.venues}?${queryParams}`);
        if (response && response.data && response.meta) {
          setVenues(response.data, response.meta);
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
  }, [currentPage, filters, setLoading, setError, setVenues]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
