import { useContext } from "react";
import xercisesContext from "./ExercisesContext";

export const useExercisesContext = () => {
  const values = useContext(xercisesContext);

  return { ...values };
};
