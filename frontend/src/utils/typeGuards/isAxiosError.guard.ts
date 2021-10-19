import { AxiosError } from "axios";
import { GenericAxiosError } from "utils/types/axios.error";

export const isAxiosError = (
  e: Error | AxiosError<GenericAxiosError>
): e is AxiosError<GenericAxiosError> => {
  if (
    (e as AxiosError<GenericAxiosError>).isAxiosError &&
    (e as AxiosError<GenericAxiosError>).response?.data.message
  )
    return true;
  return false;
};
