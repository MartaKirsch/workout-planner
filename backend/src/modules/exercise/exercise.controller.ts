import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserGuard } from "src/guards/user.guard";
import { UserService } from "../user/user.service";
import { AddExerciseDto } from "./dto/addExercise.dto";
import { ExerciseFiltersDto } from "./dto/exercise.filters.dto";
import { ExerciseService } from "./exercise.service";

@UseGuards(UserGuard)
@Controller("exercise")
export class ExerciseController {
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly userService: UserService,
  ) {}

  @Post("find")
  async findExercises(@Session() sess, @Body() body: ExerciseFiltersDto) {
    try {
      const user = await this.userService.findUser(sess.user.name);
      if (!user) throw Error("No user found");
      const exercises = await this.exerciseService.findExercises({
        username: user.name,
        ...body,
      });
      return exercises;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post("/")
  @UseInterceptors(FileInterceptor("file"))
  async addExercise(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: AddExerciseDto,
    @Session() session,
  ) {
    if (file) await this.exerciseService.minimizeFile(file);
    try {
      await this.exerciseService.addExercise(
        body,
        session.user.id,
        file.filename,
      );
      return true;
    } catch (e) {
      throw new BadRequestException(
        e.message ?? "Troubles with saving your exercise!",
      );
    }
  }
}
