import React, { FunctionComponent } from "react";
import { ModalWrapper } from "./Modal.components";

interface Props {
  isFullScreen?: boolean;
}

const Modal: FunctionComponent<Props> = ({
  isFullScreen = false,
  children,
}) => {
  return <ModalWrapper isFullScreen={isFullScreen}>{children}</ModalWrapper>;
};

export default Modal;
