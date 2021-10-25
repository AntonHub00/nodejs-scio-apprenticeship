import UserRepository from "./Infrastructure/DB/DBEntities/User/UserRespository";
import JWT from "./Infrastructure/JWT/JWT";
import PasswordHasher from "./Infrastructure/PasswordHasher/PasswordHasher";

import LoginUserUseCase from "./Domain/UseCases/User/LoginUser";
import RegisterUserUseCase from "./Domain/UseCases/User/RegisterUser";

export default class DependencyInjection {
  private _userRepositoryImplementation: UserRepository;
  private _passwordHasherImplementation: PasswordHasher;
  private _jwtImplementation: JWT;
  private _RegisterUser: RegisterUserUseCase;
  private _LoginUser: LoginUserUseCase;

  constructor() {
    this._userRepositoryImplementation = new UserRepository();
    this._passwordHasherImplementation = new PasswordHasher();
    this._jwtImplementation = new JWT();

    this._RegisterUser = new RegisterUserUseCase(
      this._passwordHasherImplementation,
      this._userRepositoryImplementation
    );

    this._LoginUser = new LoginUserUseCase(
      this._passwordHasherImplementation,
      this._jwtImplementation,
      this._userRepositoryImplementation
    );
  }

  public get RegisterUser() {
    return this._RegisterUser;
  }

  public get LoginUser() {
    return this._LoginUser;
  }
}
