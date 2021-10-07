import React, { FunctionComponent } from "react";
import { NavButtonText, NavButtonWrapper } from "./NavButton.components";

interface Props {
  iconButton: JSX.Element;
  text: string;
  onClick?: () => void | Promise<void>;
}

const NavButton: FunctionComponent<Props> = ({ iconButton, text, onClick }) => {
  return (
    <NavButtonWrapper onClick={onClick}>
      {iconButton}
      <NavButtonText>{text}</NavButtonText>
    </NavButtonWrapper>
  );
};

export default NavButton;
