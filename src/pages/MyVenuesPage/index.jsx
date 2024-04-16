import { useEffect } from "react";

function MyVenuesPage() {
  useEffect(() => {
    document.title = "Holidaze - My Venues";
  }, []);
  return (
    <div className="about-section p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">My Venues overview</h1>
      <p className="mb-4">Venues here</p>
      <p>With images and details</p>
    </div>
  );
}

export default MyVenuesPage;
