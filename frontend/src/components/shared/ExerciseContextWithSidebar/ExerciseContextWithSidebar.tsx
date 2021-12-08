import React, { FunctionComponent } from "react";
import ExerciseSidebar from "components/shared/ExerciseSidebar";
import ExercisesContextProvider from "context/ExercisesContext/ExercisesContextProvider";
import { ExerciseT } from "utils/types/exercise";

interface Props {
  onTileClick?: (e: ExerciseT) => void | Promise<void>;
}

const ExerciseContextWithSidebar: FunctionComponent<Props> = ({
  onTileClick,
  children,
}) => {
  return (
    <>
      <ExercisesContextProvider>
        <ExerciseSidebar onTileClick={onTileClick} />
        {children}
      </ExercisesContextProvider>
    </>
  );
};

export default ExerciseContextWithSidebar;
