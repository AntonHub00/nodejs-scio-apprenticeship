import { Request, Response, Router } from "express";
import {
  createActorUseCase,
  findActorByIdUseCase,
} from "../../../DependencyInjection/ActorDependencyInjection";

export default class ActorController {
  private _router: Router;

  constructor() {
    this._router = Router();

    this.createActor = this.createActor.bind(this);
    this.findActorById = this.findActorById.bind(this);

    this.router.post("/", this.createActor);
    this.router.get("/:id", this.findActorById);
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

  public async findActorById(req: Request, res: Response) {
    const actorId = Number(req.params.id);

    const dbActor = await findActorByIdUseCase.findActorById(actorId);

    if (dbActor == null) {
      res.status(404).send({ error: "not found" });
      return;
    }

    res.status(200).send(dbActor);
  }
}
