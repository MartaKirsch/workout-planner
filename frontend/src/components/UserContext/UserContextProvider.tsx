import React, { FunctionComponent, useEffect, useState } from "react";
import Loader from "components/Loader";
import Modal from "components/shared/Modal";
import UserContext, { UserContextDataType } from "./UserContext";
import { Redirect } from "react-router";
import { BASE_ROUTE } from "utils/routes";

const UserContextProvider: FunctionComponent = ({ children }) => {
  const [values, setValues] = useState<UserContextDataType>({
    username: "",
    isLoggedIn: false,
  });

  const [isPending, setIsPending] = useState(true);

  const changeUserContextValue = (obj: {
    [P in keyof UserContextDataType]?: UserContextDataType[P];
  }) => {};

  useEffect(() => {
    //TODO check if user is logged in already

    setTimeout(() => {
      setIsPending(false);
    }, 1000);
  }, []);

  return (
    <>
      {!isPending && !values.isLoggedIn && <Redirect to={BASE_ROUTE} />}
      <UserContext.Provider value={{ ...values, changeUserContextValue }}>
        {isPending && (
          <Modal isFullScreen={true}>
            <Loader />
          </Modal>
        )}
        {!isPending && children}
      </UserContext.Provider>
    </>
  );
};

export default UserContextProvider;
