import { createContext, Dispatch, SetStateAction } from "react";
import { BodyPart } from "utils/types/bodyParts";
import { ExerciseT, ExerciseType } from "utils/types/exercise";

const ExercisesContextDataModel: {
  exercises: ExerciseT[];
  bodyParts: BodyPart[];
  types: ExerciseType[];
  setBodyParts: Dispatch<SetStateAction<BodyPart[]>>;
  isPending: boolean;
} = {
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
  bodyParts: ["ABS", "ARMS", "BACK", "CHEST", "LEGS", "MULTI_JOINT"],
  types: ["STRETCH", "EXERCISE"],
  setBodyParts: () => {},
  isPending: true,
};

export type ExercisesContextDataType = typeof ExercisesContextDataModel;

const ExercisesContext = createContext({
  ...ExercisesContextDataModel,
  //   changeExercisesContextValue: (_: {
  //     [P in keyof UserContextDataType]?: UserContextDataType[P];
  //   }) => {},
});

export default ExercisesContext;
