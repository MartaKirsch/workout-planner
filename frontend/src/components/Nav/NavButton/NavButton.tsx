import React, { FunctionComponent } from "react";
import { useHistory } from "react-router";
import {
  NavButtonText,
  NavButtonUnderline,
  NavButtonWrapper,
} from "./NavButton.components";

interface Props {
  iconButton: JSX.Element;
  text: string;
  link?: string;
  onClick?: () => void | Promise<void>;
}

const NavButton: FunctionComponent<Props> = ({
  iconButton,
  text,
  onClick,
  link,
}) => {
  const history = useHistory();
  return (
    <NavButtonWrapper
      onClick={onClick ? onClick : () => history.push(link ?? "")}
    >
      {iconButton}
      <NavButtonText>
        {text}
        <NavButtonUnderline />
      </NavButtonText>
    </NavButtonWrapper>
  );
};

export default NavButton;
