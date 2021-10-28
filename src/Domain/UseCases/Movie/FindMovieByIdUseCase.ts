import IMovieDTO from "./Contracts/IMovieDTO";
import IMovieRepository from "./Contracts/IMovieRepository";

export default class FindMovieByIdUseCase {
  private repository: IMovieRepository;

  constructor(repository: IMovieRepository) {
    this.repository = repository;
  }

  public async findMovieById(id: number): Promise<IMovieDTO | null> {
    const movieDTO = await this.repository.findMovieById(id);

    if (movieDTO == null) return null;

    return movieDTO;
  }
}
