import IMovieRepository from "./Contracts/IMovieRepository";

export default class AddExistingActorsToMovieUseCase {
  private repository: IMovieRepository;

  constructor(repository: IMovieRepository) {
    this.repository = repository;
  }

  public async addExistingActorsToMovie(
    movieId: number,
    actorIds: number[]
  ): Promise<void> {
    await this.repository.addExistingActorsToMovie(movieId, actorIds);
  }
}
