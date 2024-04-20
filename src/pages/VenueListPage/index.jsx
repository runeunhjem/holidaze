import { useEffect, useState } from "react";
import useVenues from "../../hooks/useVenues";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
// import SingleButton from "../../components/MUI/SingleButton";
import PaginationButtons from "../../components/MUI/Pagination";
import { Button } from "@mui/material";

function VenueListPage() {
  useEffect(() => {
    document.title = "Holidaze - Destinations";
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.getElementsByTagName("head")[0].appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Explore our wide range of destinations from around the world to find your special place."
    );
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedVenues, setDisplayedVenues] = useState([]);
  const [loadMore, setLoadMore] = useState(10);
  const limit = 100; // Number of venues per page
  const { venues, error, totalPages, loading } = useVenues(currentPage, limit);

  useEffect(() => {
    setDisplayedVenues(venues.slice(0, 10)); // Initially display 10 venues
  }, [venues]);

  const handleShowMore = () => {
    const newLoadMore = Math.min(loadMore + 10, venues.length);
    setDisplayedVenues(venues.slice(0, newLoadMore));
    setLoadMore(newLoadMore);
  };

  const handleShowAll = () => {
    setDisplayedVenues(venues);
    setLoadMore(venues.length);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const remainingVenues = venues.length - displayedVenues.length;

  return (
    <div className="venue-list-container mx-auto flex flex-col items-center gap-4 pb-4">
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}

      {loading && <p>Loading...</p>}

      <PaginationButtons count={totalPages} page={currentPage} onChange={handlePageChange} />

      <div className="flex flex-wrap justify-center gap-4 px-5">
        {displayedVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      {loadMore < venues.length && (
        <Stack
          className="px-5"
          sx={{
            width: "100%", // Ensures the Stack takes the full width of its container
            maxWidth: 1200, // Max width of the stack
            margin: "auto", // Centers the stack horizontally within its container
            display: "flex", // Ensures that it behaves as a flex container
            flexDirection: "row", // Explicitly set the direction to row
            justifyContent: "center", // Center the buttons within the stack
            gap: 2, // Space between the buttons
          }}>
          <Button
            onClick={handleShowMore}
            sx={{
              maxWidth: 200, // Max width of the button
              flex: 1, // Each button takes equal space
              backgroundColor: "var(--button-bg-color)",
              color: "var(--button-text-color)",
              "&:hover": {
                outline: "1px solid var(--border-color)",
                backgroundColor: "var(--button-bg-color-hover)",
                color: "var(--button-text-color-hover)",
              },
            }}>
            Show More ({remainingVenues} left)
          </Button>
          <Button
            onClick={handleShowAll}
            sx={{
              maxWidth: 200, // Max width of the button
              flex: 1, // Each button takes equal space
              backgroundColor: "var(--button-bg-color)",
              color: "var(--button-text-color)",
              "&:hover": {
                outline: "1px solid var(--border-color)",
                backgroundColor: "var(--button-bg-color-hover)",
                color: "var(--button-text-color-hover)",
              },
            }}>
            Show All ({venues.length})
          </Button>
        </Stack>
      )}

      <PaginationButtons count={totalPages} page={currentPage} onChange={handlePageChange} />
    </div>
  );
}

export default VenueListPage;
