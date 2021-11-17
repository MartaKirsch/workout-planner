import React, { FunctionComponent } from "react";
import Header from "components/shared/Header";
import {
  AddExerciseFormWrapper,
  StyledPlainButton,
} from "./AddExerciseForm.components";

const AddExerciseForm: FunctionComponent = () => {
  return (
    <AddExerciseFormWrapper>
      <Header text="Add new exercise" stretch />
      <StyledPlainButton>Reset form</StyledPlainButton>
    </AddExerciseFormWrapper>
  );
};

export default AddExerciseForm;
