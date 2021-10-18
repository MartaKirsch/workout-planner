import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { env } from "./common/env";
import { AppModule } from "./modules/app/app.module";
import * as session from "express-session";
import * as MySQLStoreCreator from "express-mysql-session";
import * as mysql2 from "mysql2/promise";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: env.ENABLE_CORS, origin: env.CLIENT_HOST },
  });

  //session store
  const options = {
    host: "db",
    port: 3306,
    user: env.DB_USER,
    password: env.DB_PASSWD,
    database: env.DATABASE,
    checkExpirationInterval: 1000 * 60 * 60 * 2,
    expiration: 1000 * 60 * 60 * 24,
  };

  const connection = mysql2.createPool(options);
  const sessionStore = new (MySQLStoreCreator(session))({}, connection);

  app.use(
    session({
      secret: env.COOKIE_SECRET,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const transformedErrors = validationErrors.map((err) => {
          return {
            property: err.property,
            message: Object.entries(err.constraints)[0][1],
          };
        });
        throw new BadRequestException({
          isDtoError: true,
          message: "Invalid data!",
          errors: transformedErrors,
        });
      },
    }),
  );

  await app.listen(env.PORT_BACKEND || 8080);
}
bootstrap();
