import React, { FunctionComponent, useRef, useState } from "react";
import IconButton from "components/shared/IconButton";
import { NavWrapper } from "./Nav.components";
import { ReactComponent as MenuIcon } from "images/menu.svg";
import { ReactComponent as CalendarIcon } from "images/calendar.svg";
import { ReactComponent as AddExerciseIcon } from "images/addExercise.svg";
import { ReactComponent as AddRoutineIcon } from "images/addSet.svg";
import { ReactComponent as LogoutIcon } from "images/logIn.svg";
import NavButton from "./NavButton";
import { ADD_EXERCISE_ROUTE, ADD_SET_ROUTE, BASE_ROUTE } from "utils/routes";
import { useUserContext } from "context/UserContext/useUserContext";
import axios from "axios";
import { LOGOUT_USER_URL } from "utils/backend.endpoints";
import { userResponseType } from "utils/types/user.response";
import { toast } from "react-toastify";
import { COULD_NOT_LOG_OUT_TOASTID } from "utils/const/toast.ids";
import { isAxiosError } from "utils/typeGuards/isAxiosError.guard";
import { useOutsideClickWithCallback } from "hooks/useOutsideClickWithCallback";

const Nav: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<null | HTMLElement>(null);

  const { isLoggedIn, changeUserContextValue } = useUserContext();

  useOutsideClickWithCallback(navRef, () => setIsOpen(false));

  const handleLogOut = async () => {
    try {
      const res = await axios.get<userResponseType>(LOGOUT_USER_URL);
      changeUserContextValue(res.data);
    } catch (e) {
      if (!(e instanceof Error)) return;

      if (isAxiosError(e)) {
        toast.error(e.response?.data.message, {
          toastId: COULD_NOT_LOG_OUT_TOASTID,
        });
        return;
      }

      toast.error(e.message, {
        toastId: COULD_NOT_LOG_OUT_TOASTID,
      });
    }
  };

  return (
    <NavWrapper isOpen={isOpen} ref={navRef}>
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
        link={BASE_ROUTE}
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
        link={ADD_EXERCISE_ROUTE}
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
        link={ADD_SET_ROUTE}
      />
      {isLoggedIn && (
        <NavButton
          iconButton={
            <IconButton
              primaryColor="turqoise"
              secondaryColor="yellow"
              icon={<LogoutIcon />}
            />
          }
          text="Log out"
          onClick={handleLogOut}
        />
      )}
    </NavWrapper>
  );
};

export default Nav;
