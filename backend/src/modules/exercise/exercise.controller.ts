import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Session,
  UseGuards,
} from "@nestjs/common";
import { UserGuard } from "src/guards/user.guard";
import { UserService } from "../user/user.service";
import { ExerciseService } from "./exercise.service";

@UseGuards(UserGuard)
@Controller("exercise")
export class ExerciseController {
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly userService: UserService,
  ) {}

  @Post("find")
  async findExercises(@Req() req, @Session() sess, @Body() body) {
    console.log(body);
    try {
      const user = await this.userService.findUser(sess.user.name);
      if (!user) throw Error("No user found");
      const exercises = await this.exerciseService.findExercises({
        username: user.name,
      });
      return exercises;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
