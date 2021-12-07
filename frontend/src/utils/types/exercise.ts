import { BodyPart } from "./bodyParts";

export type ExerciseT = {
  id: string;
  name: string;
  description: string;
  body_parts: { name: BodyPart }[];
  authorId: string;
  author: { name: string };
  type: ExerciseType;
  image: string;
};

export type ExerciseType = "EXERCISE" | "STRETCH";

export type ExerciseAddFormT = {
  name: string;
  description: string;
  bodyParts: BodyPart[];
  type: ExerciseType;
};
