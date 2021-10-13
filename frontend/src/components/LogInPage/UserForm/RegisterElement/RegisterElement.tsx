import React, { FunctionComponent } from "react";
import Button from "components/shared/Button";
import Input from "components/shared/Input";
import MainForm from "components/shared/MainForm";

const RegisterElement: FunctionComponent = () => {
  return (
    <MainForm>
      <Input label="Username" errorMssg="This is an error message" />
      <Input label="Email" errorMssg="This is an error message" />
      <Input
        label="Password"
        errorMssg="This is an error message"
        type="password"
      />
      <Button>Register</Button>
    </MainForm>
  );
};

export default RegisterElement;
