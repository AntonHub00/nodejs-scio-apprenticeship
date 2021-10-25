import { getRepository, Repository } from "typeorm";
import UserDBEntity from "./UserDBEntity";

import IUser from "../../../../Domain/UseCases/User/Contracts/IUser";
import IUserResporitory from "../../../../Domain/UseCases/User/Contracts/IUserRepository";

export default class UserRepository implements IUserResporitory {
  private repository: Repository<UserDBEntity>;

  constructor() {
    this.repository = getRepository(UserDBEntity);
  }

  public async create(user: IUser) {
    const newUser: UserDBEntity = this.repository.create(user);
    await this.repository.save(newUser);
  }

  public async findUserByUsername(username: string) {
    const user = await this.repository.findOne(username);

    if (user != undefined)
      return { username: user.username, password: user.password };

    return null;
  }
}
