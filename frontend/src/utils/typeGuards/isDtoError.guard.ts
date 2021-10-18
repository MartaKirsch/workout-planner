import { AxiosError } from "axios";
import { DtoErrorType } from "utils/types/dto.error";

export const isDtoError = <T>(
  e: Error | AxiosError<DtoErrorType<T>>
): e is AxiosError<DtoErrorType<T>> => {
  if ((e as AxiosError<DtoErrorType<T>>).response?.data.isDtoError) return true;
  return false;
};
