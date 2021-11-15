import styled, { css } from "styled-components";
import { centeredDiv, columnDiv, spaceBetweenDiv } from "styles/mixins";
import { ReactComponent as TickIcon } from "images/tick.svg";
import Button from "components/shared/Button";

export const AddExerciseSidebarWrapper = styled.div`
  ${columnDiv}

  padding:43px;
  width: var(--add-exercise-sidebar-width);
  height: calc(100vh - var(--logobar-height));

  background-color: ${({ theme }) => theme.colors.addExercise.sidebarBg};

  overflow-y: auto;

  @-moz-document url-prefix() {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.addExercise.scrollbarThumb}
      ${({ theme }) => theme.colors.addExercise.sidebarBg};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.addExercise.sidebarBg};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.addExercise.scrollbarThumb};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.addExercise.scrollbarThumbActive};
  }
`;

export const AddExerciseCheckboxesWrapper = styled.div<{
  spaceBetween?: boolean;
}>`
  ${({ spaceBetween }) => (spaceBetween ? spaceBetweenDiv : centeredDiv)}

  margin: 30px 0;

  flex-wrap: wrap;

  width: 100%;

  position: relative;

  &:nth-child(3) {
    margin: 20px 0 0;
  }
`;

export const AddExerciseCheckboxWrapper = styled.div`
  height: 50px;
  width: 50px;

  position: relative;

  & > div {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const StyledTick = styled(TickIcon)`
  opacity: 0;
`;

export const CheckboxInput = styled.input`
  height: 100%;
  width: 100%;

  margin: 0;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: 0;

  cursor: pointer;

  &:checked + ${StyledTick} {
    opacity: 1;
  }
`;

export const AddExerciseTypeButton = styled.button<{ isActive?: boolean }>`
  padding: 10px;
  margin: 0;

  position: relative;

  background-color: ${({ theme }) => theme.colors.addExercise.sidebarBg};

  font-size: ${({ theme }) => theme.fonts.sizes.s};
  color: ${({ theme }) => theme.fonts.colors.dark};

  &:first-child {
    margin-right: 30px;
  }

  &:hover::after,
  &:focus::after {
    transform: scaleX(100%);
  }

  &::after {
    content: "";
    width: 100%;
    height: ${({ theme }) => theme.borders.thin};

    background-color: ${({ theme }) => theme.colors.input.underlineColor};

    position: absolute;
    bottom: 5px;
    left: 0;

    transition: transform 0.2s ease-out;

    transform: ${({ isActive }) => (isActive ? "scaleX(100%)" : "scaleX(0)")};
  }
`;

export const AddExerciseAllCheckboxWrapper = styled.div`
  ${centeredDiv}

  height: 20px;
  width: 20px;

  background-color: white;

  border-radius: 5px;

  position: absolute;
  right: 3px;
`;

export const AllCheckboxText = styled.div`
  position: absolute;
  top: -22px;

  font-family: ${({ theme }) => theme.fonts.families.fancy};
  font-size: ${({ theme }) => theme.fonts.sizes.base};
  color: ${({ theme }) => theme.fonts.colors.dark};
`;

export const StyledSearchButton = styled(Button)`
  width: 100%;
`;

export const AddExerciseFilters = styled.div<{ isHidden?: boolean }>`
  background-color: ${({ theme }) => theme.colors.addExercise.sidebarBg};

  height: var(--add-exercise-filters-height);
  will-change: height;
  transition: height 0.3s cubic-bezier(0.4, 0, 1, 1);

  ${({ isHidden }) =>
    isHidden &&
    css`
      height: 0px;
      padding-bottom: 0px !important;
      overflow: hidden;
      transition: height 0.3s cubic-bezier(0, 0, 0.2, 1);
    `}

  /* transform-origin: top center;
  transform: ${({ isHidden }) => isHidden && "scaleY(0)"};

  transition: transform 0.3s ease-out; */

  width: 100%;
  padding-bottom: 43px;

  position: sticky;
  z-index: 2;
  top: 0;
`;

export const FilterArrowButton = styled.button`
  ${centeredDiv}

  position: absolute;
  right: -30px;
  top: 0;

  height: 20px;
  width: 20px;

  background-color: ${({ theme }) => theme.colors.addExercise.formBg};

  svg {
    fill: ${({ theme }) => theme.fonts.colors.dark};
    height: 15px;
    width: 15px;
  }
`;

export const ExercisesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  background-color: ${({ theme }) => theme.colors.addExercise.sidebarBg};

  ${columnDiv}

  width:100%;

  position: relative;
`;