import React, { FunctionComponent } from "react";
import { BodyPart } from "utils/types/bodyParts";
import IconButton from "../IconButton";
import {
  CheckboxWithIconWrapper,
  CheckboxInput,
} from "./CheckboxWithIcon.components";

interface Props {
  item: { icon: JSX.Element; name: BodyPart; title: string };
  onClick: (part: BodyPart) => void | Promise<void>;
  bodyParts: BodyPart[];
}

const CheckboxWithIcon: FunctionComponent<Props> = ({
  item,
  onClick,
  bodyParts,
}) => {
  return (
    <CheckboxWithIconWrapper key={item.name}>
      <IconButton
        icon={item.icon}
        primaryColor="orange"
        secondaryColor="yellow"
        borderColor={
          bodyParts.indexOf(item.name) !== -1 ? "orange" : "darkBlue"
        }
      />
      <CheckboxInput
        type="checkbox"
        onClick={() => onClick(item.name)}
        title={item.title}
      />
    </CheckboxWithIconWrapper>
  );
};

export default CheckboxWithIcon;
