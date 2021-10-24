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

const loginUser = (
  userData: IUser,
  userRespository: IUserResporitory,
  passwordHasher: IPasswordHasher,
  jwt: IJWT
): string => {
  const user = new User(userData.username, userData.password);

  const dbUser = userRespository.findUserByUsername(user.username);

  if (
    !dbUser ||
    passwordHasher.compareHashedPassword(user.password, dbUser.password)
  )
    throw new AuthenticationError();

  return jwt.generate(user.username);
};
