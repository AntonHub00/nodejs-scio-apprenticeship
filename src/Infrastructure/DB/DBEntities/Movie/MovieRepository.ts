import { getRepository, Repository } from "typeorm";
import IMovieCreateDTO from "../../../../Domain/UseCases/Movie/Contracts/IMovieCreateDTO";
import IMovieDTO from "../../../../Domain/UseCases/Movie/Contracts/IMovieDTO";
import IMovieRepository from "../../../../Domain/UseCases/Movie/Contracts/IMovieRepository";
import ActorDBEntity from "../Actor/ActorDBEntity";
import MovieDBEntity from "./MovieDBEntity";

export default class MovieRepository implements IMovieRepository {
  private _movieRepository: Repository<MovieDBEntity>;
  private _actorRepository: Repository<ActorDBEntity>;

  constructor() {
    this._movieRepository = getRepository(MovieDBEntity);
    this._actorRepository = getRepository(ActorDBEntity);
  }

  public async createMovie(movie: IMovieCreateDTO): Promise<IMovieDTO> {
    const newMovie = this._movieRepository.create(movie);

    await this._movieRepository.save(newMovie);

    return {
      id: newMovie.id,
      title: newMovie.title,
      description: newMovie.description,
      releaseYear: newMovie.releaseYear,
    };
  }

  public async findMovieById(id: number): Promise<IMovieDTO | null> {
    const movie = await this._movieRepository.findOne(id);

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

    await this._movieRepository.update(id, movie);
  }

  public async deleteMovieById(id: number): Promise<void> {
    const dbMovie = await this.findMovieById(id);

    if (dbMovie == null) throw new Error("movie does not exist");

    await this._movieRepository.delete(id);
  }

  public async getAllMovies(): Promise<IMovieDTO[]> {
    const dbMovies = await this._movieRepository.find();

    const movies = dbMovies.map((dbMovie) => ({
      id: dbMovie.id,
      title: dbMovie.title,
      description: dbMovie.description,
      releaseYear: dbMovie.releaseYear,
    }));

    return movies;
  }

  public async addExistingActorsToMovie(movieId: number, actorIds: number[]) {
    const dbMovie = await this._movieRepository.findOne(movieId);

    if (dbMovie == null) throw new Error("movie does not exist");

    let actors: ActorDBEntity[] = [];

    for (const actorId of actorIds) {
      const actor = await this._actorRepository.findOne(actorId);

      if (actor == null)
        throw new Error(`actor with id ${actorId} does not exist`);

      actors = [...actors, actor];
    }

    dbMovie.actors = actors;

    this._movieRepository.save(dbMovie);
  }
}
