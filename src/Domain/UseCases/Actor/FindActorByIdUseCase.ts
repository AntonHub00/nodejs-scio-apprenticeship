import IActorDTO from "./Contracts/IActorDTO";
import IActorRespository from "./Contracts/IActorRespository";

export default class FindActorByIdUseCase {
  private repository: IActorRespository;

  constructor(repository: IActorRespository) {
    this.repository = repository;
  }

  public async findActorById(id: number): Promise<IActorDTO | null> {
    const actorDTO = await this.repository.findActorById(id);

    if (actorDTO == null) return null;

    return actorDTO;
  }
}
