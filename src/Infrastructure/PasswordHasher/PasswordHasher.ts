import bcrypt from "bcrypt";
import IPasswordHasher from "../../Domain/UseCases/User/Contracts/IPasswordHasher";

export default class PasswordHasher implements IPasswordHasher {
  private saltRounds = 10;

  public async hashPassword(password: string) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  public async compareHashedPassword(
    plainPassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
