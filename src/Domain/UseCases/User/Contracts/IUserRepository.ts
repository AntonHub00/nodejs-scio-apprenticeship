import IUser from "./IUser";

export default interface IUserResporitory {
  create: (user: IUser) => Promise<void>;
  findUserByUsername: (username: string) => Promise<IUser | null>;
}
