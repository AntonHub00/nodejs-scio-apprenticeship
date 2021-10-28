import { getRepository, Repository } from "typeorm";
import IMovieCreateDTO from "../../../../Domain/UseCases/Movie/Contracts/IMovieCreateDTO";
import IMovieDTO from "../../../../Domain/UseCases/Movie/Contracts/IMovieDTO";
import IMovieRepository from "../../../../Domain/UseCases/Movie/Contracts/IMovieRepository";
import MovieDBEntity from "./MovieDBEntity";

export default class MovieRepository implements IMovieRepository {
  private _repository: Repository<MovieDBEntity>;

  constructor() {
    this._repository = getRepository(MovieDBEntity);
  }

  public async createMovie(movie: IMovieCreateDTO): Promise<IMovieDTO> {
    const newMovie = this._repository.create(movie);

    await this._repository.save(newMovie);

    return {
      id: newMovie.id,
      title: newMovie.title,
      description: newMovie.description,
      releaseYear: newMovie.releaseYear,
    };
  }

  public async findMovieById(id: number): Promise<IMovieDTO | null> {
    const movie = await this._repository.findOne(id);

    if (movie == null) return null;

    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      releaseYear: movie.releaseYear,
    };
  }

  public async updateMovie(id: number, movie: IMovieCreateDTO): Promise<void> {
    const dbMovie = await this.findMovieById(id);

    if (dbMovie == null) throw new Error("movie does not exist");

    await this._repository.update(id, movie);
  }

  public async deleteMovieById(id: number): Promise<void> {
    const dbMovie = await this.findMovieById(id);

    if (dbMovie == null) throw new Error("movie does not exist");

    await this._repository.delete(id);
  }

  public async getAllMovies(): Promise<IMovieDTO[]> {
    const dbMovies = await this._repository.find();

    const movies = dbMovies.map((dbMovie) => ({
      id: dbMovie.id,
      title: dbMovie.title,
      description: dbMovie.description,
      releaseYear: dbMovie.releaseYear,
    }));

    return movies;
  }
}
