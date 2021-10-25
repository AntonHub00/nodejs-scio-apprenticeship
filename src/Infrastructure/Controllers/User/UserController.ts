import { Request, response, Response, Router } from "express";
import DependencyInjection from "../../../DependencyInjection";

export default class UserController {
  private _router: Router;
  private dependencies: DependencyInjection;

  constructor(dependencies: DependencyInjection) {
    this.dependencies = dependencies;

    this._router = Router();

    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);

    this._router.post("/register", this.registerUser);
    this.router.post("/login", this.loginUser);
  }

  public get router(): Router {
    return this._router;
  }

  public async registerUser(req: Request, res: Response) {
    const username: string = req.body.username;
    const password: string = req.body.password;

    if (!(username || password)) {
      res.status(400).send({ error: "You must provide user and passord" });
      return;
    }

    try {
      await this.dependencies.RegisterUser.registerUser({ username, password });
      res.status(201).send({ username, password });
    } catch (error) {
      const e = error as Error;
      res.status(400).send({ error: e.message });
    }
  }

  public async loginUser(req: Request, res: Response) {
    const username: string = req.body.username;
    const password: string = req.body.password;

    try {
      const token = await this.dependencies.LoginUser.loginUser({
        username,
        password,
      });

      res.status(200).send({ token });
    } catch (error) {
      const e = error as Error;
      res.status(400).send({ error: e.message });
    }
  }
}
