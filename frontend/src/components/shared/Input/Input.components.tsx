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
`;

export const InputElement = styled.input`
  width: 100%;

  padding: 26px 24px;
  margin-top: 19px;

  background-color: ${({ theme }) => theme.colors.input.bg};

  color: ${({ theme }) => theme.colors.input.textColor};
  font-size: ${({ theme }) => theme.fonts.sizes.base};

  border-radius: 15px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.input.placeholderColor};
  }
`;

export const InputUnderline = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.borders.thick};

  background-color: ${({ theme }) => theme.colors.input.underlineColor};

  position: relative;
  bottom: 4px;
`;

export const InputError = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};

  margin-top: 8px;
`;
