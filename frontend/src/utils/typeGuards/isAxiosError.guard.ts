import { AxiosError } from "axios";

export const isAxiosError = (e: Error | AxiosError): e is AxiosError => {
  if ((e as AxiosError).isAxiosError) return true;
  return false;
};
