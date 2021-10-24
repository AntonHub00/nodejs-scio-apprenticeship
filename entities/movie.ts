import Actor from "./Actor";

import { validateEmptyString, validateYear } from "./Utils";

export default class Movie {
  private _title: string;
  private _description: string;
  private _releaseYear: number;
  public actors: Actor[] = [];

  constructor(
    title: string,
    description: string,
    releaseYear: number,
    actors?: Actor[]
  ) {
    this.validateEmptyTitle(title);
    this.validateEmptyDescription(description);
    this.validateReleaseYear(releaseYear);

    this._title = title;
    this._description = description;
    this._releaseYear = releaseYear;
    if (actors) this.actors = actors;
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this.validateEmptyTitle(value);
    this._title = value;
  }

  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this.validateEmptyDescription(value);
    this._description = value;
  }

  public get releaseYear(): number {
    return this._releaseYear;
  }

  public set releaseYear(value: number) {
    this.validateReleaseYear(value);
    this._releaseYear = value;
  }
  private validateEmptyTitle(value: string) {
    validateEmptyString(value, "title");
  }

  private validateEmptyDescription(value: string) {
    validateEmptyString(value, "description");
  }

  private validateReleaseYear(value: number) {
    validateYear(value, "release year");
  }
}
