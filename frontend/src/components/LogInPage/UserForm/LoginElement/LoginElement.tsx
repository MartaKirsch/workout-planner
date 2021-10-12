import React, { FunctionComponent } from "react";
import MainForm from "components/shared/MainForm";
import Input from "components/shared/Input";

const LoginElement: FunctionComponent = () => {
  return (
    <MainForm>
      <Input
        label="Username"
        placeholder="Username or email..."
        errorMssg="This is an error message"
      />
      <Input label="Password" errorMssg="This is an error message" />
    </MainForm>
  );
};

export default LoginElement;
