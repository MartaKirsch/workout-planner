const parseStringEnv = (name: string) => {
  const value: string = process.env[name];

  if (!value) {
    throw new Error(`Invalid env ${name}`);
  }

  return value;
};

const parseIntEnv = (name: string) => {
  const value: string = process.env[name];

  const int: number = parseInt(value);

  if (isNaN(int)) {
    throw new Error(`Invalid env ${name}`);
  }

  return int;
};

const parseBoolEnv = (name: string) => {
  const value: string = process.env[name];

  if (value === "false") {
    return false;
  }

  if (value === "true") {
    return true;
  }

  throw new Error(`Invalid env ${name}`);
};

export const env = {
  PORT_BACKEND: parseIntEnv("PORT_BACKEND"),
  CLIENT_HOST: parseStringEnv("CLIENT_HOST"),
  ENABLE_CORS: parseBoolEnv("ENABLE_CORS"),
  DB_USER: parseStringEnv("DB_USER"),
  DB_PASSWD: parseStringEnv("DB_PASSWD"),
  DATABASE: parseStringEnv("DATABASE"),
  COOKIE_SECRET: parseStringEnv("COOKIE_SECRET"),
  GLOBAL_USER_PASSWD: parseStringEnv("GLOBAL_USER_PASSWD"),
};

export type Env = typeof env;
