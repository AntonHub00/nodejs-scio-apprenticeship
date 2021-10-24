import { validateEmptyString } from "./Utils";

export default class User {
  private _username: string;
  private _password: string;

  constructor(username: string, password: string) {
    this.validateEmptyUsername(username);
    this.validateEmptyPassword(password);

    this._username = username;
    this._password = password;
  }

  public get username(): string {
    return this._username;
  }

  public get password(): string {
    return this._password;
  }

  private validateEmptyUsername(value: string) {
    validateEmptyString(value, "username");
  }

  private validateEmptyPassword(value: string) {
    validateEmptyString(value, "password");
  }
}
