import CreateMovieUseCase from "../Domain/UseCases/Movie/CreateMovieUseCase";
import DeleteMovieByIdUseCase from "../Domain/UseCases/Movie/DeleteMovieByIdUseCase";
import FindMovieByIdUseCase from "../Domain/UseCases/Movie/FindMovieByIdUseCase";
import GetAllMoviesUseCase from "../Domain/UseCases/Movie/GetAllMoviesUseCase";
import UpdateMovieUseCase from "../Domain/UseCases/Movie/UpdateMovieUseCase";
import MovieRepository from "../Infrastructure/DB/DBEntities/Movie/MovieRepository";

const movieRepository = new MovieRepository();

const createMovieUseCase = new CreateMovieUseCase(movieRepository);
const deleteMovieUseCase = new DeleteMovieByIdUseCase(movieRepository);
const findMovieByIdUseCase = new FindMovieByIdUseCase(movieRepository);
const getAllMovies = new GetAllMoviesUseCase(movieRepository);
const updateMovieUseCase = new UpdateMovieUseCase(movieRepository);

export {
  movieRepository,
  createMovieUseCase,
  deleteMovieUseCase,
  findMovieByIdUseCase,
  getAllMovies,
  updateMovieUseCase,
};
