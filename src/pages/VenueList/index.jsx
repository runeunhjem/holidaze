import { useEffect, useState } from "react";
import { fetchApi } from "../../utils/fetchApi";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function VenueList() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await fetchApi("venues");
        if (Array.isArray(data)) {
          setVenues(data);
        } else if (Array.isArray(data.data)) {
          setVenues(data.data);
        } else {
          setVenues([]);
        }
        setError(""); // Reset error state in case of successful fetch
      } catch (error) {
        console.error("Failed to fetch venues:", error);
        setError("Failed to fetch venues. Please try again later."); // Set error message
        setVenues([]);
      }
    };

    fetchVenues();
  }, []);

  // Handler for the "Back to Venues" button
  const handleBackClick = () => {
    navigate("/"); // Navigate back to the root or wherever your venues list is
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
      <div className="flex flex-wrap justify-center gap-4">
        {Array.isArray(venues) && venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
      </div>
    </div>
  );
}

export default VenueList;

