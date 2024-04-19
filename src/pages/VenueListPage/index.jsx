import { useEffect, useState } from "react";
import { getVenues } from "../../utils/getVenues";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";
import PaginationButtons from "../../components/MUI/Pagination";

function VenueListPage() {
  useEffect(() => {
    document.title = "Holidaze - Destinations";
  }, []);

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

  const [venues, setVenues] = useState([]);
  // const [meta, setMeta] = useState([]);
  // const [error, setError] = useState("");
  let error;
  let totalPages = 1;
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  // const navigate = useNavigate();
  const limit = 100; // Number of venues per page



  useEffect(() => {
    const fetchVenues = async () => {
      const result = await getVenues(currentPage, limit);
      setVenues(result.data);
      console.log("Venues:", result.data);
      // console.log("Meta:", result.meta);


    };

    fetchVenues();
  }, [currentPage]);

  // useEffect(() => {
  //   const fetchVenues = async () => {
  //     const { data, meta, error } = await getVenues(currentPage, limit);
  //     console.log("Meta:", meta, "Data:", data, "Error:", error);
  //     if (error) {
  //       setError(error);
  //       setVenues([]); // Ensure venues is cleared if there's an error
  //       console.error(error); // Log for debugging
  //     } else {
  //       setVenues(data.data);
  //       setMeta(data.meta);
  //       setError(""); // Clear error if the fetch is successful
  //     }
  //     setTotalPages(Math.ceil(meta.pageCount / limit));
  //   };

  //   fetchVenues();
  // }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // const handleBackClick = () => {
  //   navigate("/");
  // };

  return (
    <div className="venue-list-container mx-auto flex flex-col items-center gap-4">
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
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
