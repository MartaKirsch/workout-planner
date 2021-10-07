import React, { FunctionComponent } from "react";
import { HeaderText, HeaderWrapper } from "./Header.components";

interface Props {
  text: string;
}

const Header: FunctionComponent<Props> = ({ text }) => {
  return (
    <HeaderWrapper>
      <HeaderText>{text}</HeaderText>
    </HeaderWrapper>
  );
};

export default Header;
