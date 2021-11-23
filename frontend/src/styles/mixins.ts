import { css } from "styled-components";

export const centeredDiv = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const spaceBetweenDiv = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const centeredLeftDiv = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const rightTopCornerDiv = css`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const leftBottomCornerDiv = css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const columnDiv = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const defaultInputStyles = css`
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
