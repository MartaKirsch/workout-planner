import { createContext, Dispatch, SetStateAction } from "react";
import { BodyPart } from "utils/types/bodyParts";
import { ExerciseT, ExerciseType } from "utils/types/exercise";

const ExercisesContextDataModel: {
  exercises: ExerciseT[];
  bodyParts: BodyPart[];
  types: ExerciseType[];
  searchPhrase: string;
  setBodyParts: Dispatch<SetStateAction<BodyPart[]>>;
  setTypes: Dispatch<SetStateAction<ExerciseType[]>>;
  setSkip: Dispatch<SetStateAction<number>>;
  setSearchPhrase: Dispatch<SetStateAction<string>>;
  isPending: boolean;
  loadExercises: (newSkip?: number) => Promise<void>;
} = {
  exercises: [
    {
      id: "",
      name: "",
      description: "",
      image: "",
      type: "EXERCISE",
      body_parts: [{ name: "ARMS" }, { name: "CHEST" }],
      authorId: "global",
      author: { name: "global" },
    },
  ],
  bodyParts: ["ABS", "ARMS", "BACK", "CHEST", "LEGS", "MULTI_JOINT"],
  types: ["STRETCH", "EXERCISE"],
  searchPhrase: "",
  setBodyParts: () => {},
  setTypes: () => {},
  setSkip: () => {},
  setSearchPhrase: () => {},
  isPending: true,
  loadExercises: () => {
    return new Promise((res) => {
      res();
    });
  },
};

export type ExercisesContextDataType = typeof ExercisesContextDataModel;

const ExercisesContext = createContext({
  ...ExercisesContextDataModel,
  //   changeExercisesContextValue: (_: {
  //     [P in keyof UserContextDataType]?: UserContextDataType[P];
  //   }) => {},
});

export default ExercisesContext;
