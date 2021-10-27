import UserRepository from "./Infrastructure/DB/DBEntities/User/UserRespository";
import JWT from "./Infrastructure/JWT/JWT";
import PasswordHasher from "./Infrastructure/PasswordHasher/PasswordHasher";

import LoginUserUseCase from "./Domain/UseCases/User/LoginUser";
import RegisterUserUseCase from "./Domain/UseCases/User/RegisterUser";

const userRepository = new UserRepository();
const passwordHasher = new PasswordHasher();
const jwt = new JWT();

const RegisterUser = new RegisterUserUseCase(passwordHasher, userRepository);

const LoginUser = new LoginUserUseCase(passwordHasher, jwt, userRepository);

export { userRepository, passwordHasher, jwt, RegisterUser, LoginUser };
