import { AxiosError } from "axios";
import { UserNotFoundErrorType } from "utils/types/userNotFound.error";

export const isUserNotFoundError = (
  e: Error | AxiosError<UserNotFoundErrorType>
): e is AxiosError<UserNotFoundErrorType> => {
  if (
    (e as AxiosError<UserNotFoundErrorType>).response?.data.isUserNotFoundError
  )
    return true;
  return false;
};
