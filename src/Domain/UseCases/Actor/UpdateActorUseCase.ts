import Actor from "../../Entities/Actor";
import IActorDTO from "./Contracts/IActorDTO";
import IActorRespository from "./Contracts/IActorRespository";

export default class UpdateActorUseCase {
  private repository: IActorRespository;

  constructor(repository: IActorRespository) {
    this.repository = repository;
  }

  public async updateActor(actor: IActorDTO): Promise<void> {
    const domainActor = new Actor(
      actor.firstName,
      actor.lastName,
      actor.yearOfBirth
    );

    await this.repository.updateActor(actor.id, {
      firstName: domainActor.firstName,
      lastName: domainActor.lastName,
      yearOfBirth: domainActor.yearOfBirth,
    });
  }
}
