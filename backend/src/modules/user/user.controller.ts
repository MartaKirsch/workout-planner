import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Session,
  UseGuards,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UserGuard } from "src/guards/user.guard";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(new UserGuard())
  getUser(@Session() sess) {
    return { username: sess.user.name, isLoggedIn: true };
  }

  @Get("log-out")
  @UseGuards(new UserGuard())
  logOut(@Session() sess) {
    try {
      sess.destroy();
      return { username: "", isLoggedIn: false };
    } catch (e) {
      throw new InternalServerErrorException("Could not log out!");
    }
  }

  @Post()
  async loginUser(@Body() loginUserData: LoginUserDto, @Session() sess) {
    try {
      const res = await this.userService.login(loginUserData);
      sess.user = { id: res.id, name: res.name };

      return { isLoggedIn: true, username: res.name };
    } catch (e) {
      if (e.message === "noUser")
        throw new InternalServerErrorException({
          isDtoError: true,
          errors: [
            {
              property: "username",
              message: "There is no user with this name!",
            },
          ],
        });
      else if (e.message === "wrongPasswd")
        throw new InternalServerErrorException({
          isDtoError: true,
          errors: [
            {
              property: "password",
              message: "Wrong password!",
            },
          ],
        });
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post("register")
  async registerUser(@Body() createUserData: CreateUserDto, @Session() sess) {
    try {
      const res = await this.userService.register(createUserData);
      sess.user = { id: res.id, name: res.name };

      return { isLoggedIn: true, username: res.name };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        //duplication error
        if (e.code === "P2002") {
          const reg = /_.{1,}_/;
          let property = (e.meta as { target: string }).target.match(reg)[0];
          property = property.substr(1, property.length - 2);

          throw new BadRequestException({
            message: "Inalid data!",
            errors: [
              {
                property: property === "name" ? "username" : property,
                message: `This ${property} has already been registered!`,
              },
            ],
            isDtoError: true,
          });
        }

        throw new InternalServerErrorException(e.message);
      }
    }
  }
}
