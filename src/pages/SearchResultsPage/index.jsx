import { useEffect, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PaginationButtons from "../../components/MUI/Pagination";
import { fetchApi } from "../../utils/fetchApi";
import { ENDPOINTS } from "../../constants/api";

function SearchResultsPage() {
  const location = useLocation();
  const [venues, setVenues] = useState([]);
  const [venuesMeta, setVenuesMeta] = useState({
    pageCount: 1,
    totalCount: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVenues = useCallback(async () => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    if (!query) return;

    setLoading(true);
    setError(null);

    let allVenues = [];
    let page = 1;
    let totalPages = 1;

    try {
      while (page <= totalPages) {
        const response = await fetchApi(
          `${ENDPOINTS.venues}/search?q=${encodeURIComponent(query)}&page=${page}`,
        );

        if (response && Array.isArray(response.data)) {
          allVenues = [...allVenues, ...response.data];
          totalPages = response.meta.pageCount;
          setVenuesMeta({
            pageCount: totalPages,
            totalCount: response.meta.totalCount,
            currentPage: page,
          });
          page += 1;
        } else {
          setError("No data found or unexpected format.");
          break;
        }
      }

      setVenues(allVenues);
    } catch (error) {
      setError(`Error searching venues: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [location.search]);

  useEffect(() => {
    fetchVenues();
  }, [location.search, fetchVenues]);

  const handlePageChange = (event, value) => {
    setVenuesMeta((prevMeta) => ({ ...prevMeta, currentPage: value }));
    fetchVenues(value);
  };

  return (
    <div className="venue-list-container mx-auto mt-8 flex flex-col items-center gap-4 overflow-x-hidden pb-4">
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
      {loading && <p>Loading...</p>}
      {venuesMeta.totalCount > 0 && (
        <h1>Total venues: {venuesMeta.totalCount}</h1>
      )}
      <PaginationButtons
        count={venuesMeta.pageCount}
        page={venuesMeta.currentPage}
        onChange={handlePageChange}
      />
      {venues.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 px-5">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <p>No venues found with the current filters.</p>
      )}
      <PaginationButtons
        count={venuesMeta.pageCount}
        page={venuesMeta.currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default SearchResultsPage;
