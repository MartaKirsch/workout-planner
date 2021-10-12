import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100vw - 2 * var(--nav-padding) - var(--iconbutton-width));
  height: 100vh;
  overflow: hidden;

  font-size: ${({ theme }) => theme.fonts.sizes.base};

  background-color: ${({ theme }) => theme.colors.bg};
`;
