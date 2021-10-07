import styled from "styled-components";
import { centeredDiv } from "styles/mixins";
import { ThemeType } from "../../../styles/theme";

export const IconButtonWrapper = styled.div<{
  bgColor: keyof ThemeType["colors"];
  primaryColor: keyof ThemeType["colors"]["iconButton"];
  secondaryColor: keyof ThemeType["colors"]["iconButton"];
}>`
  ${centeredDiv}

  position: relative;
  z-index: 1;

  width: 50px;
  height: 50px;

  background-color: ${({ bgColor, theme }) => theme.colors[bgColor]};

  border-radius: 7px;

  svg .primary {
    fill: ${({ primaryColor, theme }) => theme.colors.iconButton[primaryColor]};
  }

  svg .secondary {
    fill: ${({ secondaryColor, theme }) =>
      theme.colors.iconButton[secondaryColor]};
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
