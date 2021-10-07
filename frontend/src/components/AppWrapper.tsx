import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;

  width: 100vw;
  height: 100vh;
  overflow: hidden;

  font-size: ${({ theme }) => theme.fonts.sizes.base};

  background-color: ${({ theme }) => theme.colors.bg};
`;
