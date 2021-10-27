import dotenv from "dotenv";
import express, { Express } from "express";

dotenv.config();

import { dbConnection } from "./src/Infrastructure/DB/DBConnection";

const startServer = async () => {
  await dbConnection;

  // Need to wait for connection to be ready because controllers imports the
  // dependency injection modules which get repository specific implementations.
  // If the connection is not ready, trying to get the repositories will fail.
  const { default: UserController } = await import(
    "./src/Infrastructure/Controllers/User/UserController"
  );

  const { default: ActorController } = await import(
    "./src/Infrastructure/Controllers/Actor/ActorController"
  );

  const port = process.env.APP_PORT;
  if (port == null) throw new Error("App port not set");

  const app: Express = express();

  app.use(express.json());
  app.use("/api/user", new UserController().router);
  app.use("/api/actor", new ActorController().router);

  app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`)
  );
};

startServer();
