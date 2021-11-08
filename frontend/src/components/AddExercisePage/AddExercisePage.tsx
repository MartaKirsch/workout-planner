import React, { FunctionComponent } from "react";
import { useUserContext } from "components/UserContext/useUserContext";
import { Redirect } from "react-router";
import { BASE_ROUTE } from "utils/routes";
import ExercisesContextProvider from "./ExercisesContext/ExercisesContextProvider";
import { AddExercisePageWrapper } from "./AddExercisePage.components";

const AddExercisePage: FunctionComponent = () => {
  const { isLoggedIn } = useUserContext();

  return (
    <AddExercisePageWrapper>
      {!isLoggedIn && <Redirect to={BASE_ROUTE} />}
      <ExercisesContextProvider>add exercise</ExercisesContextProvider>
    </AddExercisePageWrapper>
  );
};

export default AddExercisePage;
