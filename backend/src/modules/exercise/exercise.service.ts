import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async findExercises({ username }: { username: string }) {
    // const exercises = await this.prisma.exercise.findMany({ where: {
    //     OR:[authorId:{equals:"global"}, authorId:{equals:author}]
    // } ,include:{author}});

    const exercises = await this.prisma.exercise.findMany({
      where: {
        author: { OR: [{ name: "global" }, { name: username }] },
      },
    });

    return exercises;
  }
}
