import styled from "styled-components";
import { centeredDiv } from "styles/mixins";
import { ThemeType } from "../../../styles/theme";

export const IconButtonWrapper = styled.div<{
  bgColor: keyof ThemeType["colors"];
  primaryColor: keyof ThemeType["colors"]["iconButton"];
  secondaryColor: keyof ThemeType["colors"]["iconButton"];
  bttnType?: "addButton" | "";
}>`
  ${centeredDiv}

  position: relative;
  z-index: 1;

  width: var(--iconbutton-width);
  height: var(--iconbutton-width);

  background-color: ${({ bgColor, theme }) => theme.colors[bgColor]};

  border-radius: 7px;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;

    transform-origin: 50% 50%;
    transform: scale(0);
    transition: transform 0.3s ease-out;

    border-radius: 7px;

    background-color: #023047; /* #fff ?*/
  }

  svg .primary {
    fill: ${({ primaryColor, theme }) => theme.colors.iconButton[primaryColor]};
  }

  svg .secondary {
    fill: ${({ secondaryColor, theme }) =>
      theme.colors.iconButton[secondaryColor]};
  }

  svg .background {
    fill: ${({ bgColor, theme }) => theme.colors[bgColor]};
  }

  svg {
    transition: transform 0.2s ease-out;
  }

  &:hover svg,
  &:focus svg {
    transform: scale(0.85);
  }
`;

export const IconButtonFrame = styled.div<{
  borderColor: keyof ThemeType["colors"]["iconButton"];
}>`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;

  width: 100%;
  height: 100%;

  border: ${({ theme }) => theme.borders.thiner} solid
    ${({ borderColor, theme }) => theme.colors.iconButton[borderColor]};
  border-radius: 7px;
`;
