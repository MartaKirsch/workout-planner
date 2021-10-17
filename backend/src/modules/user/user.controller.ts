import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return true;
  }

  @Post("register")
  registerUser(@Body() createUserData: CreateUserDto) {
    return createUserData;
  }
}
