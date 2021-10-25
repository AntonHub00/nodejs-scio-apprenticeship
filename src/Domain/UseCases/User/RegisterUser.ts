import IUser from "./Contracts/IUser";
import IUserResporitory from "./Contracts/IUserRepository";
import User from "../../Entities/User";
import IPasswordHasher from "./Contracts/IPasswordHasher";

export default class RegisterUserUseCase {
  private passwordHasher: IPasswordHasher;
  private repository: IUserResporitory;

  constructor(passwordHasher: IPasswordHasher, repository: IUserResporitory) {
    this.passwordHasher = passwordHasher;
    this.repository = repository;
  }

  async registerUser(userData: IUser) {
    const hashedPassword = await this.passwordHasher.hashPassword(
      userData.password
    );

    const user = new User(userData.username, hashedPassword);

    const dbUser = await this.repository.findUserByUsername(user.username);

    if (dbUser != null) throw new Error("Username already exists");

    await this.repository.create({
      username: user.username,
      password: user.password,
    });
  }
}
