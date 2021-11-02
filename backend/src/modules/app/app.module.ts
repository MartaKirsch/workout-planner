import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import * as csurf from "csurf";
import { PrismaService } from "src/prisma.service";
import { UserModule } from "../user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(
//         csurf({
//           cookie: { httpOnly: true, sameSite: "lax" },
//         }),
//       )
//       .exclude()
//       .forRoutes("*");
//   }
// }
export class AppModule {}
