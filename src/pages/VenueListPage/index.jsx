import { useEffect } from "react";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PaginationButtons from "../../components/MUI/Pagination";
import useStore from "../../hooks/useStore";
import { fetchApi } from "../../utils/fetchApi";
import { ENDPOINTS } from "../../constants/api";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta";
import "./index.css";

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
    resetFilters,
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
        ...filters,
      };
      const queryParams = new URLSearchParams(params).toString();

      try {
        const response = await fetchApi(
          `${ENDPOINTS.venues}?${queryParams.toString()}`,
        );
        if (response && response.data) {
          setVenues(response.data, response.meta);
          updateFilterOptions(response.data);
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

  useEffect(() => {
    setTitleAndMeta(
      "Holidaze - Venues List",
      "Explore our wide range of venues from around the world to find your perfect stay.",
    );
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const countActiveFilters = () => {
    return Object.values(filters).reduce((count, value) => {
      if (
        value &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        count += 1;
      }
      return count;
    }, 0);
  };

  const activeFilterCount = countActiveFilters();

  return (
    <div className="venue-list-container mx-auto mt-8 flex flex-col items-center gap-4 overflow-x-hidden pb-4">
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
      {loading && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <ClipLoader color="var(--link-color)" loading={loading} size={50} />
          <p className="mt-4">Finding venues for you...</p>
        </div>
      )}
      {!loading && (
        <>
          <h1 className="span-info">
            We have {venuesMeta.totalCount} locations for you to choose from
          </h1>
          <div className="pagination-container flex justify-center">
            <PaginationButtons
              count={venuesMeta.pageCount}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
          {activeFilterCount > 0 && (
            <span className="span-info">
              You have {activeFilterCount} active filters{" "}
              <Link onClick={resetFilters} className="reset-link">
                [reset]
              </Link>
            </span>
          )}
          {venues.length > 0 ? (
            <div>
              <div className="flex flex-wrap justify-center gap-4 px-5">
                {venues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
              <div className="pagination-bottom-container flex justify-center">
                <PaginationButtons
                  count={venuesMeta.pageCount}
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          ) : (
            <p>
              No venues found with the current filters. Please check the next
              page or adjust your filters/options to show more.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default VenueListPage;
