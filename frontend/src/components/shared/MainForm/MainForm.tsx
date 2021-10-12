import React, { FunctionComponent } from "react";
import { MainFormWrapper } from "./MainForm.components";

interface Props {
  onSubmit?: () => void | Promise<void>;
}

const MainForm: FunctionComponent<Props> = ({ onSubmit, children }) => {
  return <MainFormWrapper onSubmit={onSubmit}>{children}</MainFormWrapper>;
};

export default MainForm;
