import IUser from "./IUser";

export default interface IUserResporitory {
  create: (user: IUser) => void;
}
