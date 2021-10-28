import Movie from "../../Entities/Movie";
import IMovieCreateDTO from "./Contracts/IMovieCreateDTO";
import IMovieDTO from "./Contracts/IMovieDTO";
import IMovieRepository from "./Contracts/IMovieRepository";

export default class CreateMovieUseCase {
  private repository: IMovieRepository;

  constructor(repository: IMovieRepository) {
    this.repository = repository;
  }

  public async createMovie(movie: IMovieCreateDTO): Promise<IMovieDTO> {
    const domainMovie = new Movie(
      movie.title,
      movie.description,
      movie.releaseYear
    );

    const movieDTO = await this.repository.createMovie({
      title: domainMovie.title,
      description: domainMovie.description,
      releaseYear: domainMovie.releaseYear,
    });

    return movieDTO;
  }
}
