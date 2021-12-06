import React, { FunctionComponent, useState } from "react";
import { useUserContext } from "context/UserContext/useUserContext";
import { Redirect } from "react-router";
import { BASE_ROUTE } from "utils/routes";
import { AddExercisePageWrapper } from "./AddExercisePage.components";
import AddExerciseForm from "./AddExerciseForm";
import ExerciseContextWithSidebar from "components/shared/ExerciseContextWithSidebar";
import { ExerciseAddFormT } from "utils/types/exercise";

const AddExercisePage: FunctionComponent = () => {
  const { isLoggedIn } = useUserContext();
  const [props, setProps] = useState<undefined | ExerciseAddFormT>(undefined);

  const resetProps = () => {
    setProps(undefined);
  };

  return (
    <AddExercisePageWrapper>
      {!isLoggedIn && <Redirect to={BASE_ROUTE} />}
      <ExerciseContextWithSidebar
        onTileClick={(e) =>
          setProps({
            name: e.name,
            description: e.description,
            bodyParts: e.body_parts.map((p) => p.name),
            type: e.type,
          })
        }
      >
        <AddExerciseForm resetProps={resetProps} {...props} />
      </ExerciseContextWithSidebar>
    </AddExercisePageWrapper>
  );
};

export default AddExercisePage;
