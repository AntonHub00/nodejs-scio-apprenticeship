import { getRepository, Repository } from "typeorm";
import IActorCreateDTO from "../../../../Domain/UseCases/Actor/Contracts/IActorCreateDTO";
import IActorDTO from "../../../../Domain/UseCases/Actor/Contracts/IActorDTO";
import IActorRespository from "../../../../Domain/UseCases/Actor/Contracts/IActorRespository";
import ActorDBEntity from "./ActorDBEntity";

export default class ActorRepository implements IActorRespository {
  private _repository: Repository<ActorDBEntity>;

  constructor() {
    this._repository = getRepository(ActorDBEntity);
  }

  public async createActor(actor: IActorCreateDTO): Promise<IActorDTO> {
    const newActor = this._repository.create(actor);

    await this._repository.save(newActor);

    return {
      id: newActor.id,
      firstName: newActor.firstName,
      lastName: newActor.lastName,
      yearOfBirth: newActor.yearOfBirth,
    };
  }

  public async findActorById(id: number): Promise<IActorDTO | null> {
    const actor = await this._repository.findOne(id);

    if (actor == null) return null;

    return {
      id: actor.id,
      firstName: actor.firstName,
      lastName: actor.lastName,
      yearOfBirth: actor.yearOfBirth,
    };
  }

  public async updateActor(id: number, actor: IActorCreateDTO): Promise<void> {
    await this._repository.update(id, actor);
  }

  public async deleteActorById(id: number): Promise<void> {
    const dbActor = await this.findActorById(id);

    if (dbActor == null) throw new Error("actor does not exist");

    await this._repository.delete(id);
  }

  public async getAllActors(): Promise<IActorDTO[]> {
    const dbActors = await this._repository.find();

    const actors = dbActors.map((dbActor) => ({
      id: dbActor.id,
      firstName: dbActor.firstName,
      lastName: dbActor.lastName,
      yearOfBirth: dbActor.yearOfBirth,
    }));

    return actors;
  }
}
