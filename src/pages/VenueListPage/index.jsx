import { useEffect, useState } from "react";
import { getVenues } from "../../utils/getVenues";
import VenueCard from "../../components/VenueCard";
// import VenueCard from "../../components/VenueCardV2";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import PaginationButtons from "../../components/MUI/Pagination";

function VenueListPage() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Set to 10 as given
  const navigate = useNavigate();
  const limit = 100; // Number of venues per page
  const totalVenues = 600; // Total number of venues

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const { data, error } = await getVenues(currentPage, limit);
        setTotalPages(Math.ceil(totalVenues / limit));
        if (error) {
          throw new Error(error);
        }
        setVenues(data);
        console.log("Fetched venues:", data.length);
      } catch (error) {
        setError(error.toString());
      }
    };

    fetchVenues();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleBackClick = () => {
    navigate("/"); // Adjust as needed
  };

  return (
    <div className="venue-list-container mx-auto flex flex-col items-center gap-4">
      {error && (
        <>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>
          <Button variant="contained" onClick={handleBackClick} style={{ marginBottom: "20px" }}>
            Back Home
          </Button>
        </>
      )}
       <PaginationButtons count={totalPages} page={currentPage} onChange={handlePageChange} />
      <div className="flex flex-wrap justify-center gap-4 px-5">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}

export default VenueListPage;
