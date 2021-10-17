import React, { FunctionComponent } from "react";
import { useUserContext } from "components/UserContext/useUserContext";
import LogInPage from "components/LogInPage";
import Calendar from "components/Calendar";

const MainPage: FunctionComponent = () => {
  const { isLoggedIn } = useUserContext();
  return (
    <>
      {isLoggedIn && <Calendar />}
      {!isLoggedIn && <LogInPage />}
    </>
  );
};

export default MainPage;
