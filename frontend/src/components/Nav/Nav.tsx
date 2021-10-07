import React, { FunctionComponent, useState } from "react";
import IconButton from "components/shared/IconButton";
import { NavWrapper } from "./Nav.components";
import { ReactComponent as MenuIcon } from "images/menu.svg";
import NavButton from "./NavButton";

const Nav: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavWrapper isOpen={isOpen}>
      <NavButton
        iconButton={
          <IconButton
            bgColor="bg"
            primaryColor="turqoise"
            secondaryColor="yellow"
            icon={<MenuIcon />}
          />
        }
        text="Close menu"
        onClick={() => setIsOpen(!isOpen)}
      />
    </NavWrapper>
  );
};

export default Nav;
