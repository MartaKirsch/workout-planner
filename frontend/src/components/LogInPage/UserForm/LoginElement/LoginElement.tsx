import React, { FunctionComponent } from "react";
import MainForm from "components/shared/MainForm";
import Input from "components/shared/Input";
import Button from "components/shared/Button";

const LoginElement: FunctionComponent = () => {
  return (
    <MainForm>
      <Input
        label="Username"
        placeholder="Username or email..."
        errorMssg="This is an error message"
      />
      <Input label="Password" errorMssg="This is an error message" />
      <Button>Log in</Button>
    </MainForm>
  );
};

export default LoginElement;
