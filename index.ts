import dotenv from "dotenv";
import express, { Express } from "express";

dotenv.config();

import { dbConnection } from "./src/Infrastructure/DB/DBConnection";
import DependencyInjection from "./src/DependencyInjection";

import UserController from "./src/Infrastructure/Controllers/User/UserController";

const startServer = async () => {
  await dbConnection;

  const dependencies = new DependencyInjection();

  const port = process.env.APP_PORT;
  if (port == null) throw new Error("App port not set");

  const app: Express = express();

  app.use(express.json());
  app.use("/api/user", new UserController(dependencies).router);

  app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`)
  );
};

startServer();
