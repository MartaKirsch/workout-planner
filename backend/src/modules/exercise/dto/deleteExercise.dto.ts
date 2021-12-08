import { IsNotEmpty, IsString } from "class-validator";

export class DeleteExerciseDto {
  @IsString()
  @IsNotEmpty({ message: "Could not delete the exercise!" })
  name: string;
}
