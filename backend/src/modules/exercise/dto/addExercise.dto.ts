import {
  IsNotEmpty,
  IsString,
  IsArray,
  MaxLength,
  MinLength,
  IsOptional,
} from "class-validator";
import { BodyPartType } from "../types/bodyParts.type";
import { ExerciseType } from "../types/exerciseType.type";

export class AddExerciseDto {
  @IsNotEmpty()
  @IsString()
  bodyParts: string;

  @IsNotEmpty()
  type: ExerciseType;

  @IsNotEmpty()
  @IsString()
  @MaxLength(45)
  @MinLength(5)
  name: string;

  @IsString()
  @MaxLength(150)
  description: string;
}
