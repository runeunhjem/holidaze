// VenueList.jsx
function VenueList() {
  // Simulating fetching data
  const venues = [{ id: 1, name: "Venue 1", description: "Description here" }];

  return (
    <div className="venue-list">
      <h2>Venues</h2>
      {venues.map((venue) => (
        <div key={venue.id}>
          <h3>{venue.name}</h3>
          <p>{venue.description}</p>
        </div>
      ))}
    </div>
  );
}

export default VenueList;