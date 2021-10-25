import { getRepository } from "typeorm";
import UserDBEntity from "./UserDBEntity";

import IUser from "../../../../Domain/UseCases/User/Contracts/IUser";
import IUserResporitory from "../../../../Domain/UseCases/User/Contracts/IUserRepository";

export default class UserRepository implements IUserResporitory {
  private repository;

  constructor() {
    this.repository = getRepository(UserDBEntity);
  }

  public create(user: IUser) {
    const newUser: UserDBEntity = this.repository.create(user);
    this.repository.save(newUser);
  }

  public findUserByUsername(username: string) {
    return { username: "TEST", password: "password" };
  }
}
