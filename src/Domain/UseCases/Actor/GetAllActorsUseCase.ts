import IActorDTO from "./Contracts/IActorDTO";
import IActorRespository from "./Contracts/IActorRespository";

export default class GetAllActorsUseCase {
  private repository: IActorRespository;

  constructor(repository: IActorRespository) {
    this.repository = repository;
  }

  public async getAllActors(): Promise<IActorDTO[]> {
    return await this.repository.getAllActors();
  }
}
