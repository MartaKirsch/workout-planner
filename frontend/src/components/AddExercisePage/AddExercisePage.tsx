import React, { FunctionComponent } from "react";
import { useUserContext } from "components/UserContext/useUserContext";
import { Redirect } from "react-router";
import { BASE_ROUTE } from "utils/routes";

const AddExercisePage: FunctionComponent = () => {
  const { isLoggedIn } = useUserContext();
  return (
    <>
      {!isLoggedIn && <Redirect to={BASE_ROUTE} />}
      add exercise
    </>
  );
};

export default AddExercisePage;
