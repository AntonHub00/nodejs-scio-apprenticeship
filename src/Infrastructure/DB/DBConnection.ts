import { createConnection } from "typeorm";

import UserDBEntity from "./DBEntities/User/UserDBEntity";

const dbConfigVariables = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
};

const dbConfigIsValid = Object.values(dbConfigVariables).every(
  (variable) => variable != null
);

if (!dbConfigIsValid) throw new Error("Database configuration not set");

if (isNaN(dbConfigVariables.port))
  throw new Error("Database port must be a number");

createConnection({
  type: "mssql",
  host: dbConfigVariables.host,
  database: dbConfigVariables.database,
  port: dbConfigVariables.port,
  username: dbConfigVariables.user,
  password: dbConfigVariables.password,
  options: {
    encrypt: false,
  },
  logging: false,
  synchronize: true,
  entities: [UserDBEntity],
});
