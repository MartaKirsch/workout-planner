import styled, { css } from "styled-components";
import {
  centeredDiv,
  columnDiv,
  defaultBorderStyles,
  spaceBetweenDiv,
} from "styles/mixins";
import PlainButton from "components/shared/PlainButton";

export const AddExerciseFormWrapper = styled.main`
  ${centeredDiv}
  align-items: flex-start;

  height: 100%;
  width: calc(100% - var(--exercise-sidebar-width));
  padding: 91px 141px;

  background-color: ${({ theme }) => theme.colors.addExercise.formBg};

  overflow-y: auto;

  @-moz-document url-prefix() {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.loginForm.scrollbarThumb}
      ${({ theme }) => theme.colors.loginForm.bg};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.loginForm.bg};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.loginForm.scrollbarThumb};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.loginForm.scrollbarThumbActive};
  }
`;

export const AddExerciseFormContent = styled.div`
  ${columnDiv}

  width: 588px;

  justify-content: flex-start;
`;

export const StyledPlainButton = styled(PlainButton)`
  margin-top: 32px;
  margin-left: auto;
`;

export const AddExerciseFormElement = styled.form`
  ${columnDiv}

  margin-top:48px;

  width: 100%;
  max-width: 588px;
`;

export const AddExerciseCheckboxesWrapper = styled.fieldset<{
  alignLeft?: boolean;
}>`
  ${spaceBetweenDiv}

  ${({ alignLeft }) =>
    alignLeft &&
    css`
      justify-content: flex-start;
    `};

  padding: 0;

  border: none;

  width: 100%;
`;

export const AddExerciseFieldset = styled.div`
  ${columnDiv}

  align-items:flex-start;

  width: 100%;

  margin: 60px 0 0;

  position: relative;

  &:nth-last-child(2) {
    margin-bottom: 60px;
  }
`;

export const TypeOfExerciseSelect = styled.select`
  ${defaultBorderStyles}

  option {
    font-size: ${({ theme }) => theme.fonts.sizes.s};
    font-family: ${({ theme }) => theme.fonts.families.normal};
    color: ${({ theme }) => theme.fonts.colors.dark};
  }
`;

export const AddExerciseFileInput = styled.input`
  width: var(--add-exercise-file-input-width);
  height: var(--add-exercise-file-input-height);

  position: absolute;
  z-index: 2;
  left: 0;
  bottom: 0;

  opacity: 0;

  cursor: pointer;

  &:focus + div::after,
  &:hover + div::after {
    opacity: 1;
  }
`;

export const AddExerciseFakeFileInput = styled.div`
  ${defaultBorderStyles}

  cursor: pointer;

  position: relative;

  &::after {
    content: "";
    height: calc(2 * ${({ theme }) => theme.borders.thiner} + 100%);
    width: calc(2 * ${({ theme }) => theme.borders.thiner} + 100%);

    position: absolute;
    top: ${({ theme }) => `-${theme.borders.thiner}`};
    left: ${({ theme }) => `-${theme.borders.thiner}`};

    border-radius: 7px;
    border: ${({ theme }) => theme.borders.thiner} solid
      ${({ theme }) => theme.colors.iconButton.orange};

    opacity: 0;
    transition: opacity 0.2s ease-out;
  }
`;
