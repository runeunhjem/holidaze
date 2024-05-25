import { useEffect } from "react";
import bannerImage1 from "../../assets/images/about-banner-1.png";
import bannerImage2 from "../../assets/images/about-banner-2.png";
import bannerImage3 from "../../assets/images/about-banner-3.png";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta"; // Import the utility function
import "./index.css";

function AboutPage() {
  useEffect(() => {
    setTitleAndMeta(
      "Holidaze - About us",
      "Read a little about us. What our goals are and what we aim to achieve",
    );
  }, []);

  return (
    <div className="about-section mx-0 -mt-9 w-full max-w-1200 px-0 md:mx-auto">
      <div className="about-section-1">
        <div className="about-banner" style={{ position: "relative" }}>
          <img
            src={bannerImage1}
            alt="Illustrated Holidaze banner #3"
            className="bg-500-black w-full"
          />
          <h1
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "var(--about-title-color)",
              textAlign: "center",
              fontSize: "calc(5vw + 14px)",
              fontWeight: "bold",
              textShadow: "3px 3px 8px var(--about-title-shadow-color)",
            }}
          >
            Holidaze
          </h1>
        </div>
        <p className="responsive-p">
          <span>
            Welcome to Holidaze, the ultimate platform where venue managers from
            around the globe showcase their unique accommodations, inviting
            travelers to experience stays like never before.
          </span>
          <span>
            At Holidaze, we believe in the beauty of diversity and the charm of
            personal touch, which is why we empower local venue managers to
            register and share their properties, from cozy bed and breakfasts in
            quaint towns to luxurious villas on sun-soaked beaches.
          </span>
        </p>
      </div>
      <div className="about-section-2">
        <img
          src={bannerImage2}
          alt="Illustrated Holidaze banner #2"
          className="w-full"
        />
        <p className="responsive-p">
          <span>
            Our mission is to connect adventurous travelers with exceptional
            accommodations that offer more than just a place to stay.
          </span>
          <span>
            Each venue on Holidaze is managed directly by its owner, ensuring
            guests receive a personalized experience and insider knowledge of
            the destination.
          </span>
        </p>
      </div>
      <div className="about-section-3">
        <img
          src={bannerImage3}
          alt="Illustrated Holidaze banner #3"
          className="w-full"
        />
        <p className="responsive-p">
          <span>
            Whether you&apos;re a venue manager looking to broaden your reach or
            a traveler seeking a unique getaway, Holidaze provides all the tools
            needed to discover, book, and manage stays effortlessly.
          </span>
          <span>
            Join our community and start exploring the endless possibilities of
            global travel with a personal touch. Let your journey begin with
            Holidaze, where every stay is a new adventure.
          </span>
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
