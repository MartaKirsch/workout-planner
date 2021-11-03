import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    const numOfParts = await this.bodyPart.count({});
    if (numOfParts === 0) {
      await this.bodyPart.createMany({
        data: [
          { name: "ABS" },
          { name: "ARMS" },
          { name: "BACK" },
          { name: "FBW" },
          { name: "LEGS" },
        ],
      });
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
