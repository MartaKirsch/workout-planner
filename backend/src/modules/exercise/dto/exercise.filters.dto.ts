import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";
import { BodyPartType } from "../types/bodyParts.type";
import { ExerciseType } from "../types/exerciseType.type";

export class ExerciseFiltersDto {
  @IsNumber()
  @IsNotEmpty()
  skip: number;

  @IsString()
  pattern: string;

  @IsArray()
  bodyParts: BodyPartType[];

  @IsArray()
  types: ExerciseType[];
}
