import { Request, Response, Router } from "express";
import { createActorUseCase } from "../../../DependencyInjection/ActorDependencyInjection";

export default class ActorController {
  private _router: Router;

  constructor() {
    this._router = Router();

    this.createActor = this.createActor.bind(this);

    this.router.post("/", this.createActor);
  }

  public get router(): Router {
    return this._router;
  }

  public async createActor(req: Request, res: Response) {
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;
    const yearOfBirth: number = req.body.yearOfBirth;

    if (!(firstName || lastName || yearOfBirth))
      res.status(400).send({
        error: "You must provide firstName, lastName and yearOfBirth",
      });

    try {
      const dbActor = await createActorUseCase.createActor({
        firstName,
        lastName,
        yearOfBirth,
      });

      res.status(201).send(dbActor);
    } catch (error) {
      const e = error as Error;
      res.status(400).send({ error: e.message });
    }
  }
}
