import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserModule } from "../user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  // constructor(private readonly prisma: PrismaService) {}
  // async onApplicationBootstrap() {
  //   const numOfParts = await this.prisma.bodyPart.count({});
  //   if(numOfParts===0){
  //     await this.prisma.bodyPart.createMany({});
  //   }
  // }
}
