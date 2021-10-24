export default interface IJWT {
  generate: (username: string) => string;
  validate: (token: string) => string | undefined; // return the username
}
