import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { env } from "./common/env";
import { exercisesData } from "./data/exercises.data";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    const numOfParts = await this.bodyPart.count({});
    const globalUser = await this.user.findUnique({
      where: { name: "global" },
    });
    const numOfExercises = await this.exercise.count({
      where: { authorId: "global" },
    });

    if (numOfParts === 0) {
      await this.bodyPart.createMany({
        data: [
          { name: "ABS" },
          { name: "ARMS" },
          { name: "BACK" },
          { name: "MULTI_JOINT" },
          { name: "LEGS" },
          { name: "CHEST" },
        ],
      });
    }

    if (!globalUser) {
      await this.user.create({
        data: {
          id: "global",
          name: "global",
          email: "global@global.com",
          password: env.GLOBAL_USER_PASSWD,
        },
      });
    }
    // await this.exercise.create({
    //   data: {
    //     name: "a",
    //     description: "v",
    //     image: "s",
    //     type: "EXERCISE",
    //     author: { connect: { id: "global" } },
    //     body_parts: { create: { bPart: { connect: { name: "ABS" } } } },
    //   },
    // });

    if (numOfExercises === 0) {
      exercisesData.forEach(
        async (exercise) => await this.exercise.create({ data: exercise }),
      );
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
