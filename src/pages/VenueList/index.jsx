import { useEffect, useState } from "react";
import { fetchApi } from "../../utils/fetchApi";
import VenueCard from "../../components/VenueCard";

function VenueList() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await fetchApi("venues");
        // Check if data is an array; if not, check if data.data is an array
        // If neither, set venues to an empty array to avoid errors
        if (Array.isArray(data)) {
          setVenues(data);
        } else if (Array.isArray(data.data)) {
          setVenues(data.data);
        } else {
          setVenues([]);
        }
      } catch (error) {
        console.error("Failed to fetch venues:", error);
        setVenues([]); // Ensure venues is set to an empty array on error
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Array.isArray(venues) && venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)}
    </div>
  );
}

export default VenueList;
