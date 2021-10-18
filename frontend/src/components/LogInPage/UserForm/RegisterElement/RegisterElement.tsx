import React, { FunctionComponent } from "react";
import Button from "components/shared/Button";
import Input from "components/shared/Input";
import MainForm from "components/shared/MainForm";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  EMAIL_PATTERN,
  EMAIL_PATTERN_MSSG,
  PASSWD_MAX_LENGTH,
  PASSWD_MAX_LENGTH_MSSG,
  PASSWD_MIN_LENGTH,
  PASSWD_MIN_LENGTH_MSSG,
  REQUIRED_MSSG,
  USERNAME_MAX_LENGTH,
  USERNAME_MAX_LENGTH_MSSG,
  USERNAME_MIN_LENGTH,
  USERNAME_MIN_LENGTH_MSSG,
} from "utils/const/userForm.const";
import axios from "axios";
import { REGISTER_USER_URL } from "utils/backend.endpoints";
import { isDtoError } from "utils/typeGuards/isDtoError.guard";
import { isAxiosError } from "utils/typeGuards/isAxiosError.guard";
import { useUserContext } from "components/UserContext/useUserContext";
import { registerUserResponseType } from "utils/types/registerUser.response";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const RegisterElement: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const { changeUserContextValue } = useUserContext();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await axios.post<registerUserResponseType>(
        REGISTER_USER_URL,
        data
      );
      changeUserContextValue(res.data);
    } catch (e) {
      if (!(e instanceof Error)) return;

      //if it's axios error
      if (isAxiosError(e)) {
        //if it's field error
        if (isDtoError<keyof Inputs>(e)) {
          e.response?.data.errors.forEach((err) => {
            setError(
              err.property,
              { type: "server", message: err.message },
              { shouldFocus: true }
            );
          });
          return;
        }

        return;
      }

      //TODO if any other error display toast with message
    }
  };

  return (
    <MainForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Username"
        register={register("username", {
          required: { value: true, message: REQUIRED_MSSG },
          maxLength: {
            value: USERNAME_MAX_LENGTH,
            message: USERNAME_MAX_LENGTH_MSSG,
          },
          minLength: {
            value: USERNAME_MIN_LENGTH,
            message: USERNAME_MIN_LENGTH_MSSG,
          },
        })}
        errorMssg={errors.username?.message}
      />
      <Input
        label="Email"
        register={register("email", {
          required: { value: true, message: REQUIRED_MSSG },
          pattern: {
            value: EMAIL_PATTERN,
            message: EMAIL_PATTERN_MSSG,
          },
        })}
        errorMssg={errors.email?.message}
      />
      <Input
        label="Password"
        register={register("password", {
          required: { value: true, message: REQUIRED_MSSG },
          maxLength: {
            value: PASSWD_MAX_LENGTH,
            message: PASSWD_MAX_LENGTH_MSSG,
          },
          minLength: {
            value: PASSWD_MIN_LENGTH,
            message: PASSWD_MIN_LENGTH_MSSG,
          },
        })}
        errorMssg={errors.password?.message}
        type="password"
      />
      <Button type="submit">Register</Button>
    </MainForm>
  );
};

export default RegisterElement;
