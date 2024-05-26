import styled, { keyframes } from "styled-components";
import { CgMoreVertical } from "react-icons/cg";

export const Gallery = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
  padding: 0;
  border-radius: 20px;
  @media (max-width: 468px) {
    height: 200px;
  }
`;

const breatheAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  opacity: 1;
  animation: ${breatheAnimation} 38s ease-in-out infinite;
  transition: opacity 0.5s ease-in-out;

  @media (max-width: 468px) {
    height: 200px;
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--overlay-color);
  /* background-color: var(--overlay-cards); */
  color: var(--body-text-color);
  text-align: center;
  padding: 2px 10px;
  border-radius: 0 0 10px 10px;
`;

export const TopOverlay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  background-color: var(--overlay-color);
  /* background-color: var(--overlay-cards); */
  color: var(--body-text-color);
  padding: 10px 10px;
  transition: all 0.3s ease-in-out;
  border-radius: 10px 10px 0 0;
`;

export const OverlaySection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
`;

export const NavButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 50% !important;
  transform: translateY(-50%) !important;
  background-color: var(--overlay-color);
  color: var(--gray-400);
  box-shadow: 0 0 8px 1px var(--overlay-color);
  border-radius: 50%;
  font-size: 24px;
  padding: 4px 14px;
  z-index: 2;

  ${(props) => props.direction === "left" && `left: 20px;`}
  ${(props) => props.direction === "right" && `right: 20px;`}

  &:hover {
    color: var(--overlay-color-hover);
    background-color: var(--header-bg-color);
  }

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 4px 10px;
  }

  @media (max-width: 468px) {
    font-size: 16px;
    padding: 3px 8px;
    top: 50% !important;
  }
`;

export const Thumbnails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  padding-top: 20px;
`;

export const ThumbnailImg = styled.img`
  border-radius: 16px;
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease;

  &.selected,
  &:hover {
    opacity: 1;
    border: 2px solid var(--border-color);
  }
`;

export const OptionsIcon = styled(CgMoreVertical)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 20px;
  color: var(--link-color);
  &:hover {
    transform: scale(1.3);
  }
`;
