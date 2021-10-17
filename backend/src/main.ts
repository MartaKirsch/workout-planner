import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "./common/env";
import session from "express-session";
import MySQLStore from "express-mysql-session";
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const MySQLStore = require("express-mysql-session")(session);

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

  console.log(options);

  const store = MySQLStore(session);
  const sessionStore = new store(options);

  // const sessionStore = new MySQLStore(options);

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

  await app.listen(env.PORT_BACKEND || 8080);
}
bootstrap();
