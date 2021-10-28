import Movie from "../../Entities/Movie";
import IMovieDTO from "./Contracts/IMovieDTO";
import IMovieRepository from "./Contracts/IMovieRepository";

export default class UpdateMovieUseCase {
  private repository: IMovieRepository;

  constructor(repository: IMovieRepository) {
    this.repository = repository;
  }

  public async updateMovie(movie: IMovieDTO): Promise<void> {
    const domainMovie = new Movie(
      movie.title,
      movie.description,
      movie.releaseYear
    );

    await this.repository.updateMovie(movie.id, {
      title: domainMovie.title,
      description: domainMovie.description,
      releaseYear: domainMovie.releaseYear,
    });
  }
}
