import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserService } from "../user/user.service";
import { ExerciseController } from "./exercise.controller";
import { ExerciseService } from "./exercise.service";

@Module({
  imports: [],
  controllers: [ExerciseController],
  providers: [ExerciseService, PrismaService, UserService],
})
export class ExerciseModule {}
