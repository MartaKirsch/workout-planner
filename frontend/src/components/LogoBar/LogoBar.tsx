import React, { FunctionComponent } from "react";
import { LogoBarText, LogoBarWrapper } from "./LogoBar.components";
import { ReactComponent as Logo } from "images/logo.svg";

const LogoBar: FunctionComponent = () => {
  return (
    <LogoBarWrapper>
      <Logo />
      <LogoBarText>workout planner</LogoBarText>
    </LogoBarWrapper>
  );
};

export default LogoBar;
