export default interface IPasswordHasher {
  hashPassword: (password: string) => string;
  compareHashedPassword: (
    plainPassword: string,
    hashedPassword: string
  ) => boolean;
}
