import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ExerciseFiltersDto } from "./dto/exercise.filters.dto";

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
}
