import { NextFunction, Request, Response } from "express";
import { jwt } from "../../../DependencyInjection/UserDependencyInjection";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(400).send({ error: "Bearer authenticaton header not provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(400).send({ error: "The token provided has incorrect format" });
    return;
  }

  const username = jwt.validate(token);

  if (!username) {
    res.status(401).send({ error: "No authenticated" });
    return;
  }

  res.locals.username = username;
  next();
};

export default authenticate;
