import React, { FunctionComponent, useState } from "react";
import IconButton from "components/shared/IconButton";
import { NavWrapper } from "./Nav.components";
import { ReactComponent as MenuIcon } from "images/menu.svg";
import { ReactComponent as CalendarIcon } from "images/calendar.svg";
import { ReactComponent as AddExerciseIcon } from "images/addExercise.svg";
import { ReactComponent as AddRoutineIcon } from "images/addSet.svg";
import { ReactComponent as LoginIcon } from "images/logIn.svg";
import NavButton from "./NavButton";
import { CALENDAR_ROUTE } from "utils/routes";

const Nav: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavWrapper isOpen={isOpen}>
      <NavButton
        iconButton={
          <IconButton
            primaryColor="turqoise"
            secondaryColor="yellow"
            icon={<MenuIcon />}
          />
        }
        text="Close menu"
        onClick={() => setIsOpen(!isOpen)}
      />
      <NavButton
        iconButton={
          <IconButton
            primaryColor="turqoise"
            secondaryColor="orange"
            icon={<CalendarIcon />}
          />
        }
        text="Calendar"
        link={CALENDAR_ROUTE}
      />
      <NavButton
        iconButton={
          <IconButton
            primaryColor="turqoise"
            secondaryColor="yellow"
            icon={<AddExerciseIcon />}
          />
        }
        text="Add exercise"
      />
      <NavButton
        iconButton={
          <IconButton
            primaryColor="turqoise"
            secondaryColor="yellow"
            icon={<AddRoutineIcon />}
          />
        }
        text="Add routine"
      />
      <NavButton
        iconButton={
          <IconButton
            primaryColor="turqoise"
            secondaryColor="yellow"
            icon={<LoginIcon />}
          />
        }
        text="Log in"
      />
    </NavWrapper>
  );
};

export default Nav;
