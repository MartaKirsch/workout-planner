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
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <InputElement
        name={label}
        id={label}
        placeholder={placeholder}
        type={type}
      />
      <InputUnderline />
      <InputError>{errorMssg}</InputError>
    </InputWrapper>
  );
};

export default Input;
