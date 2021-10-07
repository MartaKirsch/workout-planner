import React, { FunctionComponent } from "react";
import { ThemeType } from "../../../styles/theme";
import { IconButtonFrame, IconButtonWrapper } from "./IconButton.components";

interface Props {
  bgColor: keyof ThemeType["colors"];
  primaryColor: keyof ThemeType["colors"]["iconButton"];
  secondaryColor: keyof ThemeType["colors"]["iconButton"];
  borderColor?: keyof ThemeType["colors"]["iconButton"];
  icon: JSX.Element;
}

const IconButton: FunctionComponent<Props> = ({
  bgColor,
  primaryColor,
  secondaryColor,
  borderColor = "darkBlue",
  icon,
}) => {
  return (
    <IconButtonWrapper
      bgColor={bgColor}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    >
      <IconButtonFrame borderColor={borderColor} />
      {icon}
    </IconButtonWrapper>
  );
};

export default IconButton;
