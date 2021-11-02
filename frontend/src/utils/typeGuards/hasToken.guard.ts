import { AxiosResponse } from "axios";
import { AxiosTokenResponse } from "utils/types/axiosToken.response";

export const hasToken = (
  a: AxiosResponse | AxiosResponse<AxiosTokenResponse>
): a is AxiosResponse<AxiosTokenResponse> => {
  if ((a as AxiosResponse<AxiosTokenResponse>).data.token) return true;
  return false;
};
