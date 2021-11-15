import styled from "styled-components";
import { columnDiv } from "styles/mixins";

export const InputWrapper = styled.div`
  ${columnDiv}

  align-items: flex-start;

  width: 100%;

  &:not(:first-child) {
    margin-top: 42px;
  }
`;

export const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fonts.sizes.s};

  cursor: pointer;

  margin-bottom: 19px;
`;

export const InputElement = styled.input`
  width: 100%;

  padding: 26px 24px;

  background-color: ${({ theme }) => theme.colors.input.bg};

  color: ${({ theme }) => theme.colors.input.textColor};
  font-size: ${({ theme }) => theme.fonts.sizes.base};

  border-radius: 15px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.input.placeholderColor};
  }

  &:focus + div::after {
    transform: scaleX(1);
  }
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
