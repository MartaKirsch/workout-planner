import styled, { css } from "styled-components";
import { columnDiv } from "styles/mixins";

export const NavWrapper = styled.nav<{ isOpen: boolean }>`
  ${columnDiv}
  padding: ${({ theme }) => theme.paddings.navPadding};
  align-items: flex-start;

  position: fixed;
  right: -236px;
  z-index: 200;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: translateX(-236px);
    `};

  width: 350px;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.navBg};

  transition: transform 0.2s ease-out;
`;
