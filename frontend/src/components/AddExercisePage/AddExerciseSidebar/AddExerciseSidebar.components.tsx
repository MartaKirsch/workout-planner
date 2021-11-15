import styled from "styled-components";
import { centeredDiv, columnDiv, spaceBetweenDiv } from "styles/mixins";
import { ReactComponent as TickIcon } from "images/tick.svg";

export const AddExerciseSidebarWrapper = styled.div`
  ${columnDiv}

  padding:43px;
  width: var(--add-exercise-sidebar-width);
  height: 100%;

  background-color: ${({ theme }) => theme.colors.addExercise.sidebarBg};

  overflow-y: auto;
`;

export const AddExerciseCheckboxesWrapper = styled.div<{
  spaceBetween?: boolean;
}>`
  ${({ spaceBetween }) => (spaceBetween ? spaceBetweenDiv : centeredDiv)}

  margin: 30px 0;

  flex-wrap: wrap;

  width: 100%;

  position: relative;
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
