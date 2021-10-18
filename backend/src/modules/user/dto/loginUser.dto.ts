import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
  @MaxLength(50)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @MaxLength(30)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  username: string;
}
