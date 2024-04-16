import { useRef, useEffect } from "react";
import gsap from "gsap";
import useStore, { isAuthenticatedSelector } from "../../hooks/useStore";
import * as S from "./index.styled";

function HomePage() {
  const titleRef = useRef();
  const circleRef = useRef();
  const isAuthenticated = useStore(isAuthenticatedSelector);

  useEffect(() => {
    document.title = "Holidaze - Home";

    // GSAP animations
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(circleRef.current, {
      rotation: 360,
      duration: 3,
      ease: "elastic.out(1, 0.3)",
    });
  }, [isAuthenticated]); // Depend on isAuthenticated to re-run the animation when it changes

  return (
    <S.HomeContainer>
      <S.HomeContentWrapper>
        <S.Title ref={titleRef}>
          <span>{isAuthenticated ? "Welcome back Username" : "Welcome to Holidaze"}</span>
        </S.Title>
        <S.Subtitle>Homepage</S.Subtitle>
        <S.Description>Discover and book your perfect stay at our curated venues.</S.Description>

        <div className="App">
          <div className="container">
            <div className="box gradient-blue">selector</div>
            <div className="circle gradient-green" ref={circleRef}>
              Ref
            </div>
          </div>
          <div className="box gradient-blue">selector</div>
        </div>
      </S.HomeContentWrapper>
    </S.HomeContainer>
  );
}

export default HomePage;
