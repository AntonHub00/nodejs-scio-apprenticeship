import IMovieDTO from "./Contracts/IMovieDTO";
import IMovieRepository from "./Contracts/IMovieRepository";

export default class GetAllMoviesUseCase {
  private repository: IMovieRepository;

  constructor(repository: IMovieRepository) {
    this.repository = repository;
  }

  public async getAllMovies(): Promise<IMovieDTO[]> {
    return await this.repository.getAllMovies();
  }
}
