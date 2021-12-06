import { IsNotEmpty, IsString } from "class-validator";
import { AddExerciseDto } from "./addExercise.dto";

export class UpdateExerciseDto extends AddExerciseDto {
  @IsString()
  @IsNotEmpty({ message: "Could not update the exercise!" })
  originalName: string;
}
