import styled from 'styled-components';

export const Link = styled.span`
  color: var(--link-color);
  text-decoration: underline;
  font-weight: 700;
  &:hover {
    color: var(--link-color-hover);
  }
`;
