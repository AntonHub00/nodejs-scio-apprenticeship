export default interface IPasswordHasher {
  hashPassword: (password: string) => Promise<string>;
  compareHashedPassword: (
    plainPassword: string,
    hashedPassword: string
  ) => Promise<boolean>;
}
