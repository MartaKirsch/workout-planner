import { createContext } from "react";
import { ExerciseT } from "utils/types/exercise";

const ExercisesContextDataModel: { exercises: ExerciseT[] } = {
  exercises: [
    {
      id: "",
      name: "",
      description: "",
      image: "",
      type: "EXERCISE",
      body_parts: ["ARMS", "CHEST"],
      authorId: "global",
    },
  ],
};

export type ExercisesContextDataType = typeof ExercisesContextDataModel;

const ExercisesContext = createContext({
  ...ExercisesContextDataModel,
  //   changeExercisesContextValue: (_: {
  //     [P in keyof UserContextDataType]?: UserContextDataType[P];
  //   }) => {},
});

export default ExercisesContext;
