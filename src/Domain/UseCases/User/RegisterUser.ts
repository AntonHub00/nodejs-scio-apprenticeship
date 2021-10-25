import IUser from "./Contracts/IUser";
import IUserResporitory from "./Contracts/IUserRepository";
import User from "../../Entities/User";
import IPasswordHasher from "./Contracts/IPasswordHasher";

const registerUser = async (
  userData: IUser,
  passwordHasher: IPasswordHasher,
  userRespository: IUserResporitory
) => {
  const hashedPassword = await passwordHasher.hashPassword(userData.password);

  const user = new User(userData.username, hashedPassword);

  userRespository.create({ username: user.username, password: user.password });
};

export { registerUser };
