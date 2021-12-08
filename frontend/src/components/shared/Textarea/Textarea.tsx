import React, { FunctionComponent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import {
  InputWrapper,
  InputUnderline,
  InputError,
} from "../Input/Input.components";
import Label from "../Label";
import { TextareaElement } from "./Textarea.components";

interface Props {
  label: string;
  placeholder?: string;
  errorMssg?: string;
  register?: UseFormRegisterReturn;
  showLabel?: boolean;
  value?: string;
  biggerMargin?: boolean;
}

const Textarea: FunctionComponent<Props> = ({
  label,
  register,
  errorMssg,
  placeholder = `${label}...`,
  showLabel = true,
  value,
  biggerMargin,
}) => {
  return (
    <InputWrapper biggerMargin={biggerMargin}>
      {showLabel && <Label htmlFor={label}>{label}</Label>}
      <TextareaElement
        name={label}
        id={label}
        placeholder={placeholder}
        value={value}
        {...register}
      />
      <InputUnderline />
      <InputError data-cy="input-error">{errorMssg}</InputError>
    </InputWrapper>
  );
};

export default Textarea;
