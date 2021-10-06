import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "./common/env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: env.ENABLE_CORS, origin: env.CLIENT_HOST },
  });

  await app.listen(8080);
}
bootstrap();
