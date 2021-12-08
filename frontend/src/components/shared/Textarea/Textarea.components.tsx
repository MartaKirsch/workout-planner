import styled from "styled-components";
import { defaultInputStyles } from "styles/mixins";

export const TextareaElement = styled.textarea`
  ${defaultInputStyles}

  border:none;

  resize: vertical;
  max-height: 300px;

  &:focus {
    outline: none;
  }
`;
