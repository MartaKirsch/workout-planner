import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { randomUUID } from "crypto";
import * as multer from "multer";
import { PrismaService } from "src/prisma.service";
import { UserService } from "../user/user.service";
import { ExerciseController } from "./exercise.controller";
import { ExerciseService } from "./exercise.service";

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: "./public/",
        filename: function (_, __, cb) {
          cb(null, Date.now() + randomUUID() + ".jpg"); //Appending .jpg
        },
      }),
      fileFilter: (_, file, cb) => {
        const reg = /(jpg|jpeg|png)$/;
        if (reg.test(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("Valid image types are: jpeg, jpg or png!"), false);
        }
      },
      limits: { fileSize: 1024 * 1024 * 5 },
    }),
  ],
  controllers: [ExerciseController],
  providers: [ExerciseService, PrismaService, UserService],
})
export class ExerciseModule {}
