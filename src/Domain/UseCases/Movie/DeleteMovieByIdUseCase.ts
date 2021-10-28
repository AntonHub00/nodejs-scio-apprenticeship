import IMovieRepository from "./Contracts/IMovieRepository";

export default class DeleteMovieByIdUseCase {
  private repository: IMovieRepository;

  constructor(repository: IMovieRepository) {
    this.repository = repository;
  }

  public async deleteMovieById(id: number): Promise<void> {
    await this.repository.deleteMovieById(id);
  }
}
