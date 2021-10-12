import styled from "styled-components";
import { centeredLeftDiv } from "styles/mixins";

export const LogoBarWrapper = styled.div`
  ${centeredLeftDiv};

  height: var(--logobar-height);

  padding: 0 40px;

  a {
    ${centeredLeftDiv};
  }
`;

export const LogoBarText = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.xxs};
  color: ${({ theme }) => theme.fonts.colors.dark};

  margin-left: 9px;

  position: relative;

  &::after {
    content: "";

    position: absolute;
    bottom: -2px;
    left: 0;

    width: 100%;
    height: ${({ theme }) => theme.borders.thiner};

    background-color: ${({ theme }) => theme.colors.logoUnderline};
  }
`;
