import React, { FunctionComponent } from "react";
import ExerciseSidebar from "components/shared/ExerciseSidebar";
import ExercisesContextProvider from "context/ExercisesContext/ExercisesContextProvider";

interface Props {
  onTileClick?: () => void | Promise<void>;
}

const ExerciseContextWithSidebar: FunctionComponent<Props> = ({
  onTileClick,
  children,
}) => {
  return (
    <>
      <ExercisesContextProvider>
        <ExerciseSidebar />
        {children}
      </ExercisesContextProvider>
    </>
  );
};

export default ExerciseContextWithSidebar;
