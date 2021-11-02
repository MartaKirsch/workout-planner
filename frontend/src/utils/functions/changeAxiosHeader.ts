import axios from "axios";

export const changeAxiosHeader = (
  token: string,
  header: string = "csrf-token"
) => {
  axios.defaults.headers.common[header] = token;
};
