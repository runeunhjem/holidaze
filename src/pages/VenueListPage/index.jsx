import { useEffect, useState } from "react";
import { getVenues } from "../../utils/getVenues";
import VenueCard from "../../components/VenueCard";
// import VenueCard from "../../components/VenueCardV2";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function VenueListPage() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      const { data, error } = await getVenues();
      setVenues(data);
      setError(error);
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
      <div className="flex flex-wrap justify-center gap-4 px-5">
        {Array.isArray(venues) && venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
      </div>
    </div>
  );
}

export default VenueListPage;
