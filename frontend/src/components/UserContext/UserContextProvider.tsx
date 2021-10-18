import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Loader from "components/Loader";
import Modal from "components/shared/Modal";
import UserContext, { UserContextDataType } from "./UserContext";
import { Redirect } from "react-router";
import { BASE_ROUTE } from "utils/routes";
import axios from "axios";
import { USER_URL } from "utils/backend.endpoints";
import { userResponseType } from "utils/types/user.response";

const UserContextProvider: FunctionComponent = ({ children }) => {
  const [values, setValues] = useState<UserContextDataType>({
    username: "",
    isLoggedIn: false,
  });

  const [isPending, setIsPending] = useState(true);

  const changeUserContextValue = useCallback(
    (obj: {
      [P in keyof UserContextDataType]?: UserContextDataType[P];
    }) => {
      setValues({ ...values, ...obj });
    },
    [values]
  );

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get<userResponseType>(USER_URL);
        setValues(res.data);
        setIsPending(false);
      } catch (e) {
        //TODO userNotFound type check - no error mssg, if other error - toast
        setIsPending(false);
      }
    };

    checkUser();
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
