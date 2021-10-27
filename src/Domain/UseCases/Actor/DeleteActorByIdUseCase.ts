import IActorRespository from "./Contracts/IActorRespository";

export default class DeleteActorByIdUseCase {
  private repository: IActorRespository;

  constructor(repository: IActorRespository) {
    this.repository = repository;
  }

  public async deleteActorById(id: number): Promise<void> {
    await this.repository.deleteActorById(id);
  }
}
