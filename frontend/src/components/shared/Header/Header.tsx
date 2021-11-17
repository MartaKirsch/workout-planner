import React, { FunctionComponent } from "react";
import { HeaderText, HeaderWrapper } from "./Header.components";

interface Props {
  text: string;
  stretch?: boolean;
}

const Header: FunctionComponent<Props> = ({ text, stretch }) => {
  return (
    <HeaderWrapper aria-label="welcome-header" stretch={stretch}>
      <HeaderText>{text}</HeaderText>
    </HeaderWrapper>
  );
};

export default Header;
