import { useContext } from "react";
import UserContext from "./UserContext";

export const useUserContext = () => {
  const values = useContext(UserContext);

  return { ...values };
};
