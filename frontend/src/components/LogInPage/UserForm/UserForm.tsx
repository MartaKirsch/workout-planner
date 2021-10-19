import React, { FunctionComponent, useCallback, useState } from "react";
import axios from "axios";
import Button from "components/shared/Button";
import Input from "components/shared/Input";
import MainForm from "components/shared/MainForm";
import { useUserContext } from "components/UserContext/useUserContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { REGISTER_USER_URL, USER_URL } from "utils/backend.endpoints";
import {
  REQUIRED_MSSG,
  USERNAME_MAX_LENGTH,
  USERNAME_MAX_LENGTH_MSSG,
  USERNAME_MIN_LENGTH,
  USERNAME_MIN_LENGTH_MSSG,
  EMAIL_PATTERN,
  EMAIL_PATTERN_MSSG,
  PASSWD_MAX_LENGTH,
  PASSWD_MAX_LENGTH_MSSG,
  PASSWD_MIN_LENGTH,
  PASSWD_MIN_LENGTH_MSSG,
} from "utils/const/userForm.const";
import { isAxiosError } from "utils/typeGuards/isAxiosError.guard";
import { isDtoError } from "utils/typeGuards/isDtoError.guard";
import { userResponseType } from "utils/types/user.response";
import {
  UserFormBttns,
  UserFormButton,
  UserFormWrapper,
} from "./UserForm.components";
import { toast } from "react-toastify";
import { USER_FORM_ERROR_TOASTID } from "utils/const/toast.ids";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const UserForm: FunctionComponent = () => {
  const [active, setIsActive] = useState(0);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<Inputs>();

  const { changeUserContextValue } = useUserContext();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await axios.post<userResponseType>(
        active === 1 ? REGISTER_USER_URL : USER_URL,
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
      }

      toast.error(e.message, { toastId: USER_FORM_ERROR_TOASTID });
    }
  };

  const changeForm = useCallback(
    (num: 0 | 1) => {
      setIsActive(num);
      clearErrors();
    },
    [clearErrors]
  );

  return (
    <UserFormWrapper>
      <UserFormBttns>
        <UserFormButton isActive={active === 0} onClick={() => changeForm(0)}>
          Log in
        </UserFormButton>
        <UserFormButton isActive={active === 1} onClick={() => changeForm(1)}>
          Register
        </UserFormButton>
      </UserFormBttns>
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
        {active === 1 && (
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
        )}
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
        <Button type="submit">{active === 0 ? "Log in" : "Register"}</Button>
      </MainForm>
    </UserFormWrapper>
  );
};

export default UserForm;
