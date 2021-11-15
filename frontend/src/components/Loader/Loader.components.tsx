import styled from "styled-components";

export const LoaderWrapper = styled.div`
  height: 60px;
  width: 324px;

  svg {
    width: 100%;
    height: auto;

    rect {
      fill: ${({ theme }) => theme.colors.bg};
    }
  }
`;
