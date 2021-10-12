import React, { FunctionComponent } from "react";
import {
  InputElement,
  InputError,
  InputLabel,
  InputUnderline,
  InputWrapper,
} from "./Input.components";

interface Props {
  label: string;
  placeholder?: string;
  errorMssg?: string;
  type?: "text" | "password";
  register?: () => {};
}

const Input: FunctionComponent<Props> = ({
  label,
  register,
  errorMssg,
  placeholder = `${label}...`,
  type = "text",
}) => {
  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      <InputElement placeholder={placeholder} />
      <InputUnderline />
      <InputError>{errorMssg}</InputError>
    </InputWrapper>
  );
};

export default Input;
