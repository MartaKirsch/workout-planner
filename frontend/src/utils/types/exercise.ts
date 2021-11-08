import { BodyPart } from "./bodyParts";

export type ExerciseT = {
  id: string;
  name: string;
  description: string;
  body_parts: BodyPart | BodyPart[];
  authorId: string;
  type: ExerciseType;
  image: string;
};

export type ExerciseType = "EXERCISE" | "STRETCH";
