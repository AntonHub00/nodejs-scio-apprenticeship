import Actor from "../../Entities/Actor";
import IActorCreateDTO from "./Contracts/IActorCreateDTO";
import IActorDTO from "./Contracts/IActorDTO";
import IActorRespository from "./Contracts/IActorRespository";

export default class CreateActorUseCase {
  private repository: IActorRespository;

  constructor(repository: IActorRespository) {
    this.repository = repository;
  }

  public async createActor(actor: IActorCreateDTO): Promise<IActorDTO> {
    const domainActor = new Actor(
      actor.firstName,
      actor.lastName,
      actor.yearOfBirth
    );

    const actorDTO = await this.repository.createActor({
      firstName: domainActor.firstName,
      lastName: domainActor.lastName,
      yearOfBirth: domainActor.yearOfBirth,
    });

    return actorDTO;
  }
}
