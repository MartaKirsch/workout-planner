import { AxiosTokenResponse } from "./axiosToken.response";

export type userResponseType = AxiosTokenResponse & {
  isLoggedIn: true;
  username: string;
};
