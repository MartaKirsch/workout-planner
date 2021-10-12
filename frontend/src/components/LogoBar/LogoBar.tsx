import React, { FunctionComponent } from "react";
import { LogoBarText, LogoBarWrapper } from "./LogoBar.components";
import { ReactComponent as Logo } from "images/logo.svg";
import { BASE_ROUTE } from "utils/routes";
import { Link } from "react-router-dom";

const LogoBar: FunctionComponent = () => {
  return (
    <LogoBarWrapper>
      <Link to={BASE_ROUTE}>
        <Logo />
        <LogoBarText>workout planner</LogoBarText>
      </Link>
    </LogoBarWrapper>
  );
};

export default LogoBar;
