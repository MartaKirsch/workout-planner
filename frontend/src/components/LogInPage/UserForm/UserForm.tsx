import React, { FunctionComponent, useState } from "react";
import LoginElement from "./LoginElement";
import {
  UserFormBttns,
  UserFormButton,
  UserFormWrapper,
} from "./UserForm.components";

const LoginForm: FunctionComponent = () => {
  const [active, setIsActive] = useState(0);
  return (
    <UserFormWrapper>
      <UserFormBttns>
        <UserFormButton isActive={active === 0} onClick={() => setIsActive(0)}>
          Log in
        </UserFormButton>
        <UserFormButton isActive={active === 1} onClick={() => setIsActive(1)}>
          Register
        </UserFormButton>
      </UserFormBttns>
      {active === 0 && <LoginElement />}
    </UserFormWrapper>
  );
};

export default LoginForm;
