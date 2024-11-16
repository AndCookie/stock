export interface ILoginState {
  loginToken: string;
  login: () => Promise<void>;
}
