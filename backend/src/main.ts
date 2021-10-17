import { ValidationError, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { env } from "./common/env";
import { DtoException } from "./exceptions/dto.exception";
import { DtoFilter } from "./filters/dto.filter";
import { AppModule } from "./modules/app/app.module";
// import session from "express-session";
// import MySQLStore from "express-mysql-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: env.ENABLE_CORS, origin: env.CLIENT_HOST },
  });

  // //session store
  // const options = {
  //   host: "db",
  //   port: 3306,
  //   user: env.DB_USER,
  //   password: env.DB_PASSWD,
  //   database: env.DATABASE,
  //   checkExpirationInterval: 1000 * 60 * 60 * 2,
  //   expiration: 1000 * 60 * 60 * 24,
  // };

  // const store = MySQLStore(session);
  // const sessionStore = new store(options);

  // app.use(
  //   session({
  //     secret: env.COOKIE_SECRET,
  //     store: sessionStore,
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       httpOnly: true,
  //       maxAge: 1000 * 60 * 60 * 24,
  //     },
  //   }),
  // );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new DtoException(validationErrors);
      },
    }),
  );

  app.useGlobalFilters(new DtoFilter()); //first fires the last one

  await app.listen(env.PORT_BACKEND || 8080);
}
bootstrap();
