import { BodyPart } from "utils/types/bodyParts";
import { ReactComponent as ArmsIcon } from "images/bodyParts/arms.svg";
import { ReactComponent as LegsIcon } from "images/bodyParts/legs.svg";
import { ReactComponent as AbsIcon } from "images/bodyParts/abs.svg";
import { ReactComponent as ChestIcon } from "images/bodyParts/chest.svg";
import { ReactComponent as BackIcon } from "images/bodyParts/back.svg";
import { ReactComponent as MultiIcon } from "images/bodyParts/multiJoint.svg";

export const IconButtons: {
  icon: JSX.Element;
  name: BodyPart;
  title: string;
}[] = [
  {
    icon: <ArmsIcon />,
    name: "ARMS",
    title: "Arms",
  },
  {
    icon: <LegsIcon />,
    name: "LEGS",
    title: "Legs",
  },
  {
    icon: <MultiIcon />,
    name: "MULTI_JOINT",
    title: "Multi-joint",
  },
  {
    icon: <AbsIcon />,
    name: "ABS",
    title: "ABS",
  },
  {
    icon: <ChestIcon />,
    name: "CHEST",
    title: "Chest",
  },
  {
    icon: <BackIcon />,
    name: "BACK",
    title: "Back",
  },
];
