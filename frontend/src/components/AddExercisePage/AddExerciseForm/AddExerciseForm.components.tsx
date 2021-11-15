import styled from "styled-components";
import { centeredDiv } from "styles/mixins";

export const AddExerciseFormWrapper = styled.main`
  ${centeredDiv}

  height: 100%;
  width: calc(100% - var(--add-exercise-sidebar-width));
  padding: 91px 141px;

  background-color: ${({ theme }) => theme.colors.addExercise.formBg};
`;
