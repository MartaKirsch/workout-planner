import styled from "styled-components";
import { columnDiv, defaultInputStyles } from "styles/mixins";

export const InputWrapper = styled.div<{ biggerMargin?: boolean }>`
  ${columnDiv}

  align-items: flex-start;

  width: 100%;

  &:not(:first-child) {
    margin-top: ${({ biggerMargin }) => (biggerMargin ? "60px" : "42px")};
  }
`;

export const InputElement = styled.input`
  ${defaultInputStyles}
`;

export const InputUnderline = styled.div<{ isSearch?: boolean }>`
  width: 100%;
  height: ${({ theme }) => theme.borders.thick};

  background-color: ${({ theme }) => theme.colors.input.underlineColor};

  position: relative;
  bottom: 4px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: ${({ theme, isSearch }) =>
      isSearch
        ? theme.colors.input.underlineAltActiveColor
        : theme.colors.input.underlineActiveColor};

    transform: scaleX(0);
    transform-origin: 0% 50%;
    transition: transform 0.3s ease-out;
  }
`;

export const InputError = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};

  margin-top: 8px;
`;
