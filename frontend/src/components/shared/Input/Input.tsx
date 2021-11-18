import React, { ChangeEvent, FunctionComponent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
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
  type?: "text" | "password" | "search";
  register?: UseFormRegisterReturn;
  showLabel?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FunctionComponent<Props> = ({
  label,
  register,
  errorMssg,
  placeholder = `${label}...`,
  type = "text",
  showLabel = true,
  value,
  onChange,
}) => {
  return (
    <InputWrapper>
      {showLabel && <InputLabel htmlFor={label}>{label}</InputLabel>}
      <InputElement
        name={label}
        id={label}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        {...register}
      />
      <InputUnderline isSearch={type === "search"} />
      <InputError data-cy="input-error">{errorMssg}</InputError>
    </InputWrapper>
  );
};

export default Input;
