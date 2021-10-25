import jwt from "jsonwebtoken";
import IJWT from "../UseCases/User/Contracts/IJWT";

export default class JWT implements IJWT {
  private secret: string;

  constructor() {
    const secret = process.env.JWT_SECRET;

    if (secret == null) throw new Error("JWT secret not set");

    this.secret = secret;
  }

  public generate(username: string): string {
    return jwt.sign({ username }, this.secret, { expiresIn: "1h" });
  }

  public validate(token: string) {
    try {
      const decoded = jwt.verify(token, this.secret) as jwt.JwtPayload;
      return decoded.username;
    } catch (error) {
      return null;
    }
  }
}
