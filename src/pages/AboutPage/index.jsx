import { useEffect } from "react";

function AboutPage() {
  useEffect(() => {
    document.title = "Holidaze - About";
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

  return (
    <div className="about-section p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">About Holidaze</h1>
      <p className="mb-4">
        Holidaze is dedicated to helping travelers find the perfect stay for their next vacation. We offer a wide range of
        unique accommodations to ensure you have a memorable experience.
      </p>
      <p>
        With a focus on customer satisfaction, we curate our listings to meet diverse needs and preferences. Discover your
        next getaway with Holidaze — where your dream vacation awaits.
      </p>
    </div>
  );
}

export default AboutPage;
