import styled, { css } from "styled-components";
import { centeredDiv } from "styles/mixins";

export const ModalWrapper = styled.div<{ isFullScreen?: boolean }>`
  ${centeredDiv}

  height:100vh;
  width: 100vw;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;

  ${({ isFullScreen, theme }) =>
    isFullScreen &&
    css`
      background-color: ${theme.colors.bg};
    `}
`;
