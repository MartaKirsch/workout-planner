import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Session,
} from "@nestjs/common";
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
  async registerUser(@Body() createUserData: CreateUserDto, @Session() sess) {
    try {
      const res = await this.userService.register(createUserData);
      sess.user = { id: res.id, name: res.name };
      console.log(sess.user);

      return { isLoggedIn: true, username: res.name };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
