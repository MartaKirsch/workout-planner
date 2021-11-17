import styled from "styled-components";
import { columnDiv } from "styles/mixins";
import PlainButton from "components/shared/PlainButton";

export const AddExerciseFormWrapper = styled.main`
  ${columnDiv}

  height: 100%;
  width: calc(100% - var(--exercise-sidebar-width));
  padding: 91px 141px;

  background-color: ${({ theme }) => theme.colors.addExercise.formBg};
`;

export const StyledPlainButton = styled(PlainButton)`
  margin-top: 32px;
  margin-left: auto;
`;
