import styled from "styled-components";
import { StyledTick } from "../ExerciseSidebar/ExerciseSidebar.components";

export const CheckboxWithIconWrapper = styled.div`
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

  &:checked + ${StyledTick} {
    opacity: 1;
  }
`;
