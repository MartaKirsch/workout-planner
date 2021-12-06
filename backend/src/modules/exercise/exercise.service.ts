import { Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ExerciseFiltersDto } from "./dto/exercise.filters.dto";
import * as sharp from "sharp";
import { unlinkSync, writeFile } from "fs";
import { AddExerciseDto } from "./dto/addExercise.dto";

sharp.cache(false);
@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async findExercises({
    username,
    skip,
    pattern,
    types,
    bodyParts,
  }: { username: string } & ExerciseFiltersDto) {
    // const exercises = await this.prisma.exercise.findMany({ where: {
    //     OR:[authorId:{equals:"global"}, authorId:{equals:author}]
    // } ,include:{author}});

    const exercises = await this.prisma.exercise.findMany({
      where: {
        author: { OR: [{ name: "global" }, { name: username }] },
        body_parts: { some: { name: { in: bodyParts } } },
        type: { in: types },
        name: { contains: pattern },
      },
      skip,
      take: 10,
      include: {
        body_parts: true,
        author: false,
      },
    });

    return exercises;
  }

  async minimizeFile(file: Express.Multer.File) {
    try {
      await sharp("./public/" + file.filename)
        .jpeg({ quality: 50 })
        .toBuffer(function (_, buffer) {
          writeFile("./public/" + file.filename, buffer, (e) => {
            if (e) throw new Error(e.message ?? "Could not compress the file!");
          });
        });
      return true;
    } catch (e) {
      throw new Error(e.message ?? "Could not compress the file!");
    }
  }

  async addExercise(data: AddExerciseDto, author: string, imgFilename: string) {
    try {
      const exercise = await this.prisma.exercise.create({
        data: {
          name: data.name,
          description: data.description,
          body_parts: {
            connect: JSON.parse(data.bodyParts).map((part) => ({ name: part })),
          },
          type: data.type,
          image: imgFilename,
          author: { connect: { id: author } },
        },
      });
      return exercise;
    } catch (e) {
      await unlinkSync("./public/" + imgFilename);
      throw new Error(e.message ?? "Could not save your exercise!");
    }
  }

  async checkExerciseName(authorId: string, name: string) {
    try {
      const parts = name.toLowerCase().split(" ");
      const exercises = await this.prisma.exercise.findMany({
        where: {
          author: { OR: [{ name: "global" }, { id: authorId }] },
        },
      });

      exercises.forEach((exercise) => {
        let isDoubled = true;
        parts.forEach((part) => {
          if (!exercise.name.toLowerCase().includes(part)) {
            isDoubled = false;
          }
        });
        if (isDoubled) throw new Error("This exercise already exists!");
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
