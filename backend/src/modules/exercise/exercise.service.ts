import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ExerciseFiltersDto } from "./dto/exercise.filters.dto";
import * as sharp from "sharp";
import { unlinkSync, writeFile } from "fs";
import { AddExerciseDto } from "./dto/addExercise.dto";
import { UpdateExerciseDto } from "./dto/updateExercise.dto";
import { BodyPartType } from "./types/bodyParts.type";

sharp.cache(false);
@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async findExerciseByName(name: string) {
    try {
      const e = await this.prisma.exercise.findFirst({
        where: {
          name: {
            equals: name,
          },
        },
        include: { body_parts: true },
      });
      return e;
    } catch (e) {
      throw new Error("Could not find the exercise!");
    }
  }

  async findExercises({
    username,
    skip,
    pattern,
    types,
    bodyParts,
  }: { username: string } & ExerciseFiltersDto) {
    const exercises = await this.prisma.exercise.findMany({
      where: {
        author: { OR: [{ name: "global" }, { name: username }] },
        body_parts: { some: { bPartId: { in: bodyParts } } },
        type: { in: types },
        name: { contains: pattern },
      },
      skip,
      take: 10,
      include: {
        body_parts: true,
        author: { select: { name: true } },
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
      const bParts = JSON.parse(data.bodyParts);

      const exercise = await this.prisma.exercise.create({
        data: {
          name: data.name,
          description: data.description,
          body_parts: {
            create: bParts.map((part) => ({
              bPart: {
                connect: {
                  name: part,
                },
              },
            })),
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

  async checkExerciseName(
    authorId: string,
    name: string,
    originalName?: string,
  ) {
    try {
      const parts = name.toLowerCase().split(" ");
      const exercises = await this.prisma.exercise.findMany({
        where: {
          author: { OR: [{ name: "global" }, { id: authorId }] },
          NOT: {
            name: { equals: originalName },
          },
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

  async updateExercise(
    data: UpdateExerciseDto,
    author: string,
    imgFilename: string,
    id: string,
  ) {
    try {
      const bParts = JSON.parse(data.bodyParts);
      const newData = {
        name: data.name,
        description: data.description,
        body_parts: {
          create: bParts.map((part) => ({
            bPart: {
              connect: {
                name: part,
              },
            },
          })),
        },
        type: data.type,
        author: { connect: { id: author } },
        ...(imgFilename !== "" && { image: imgFilename }),
      };

      const exercise = await this.prisma.exercise.update({
        where: { id },
        data: newData,
      });
      return exercise;
    } catch (e) {
      if (imgFilename) await unlinkSync("./public/" + imgFilename);
      console.log(e.message);

      throw new Error(e.message ?? "Could not save your exercise!");
    }
  }

  async disconnectBodyParts(
    id: string,
    bodyParts: { name: BodyPartType; id: number }[],
  ) {
    try {
      await this.prisma.exercise.update({
        where: { id },
        data: {
          body_parts: {
            disconnect: bodyParts.map((part) => ({
              id: part.id,
            })),
          },
        },
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
