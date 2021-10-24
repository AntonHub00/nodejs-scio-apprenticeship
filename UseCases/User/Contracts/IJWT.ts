export default interface IJWT {
  generate: (username: string) => string;
  validate: (token: string) => boolean;
}
