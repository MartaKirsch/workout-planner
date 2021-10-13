import React, { FunctionComponent } from "react";
import Header from "../shared/Header";
import UserForm from "./UserForm";
import {
  LoginPageHeaderText,
  LoginPageHeaderWrapper,
  LoginPageWrapper,
} from "./LogInPage.components";

const LogInPage: FunctionComponent = () => {
  return (
    <LoginPageWrapper>
      <LoginPageHeaderWrapper>
        <Header text="Let's get started!" />
        <LoginPageHeaderText>
          You’re on a good path to start monitoring your workout routines, just
          one step more! Add your own exercises, combine them into a workout
          routine and save in your calendar.
        </LoginPageHeaderText>
      </LoginPageHeaderWrapper>
      <UserForm />
    </LoginPageWrapper>
  );
};

export default LogInPage;
