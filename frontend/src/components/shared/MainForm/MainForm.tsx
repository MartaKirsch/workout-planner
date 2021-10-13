import React, { FunctionComponent } from "react";
import { MainFormInside, MainFormWrapper } from "./MainForm.components";

interface Props {
  onSubmit?: () => void | Promise<void>;
}

const MainForm: FunctionComponent<Props> = ({ onSubmit, children }) => {
  return (
    <MainFormWrapper onSubmit={onSubmit}>
      <MainFormInside>{children}</MainFormInside>
    </MainFormWrapper>
  );
};

export default MainForm;
