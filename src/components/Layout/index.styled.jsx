import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  position: absolute;
  width: 100%;
  min-height: 100%;
`;

export const MainContent = styled.main`
  /* min-height: 100%; */
  flex: 1;
  margin: 0;
`;
