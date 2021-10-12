import { IconButtonWrapper } from "components/shared/IconButton/IconButton.components";
import styled from "styled-components";
import { centeredDiv } from "styles/mixins";

export const NavButtonUnderline = styled.div`
  margin-top: 6px;

  width: 100%;
  height: ${({ theme }) => theme.borders.thin};

  background-color: ${({ theme }) => theme.colors.navButton.underline};

  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    transform: scaleX(0);
    transform-origin: 0% 50%;
    transition: transform 0.2s ease-out;

    background-color: ${({ theme }) => theme.colors.navButton.underlineActive};
  }
`;

export const NavButtonWrapper = styled.button`
  @keyframes changeBg {
    to {
      fill: #fff;
    }
  }
  ${centeredDiv}

  background-color: ${({ theme }) => theme.colors.navBg};

  svg {
    transition: transform 0.2s ease-out;
  }

  &:hover svg,
  &:focus svg {
    transform: scale(0.85);
  }

  &:hover ${NavButtonUnderline}:after, &:focus ${NavButtonUnderline}:after {
    transform: scaleX(100%);
  }

  &:hover ${IconButtonWrapper}:after, &:focus ${IconButtonWrapper}:after {
    transform: scale(100%);
  }

  &:hover ${IconButtonWrapper} svg .background,
  &:focus ${IconButtonWrapper} svg .background {
    animation: changeBg 0.2s ease-out forwards;
  }

  &:not(:first-child) {
    margin-top: 45px;
  }
`;

export const NavButtonText = styled.div`
  margin-left: ${({ theme }) => theme.paddings.navPadding};

  font-size: ${({ theme }) => theme.fonts.sizes.base};
  color: ${({ theme }) => theme.fonts.colors.light};
`;
