export type DtoErrorType<T> = {
  isDtoError: boolean;
  message: string;
  errors: { property: T; message: string }[];
};
