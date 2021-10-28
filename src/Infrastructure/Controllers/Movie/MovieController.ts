import { Request, Response, Router } from "express";
import {
  createMovieUseCase,
  deleteMovieUseCase,
  findMovieByIdUseCase,
  getAllMoviesUseCase,
  updateMovieUseCase,
} from "../../../DependencyInjection/MovieDependencyInjection";

export default class MovieController {
  private _router: Router;

  constructor() {
    this._router = Router();

    this.createMovie = this.createMovie.bind(this);
    this.findMovieById = this.findMovieById.bind(this);
    this.deleteMovieById = this.deleteMovieById.bind(this);
    this.getAllMovies = this.getAllMovies.bind(this);
    this.updateMovie = this.updateMovie.bind(this);

    this.router.post("/", this.createMovie);
    this.router.get("/:id", this.findMovieById);
    this.router.delete("/:id", this.deleteMovieById);
    this.router.get("/", this.getAllMovies);
    this.router.put("/:id", this.updateMovie);
  }

  public get router(): Router {
    return this._router;
  }

  public async createMovie(req: Request, res: Response) {
    const title: string = req.body.title;
    const description: string = req.body.description;
    const releaseYear: number = req.body.releaseYear;

    if (!(title && description && releaseYear != undefined)) {
      res.status(400).send({
        error: "You must provide title, description and releaseYear",
      });

      return;
    }

    try {
      const dbMovie = await createMovieUseCase.createMovie({
        title,
        description,
        releaseYear,
      });

      res.status(201).send(dbMovie);
    } catch (error) {
      const e = error as Error;
      res.status(400).send({ error: e.message });
    }
  }

  public async updateMovie(req: Request, res: Response) {
    const id = Number(req.params.id);
    const title: string = req.body.title;
    const description: string = req.body.description;
    const releaseYear: number = req.body.releaseYear;

    if (!(title && description && releaseYear != undefined)) {
      res.status(400).send({
        error: "You must provide title, description and releaseYear",
      });

      return;
    }

    try {
      await updateMovieUseCase.updateMovie({
        id,
        title,
        description,
        releaseYear,
      });

      res.status(200).send();
    } catch (error) {
      const e = error as Error;
      res.status(400).send({ error: e.message });
    }
  }

  public async findMovieById(req: Request, res: Response) {
    const movieId = Number(req.params.id);

    const dbMovie = await findMovieByIdUseCase.findMovieById(movieId);

    if (dbMovie == null) {
      res.status(404).send({ error: "not found" });
      return;
    }

    res.status(200).send(dbMovie);
  }

  public async deleteMovieById(req: Request, res: Response) {
    const movieId = Number(req.params.id);

    try {
      await deleteMovieUseCase.deleteMovieById(movieId);
      res.status(200).send();
    } catch (error) {
      const e = error as Error;
      res.status(404).send({ error: e.message });
    }
  }

  public async getAllMovies(_req: Request, res: Response) {
    const dbMovies = await getAllMoviesUseCase.getAllMovies();
    res.status(200).send(dbMovies);
  }
}
