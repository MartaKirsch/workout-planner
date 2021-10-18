import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginUserDto {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  password: string;

  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  username: string;
}
