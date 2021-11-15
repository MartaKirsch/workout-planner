import styled from "styled-components";
import { columnDiv, spaceBetweenDiv } from "styles/mixins";

export const AddExerciseSidebarWrapper = styled.div`
  ${columnDiv}

  padding:43px;
  width: var(--add-exercise-sidebar-width);
  height: 100%;

  background-color: ${({ theme }) => theme.colors.addExercise.sidebarBg};

  overflow-y: auto;
`;

export const AddExerciseCheckboxesWrapper = styled.div`
  ${spaceBetweenDiv}

  margin: 30px 0;

  flex-wrap: wrap;

  width: 100%;
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
`;
