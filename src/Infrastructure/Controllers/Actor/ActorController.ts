import { Request, Response, Router } from "express";
import {
  createActorUseCase,
  deleteActorByIdUseCase,
  findActorByIdUseCase,
  getAllActorsUseCase,
  updateActorUseCase,
} from "../../../DependencyInjection/ActorDependencyInjection";

export default class ActorController {
  private _router: Router;

  constructor() {
    this._router = Router();

    this.createActor = this.createActor.bind(this);
    this.findActorById = this.findActorById.bind(this);
    this.deleteActorById = this.deleteActorById.bind(this);
    this.getAllActors = this.getAllActors.bind(this);
    this.updateActor = this.updateActor.bind(this);

    this.router.post("/", this.createActor);
    this.router.get("/:id", this.findActorById);
    this.router.delete("/:id", this.deleteActorById);
    this.router.get("/", this.getAllActors);
    this.router.put("/:id", this.updateActor);
  }

  public get router(): Router {
    return this._router;
  }

  public async createActor(req: Request, res: Response) {
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;
    const yearOfBirth: number = req.body.yearOfBirth;

    if (!(firstName && lastName && yearOfBirth != undefined)) {
      res.status(400).send({
        error: "You must provide firstName, lastName and yearOfBirth",
      });

      return;
    }

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

  public async updateActor(req: Request, res: Response) {
    const id = Number(req.params.id);
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;
    const yearOfBirth: number = req.body.yearOfBirth;

    if (!(firstName && lastName && yearOfBirth != undefined)) {
      res.status(400).send({
        error: "You must provide firstName, lastName and yearOfBirth",
      });

      return;
    }

    try {
      await updateActorUseCase.updateActor({
        id,
        firstName,
        lastName,
        yearOfBirth,
      });

      res.status(200).send();
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

  public async deleteActorById(req: Request, res: Response) {
    const actorId = Number(req.params.id);

    try {
      await deleteActorByIdUseCase.deleteActorById(actorId);
      res.status(200).send();
    } catch (error) {
      const e = error as Error;
      res.status(404).send({ error: e.message });
    }
  }

  public async getAllActors(req: Request, res: Response) {
    const dbActors = await getAllActorsUseCase.getAllActors();
    res.status(200).send(dbActors);
  }
}
