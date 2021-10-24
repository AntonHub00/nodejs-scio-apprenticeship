import { validateEmptyString, validateYear } from "./utils";

export default class Actor {
  private _firstName: string;
  private _lastName: string;
  private _yearOfBirth: number;

  constructor(firstName: string, lastName: string, yearOfBirth: number) {
    this.validateEmptyFirstName(firstName);
    this.validateEmptyLastName(lastName);
    this.validateYearOfBirth(yearOfBirth);

    this._firstName = firstName;
    this._lastName = lastName;
    this._yearOfBirth = yearOfBirth;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public set firstName(value: string) {
    this.validateEmptyFirstName(value);
    this._firstName = value;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public set lastName(value: string) {
    this.validateEmptyLastName(value);
    this._lastName = value;
  }

  public get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  public get yearOfBirth() {
    return this._yearOfBirth;
  }

  public set yearOfBirth(value: number) {
    this.validateYearOfBirth(value);
    this._yearOfBirth = value;
  }

  private validateEmptyFirstName(value: string) {
    validateEmptyString(value, "first name");
  }

  private validateEmptyLastName(value: string) {
    validateEmptyString(value, "last name");
  }

  private validateYearOfBirth(value: number) {
    validateYear(value, "year of birth");
  }
}
