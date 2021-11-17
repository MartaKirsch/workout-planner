import React, { FunctionComponent } from "react";
import { useUserContext } from "context/UserContext/useUserContext";
import { Redirect } from "react-router";
import { BASE_ROUTE } from "utils/routes";
import { AddExercisePageWrapper } from "./AddExercisePage.components";
import AddExerciseForm from "./AddExerciseForm";
import ExerciseContextWithSidebar from "components/shared/ExerciseContextWithSidebar";

const AddExercisePage: FunctionComponent = () => {
  const { isLoggedIn } = useUserContext();

  return (
    <AddExercisePageWrapper>
      {!isLoggedIn && <Redirect to={BASE_ROUTE} />}
      <ExerciseContextWithSidebar>
        <AddExerciseForm />
      </ExerciseContextWithSidebar>
    </AddExercisePageWrapper>
  );
};

export default AddExercisePage;
