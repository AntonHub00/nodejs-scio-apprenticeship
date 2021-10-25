import User from "../../Entities/User";
import IJWT from "./Contracts/IJWT";
import IPasswordHasher from "./Contracts/IPasswordHasher";
import IUser from "./Contracts/IUser";
import IUserResporitory from "./Contracts/IUserRepository";

class AuthenticationError extends Error {
  constructor() {
    super();
    this.message = "Not valid credentials";
    this.name = "Authentication Error";
  }
}

export default class LoginUserUseCase {
  private passwordHasher: IPasswordHasher;
  private jwt: IJWT;
  private repository: IUserResporitory;

  constructor(
    passwordHasher: IPasswordHasher,
    jwt: IJWT,
    repository: IUserResporitory
  ) {
    this.passwordHasher = passwordHasher;
    this.jwt = jwt;
    this.repository = repository;
  }

  async loginUser(userData: IUser) {
    const user = new User(userData.username, userData.password);

    const dbUser = await this.repository.findUserByUsername(user.username);

    if (!dbUser) throw new AuthenticationError();

    const passwordIsValid = await this.passwordHasher.compareHashedPassword(
      user.password,
      dbUser.password
    );

    if (!passwordIsValid) throw new AuthenticationError();

    return this.jwt.generate(user.username);
  }
}
