import IMovieCreateDTO from "./IMovieCreateDTO";
import IMovieDTO from "./IMovieDTO";

export default interface IMovieRepository {
  createMovie: (movie: IMovieCreateDTO) => Promise<IMovieDTO>;
  findMovieById: (id: number) => Promise<IMovieDTO | null>;
  updateMovie: (id: number, movie: IMovieCreateDTO) => Promise<void>;
  deleteMovieById: (id: number) => Promise<void>;
  getAllMovies: () => Promise<IMovieDTO[]>;
}
