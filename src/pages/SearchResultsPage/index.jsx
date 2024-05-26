import { useEffect, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PaginationButtons from "../../components/MUI/Pagination";
import { fetchApi } from "../../utils/fetchApi";
import { ENDPOINTS, PARAMS } from "../../constants/api";
import dayjs from "dayjs";
import useStore from "../../hooks/useStore";
import { ClipLoader } from "react-spinners";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta";

function SearchResultsPage() {
  const location = useLocation();
  const { filters } = useStore();
  const [venues, setVenues] = useState([]);
  const [venuesMeta, setVenuesMeta] = useState({
    pageCount: 1,
    totalCount: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isRangeBooked = (venue, start, end) => {
    return venue.bookings?.some((booking) => {
      const fromDate = new Date(booking.dateFrom);
      const toDate = new Date(booking.dateTo);
      return (
        (start <= fromDate && end >= fromDate) ||
        (start >= fromDate && start <= toDate) ||
        (start <= fromDate && end >= toDate)
      );
    });
  };

  const fetchVenues = useCallback(async () => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");
    const dateFrom = searchParams.get("dateFrom")
      ? new Date(searchParams.get("dateFrom"))
      : null;
    const dateTo = searchParams.get("dateTo")
      ? new Date(searchParams.get("dateTo"))
      : null;
    const guests = searchParams.get("guests");

    setLoading(true);
    setError(null);

    let allVenues = [];
    let page = 1;
    let totalPages = 1;

    try {
      while (page <= totalPages) {
        let response;
        if (query) {
          response = await fetchApi(
            `${ENDPOINTS.venues}/search?q=${encodeURIComponent(query)}&page=${page}${PARAMS.sortBy}${PARAMS.sortOrder}${PARAMS._bookings}`,
          );
        } else {
          response = await fetchApi(
            `${ENDPOINTS.venues}?page=${page}${PARAMS.sortBy}${PARAMS.sortOrder}${PARAMS._bookings}`,
          );
        }

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

      if (dateFrom && dateTo) {
        allVenues = allVenues.filter(
          (venue) => !isRangeBooked(venue, dateFrom, dateTo),
        );
      }

      if (guests) {
        allVenues = allVenues.filter((venue) => venue.maxGuests >= guests);
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");
    setTitleAndMeta(
      `Holidaze - Search Results${query ? ` for "${query}"` : ""}`,
      "Explore the search results for your desired venues and find your perfect stay.",
    );
  }, [location.search]);

  const handlePageChange = (event, value) => {
    setVenuesMeta((prevMeta) => ({ ...prevMeta, currentPage: value }));
    fetchVenues(value);
  };

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const guests = searchParams.get("guests");

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
      {(query || dateFrom || dateTo || guests || activeFilterCount > 0) && (
        <div
          style={{
            backgroundColor: "var(--header-bg-color)",
            color: "var(--header-text-color)",
            borderRadius: "10px",
            maxWidth: "100%",
            width: "600px",
            border: "1px solid var(--border-color)",
            textAlign: "center",
            padding: "1rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          className="info-box rounded"
        >
          {venuesMeta.totalCount > 0 && (
            <h1 className="">
              A total of {venuesMeta.totalCount} venues include your query:{" "}
              <strong> {query}</strong>.
            </h1>
          )}
          <p className="flex w-full flex-wrap items-center justify-center">
            We have {venues.length} available venues{" "}
            {dateFrom && (
              <span className="ml-2 whitespace-nowrap">
                with check-in{" "}
                <strong>{dayjs(dateFrom).format("YYYY-MM-DD")}</strong>
              </span>
            )}
            {dateTo && (
              <span className="ml-2 whitespace-nowrap">
                and check-out{" "}
                <strong>{dayjs(dateTo).format("YYYY-MM-DD")}</strong>
              </span>
            )}
            {guests && (
              <span className="ml-2 whitespace-nowrap">
                for <strong>{guests}</strong> guests
              </span>
            )}
          </p>

          <p>
            {activeFilterCount > 0 && (
              <span>
                {" "}
                You also have <strong>{activeFilterCount}</strong> active
                filters
              </span>
            )}
          </p>
        </div>
      )}

      <PaginationButtons
        count={venuesMeta.pageCount}
        page={venuesMeta.currentPage}
        onChange={handlePageChange}
      />
      {!loading && venues.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 px-5">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        !loading && <p>No venues found with the current filters.</p>
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
