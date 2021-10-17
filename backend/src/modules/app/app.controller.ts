import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("prisma")
  async testPrisma() {
    const res = await this.prisma.user.create({
      data: {
        name: "Marta",
        email: "marta@gmail.com",
        password: "passwd",
      },
    });
    return res;
  }
}
