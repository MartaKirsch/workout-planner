import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
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
import { UpdateExerciseDto } from "./dto/updateExercise.dto";
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

    //check for name
    try {
      await this.exerciseService.checkExerciseName(session.user.id, body.name);
    } catch (e) {
      throw new BadRequestException({
        isDtoError: true,
        message: "Invalid data!",
        errors: [{ property: "name", message: e.message }],
      });
    }

    //save
    try {
      await this.exerciseService.addExercise(
        body,
        session.user.id,
        file ? file.filename : "",
      );
      return true;
    } catch (e) {
      throw new BadRequestException(
        e.message ?? "Troubles with saving your exercise!",
      );
    }
  }

  @Post("/update")
  @UseInterceptors(FileInterceptor("file"))
  async updateExercise(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateExerciseDto,
    @Session() session,
  ) {
    if (file) await this.exerciseService.minimizeFile(file);

    //check for name
    try {
      await this.exerciseService.checkExerciseName(
        session.user.id,
        body.name,
        body.originalName,
      );
    } catch (e) {
      throw new BadRequestException({
        isDtoError: true,
        message: "Invalid data!",
        errors: [{ property: "name", message: e.message }],
      });
    }

    //find and update
    try {
      const exercise = await this.exerciseService.findExerciseByName(
        body.originalName,
      );

      //disconnect previous body parts
      await this.exerciseService.disconnectBodyParts(
        exercise.id,
        exercise.body_parts.map((p) => ({ name: p.bPartId, id: p.id })),
      );

      await this.exerciseService.updateExercise(
        body,
        session.user.id,
        file ? file.filename : "",
        exercise.id,
      );
      return true;
    } catch (e) {
      throw new BadRequestException(
        e.message ?? "Troubles with saving your exercise!",
      );
    }
  }
}
