import IUser from "./Contracts/IUser";
import IUserResporitory from "./Contracts/IUserRepository";
import User from "../../Entities/User";

const registerUser = (userData: IUser, userRespository: IUserResporitory) => {
  const user = new User(userData.username, userData.password);
  userRespository.create(user);
};

export { registerUser };
