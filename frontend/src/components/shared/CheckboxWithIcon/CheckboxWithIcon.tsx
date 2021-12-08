import React, { FunctionComponent } from "react";
import { BodyPart } from "utils/types/bodyParts";
import IconButton from "../IconButton";
import {
  CheckboxWithIconWrapper,
  CheckboxInput,
} from "./CheckboxWithIcon.components";
import { ThemeType } from "styles/theme";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  item: { icon: JSX.Element; name: BodyPart; title: string };
  onClick?: (part: BodyPart) => void | Promise<void>;
  bodyParts?: BodyPart[];
  borderColor?: keyof ThemeType["colors"]["iconButton"];
  register?: UseFormRegisterReturn;
}

const CheckboxWithIcon: FunctionComponent<Props> = ({
  item,
  onClick = () => {},
  bodyParts = [],
  borderColor,
  register,
}) => {
  return (
    <CheckboxWithIconWrapper>
      <IconButton
        icon={item.icon}
        primaryColor="orange"
        secondaryColor="yellow"
        borderColor={
          borderColor
            ? borderColor
            : bodyParts.indexOf(item.name) !== -1
            ? "orange"
            : "darkBlue"
        }
      />
      {register && (
        <CheckboxInput
          type="checkbox"
          title={item.title}
          value={item.name}
          onClick={() => onClick(item.name)}
          {...register}
        />
      )}
      {!register && (
        <CheckboxInput
          type="checkbox"
          onClick={() => onClick(item.name)}
          title={item.title}
        />
      )}
    </CheckboxWithIconWrapper>
  );
};

export default CheckboxWithIcon;
