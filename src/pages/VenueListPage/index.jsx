import { useEffect, useState } from "react";
import useVenues from "../../hooks/useVenues";
import VenueCard from "../../components/VenueCard";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PaginationButtons from "../../components/MUI/Pagination";

function VenueListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { venues, venuesMeta, error, loading } = useVenues(currentPage, limit);

  useEffect(() => {
    // console.log("Fetching venues for page:", currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    console.log("Page changed to:", value);
    setCurrentPage(value);
  };

  return (
    <div className="venue-list-container mx-auto flex flex-col items-center gap-4 pb-4">
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}

      {loading && <p>Loading...</p>}

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
    </div>
  );
}

export default VenueListPage;


// With show more and show all buttons

// import { useEffect, useState } from "react";
// import useVenues from "../../hooks/useVenues";
// import VenueCard from "../../components/VenueCard";
// import Alert from "@mui/material/Alert";
// import Stack from "@mui/material/Stack";
// import PaginationButtons from "../../components/MUI/Pagination";
// import { Button } from "@mui/material";

// function VenueListPage() {
//   const [currentPage, setCurrentPage] = useState(1); // Start with page 1
//   const [loadMore, setLoadMore] = useState(10);
//   const limit = 40; // Number of venues per page
//   const { venues, venuesMeta, error, loading } = useVenues(currentPage, limit);
//   const [displayedVenues, setDisplayedVenues] = useState([]);

//   useEffect(() => {
//     setDisplayedVenues(venues.slice(0, loadMore));
//   }, [venues, loadMore]);

//   const handleShowMore = () => {
//     const newLoadMore = Math.min(loadMore + 10, venues.length);
//     setLoadMore(newLoadMore);
//   };

//   const handleShowAll = () => {
//     setLoadMore(venues.length);
//   };

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//     setLoadMore(10); // Reset the 'show more' state
//   };

//   const remainingVenues = venues.length - displayedVenues.length;

//   return (
//     <div className="venue-list-container mx-auto flex flex-col items-center gap-4 pb-4">
//       {error && (
//         <Stack sx={{ width: "100%" }} spacing={2}>
//           <Alert severity="error">{error}</Alert>
//         </Stack>
//       )}

//       {loading && <p>Loading...</p>}

//       <PaginationButtons
//         count={venuesMeta.pageCount || 0}
//         page={currentPage}
//         onChange={handlePageChange}
//       />

//       <div className="flex flex-wrap justify-center gap-4 px-5">
//         {displayedVenues.map((venue) => (
//           <VenueCard key={venue.id} venue={venue} />
//         ))}
//       </div>

//       {loadMore < venues.length && (
//         <Stack
//           className="px-5"
//           sx={{
//             width: "100%",
//             maxWidth: 1200,
//             margin: "auto",
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//             gap: 2,
//           }}
//         >
//           <Button
//             onClick={handleShowMore}
//             sx={{
//               maxWidth: 200,
//               flex: 1,
//               backgroundColor: "var(--button-bg-color)",
//               color: "var(--button-text-color)",
//               "&:hover": {
//                 outline: "1px solid var(--border-color)",
//                 backgroundColor: "var(--button-bg-color-hover)",
//                 color: "var(--button-text-color-hover)",
//               },
//             }}
//           >
//             Show More ({remainingVenues} left)
//           </Button>
//           <Button
//             onClick={handleShowAll}
//             sx={{
//               maxWidth: 200,
//               flex: 1,
//               backgroundColor: "var(--button-bg-color)",
//               color: "var(--button-text-color)",
//               "&:hover": {
//                 outline: "1px solid var(--border-color)",
//                 backgroundColor: "var(--button-bg-color-hover)",
//                 color: "var(--button-text-color-hover)",
//               },
//             }}
//           >
//             Show All ({venues.length})
//           </Button>
//         </Stack>
//       )}

//       <PaginationButtons
//         count={venuesMeta.pageCount || 0}
//         page={currentPage}
//         onChange={handlePageChange}
//       />
//     </div>
//   );
// }

// export default VenueListPage;
