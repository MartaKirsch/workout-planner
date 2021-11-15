import React, { ChangeEvent, FunctionComponent, useState } from "react";
import Input from "components/shared/Input";
import {
  AddExerciseAllCheckboxWrapper,
  AddExerciseCheckboxesWrapper,
  AddExerciseCheckboxWrapper,
  AddExerciseSidebarWrapper,
  AddExerciseTypeButton,
  AllCheckboxText,
  CheckboxInput,
  StyledTick,
} from "./AddExerciseSidebar.components";
import IconButton from "components/shared/IconButton";
import { ReactComponent as ArmsIcon } from "images/bodyParts/arms.svg";
import { ReactComponent as LegsIcon } from "images/bodyParts/legs.svg";
import { ReactComponent as AbsIcon } from "images/bodyParts/abs.svg";
import { ReactComponent as ChestIcon } from "images/bodyParts/chest.svg";
import { ReactComponent as BackIcon } from "images/bodyParts/back.svg";
import { ReactComponent as MultiIcon } from "images/bodyParts/multiJoint.svg";
import { useExercisesContext } from "../ExercisesContext/useExercisesContext";
import { BodyPart } from "utils/types/bodyParts";
import Loader from "components/Loader";
import { ExerciseType } from "utils/types/exercise";

const IconButtons: { icon: JSX.Element; name: BodyPart; title: string }[] = [
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

const AddExerciseSidebar: FunctionComponent = () => {
  const { isPending, bodyParts, setBodyParts, types, setTypes } =
    useExercisesContext();

  const modifyBodyParts = (part: BodyPart) => {
    //if it is selected already
    if (bodyParts.indexOf(part) !== -1) {
      const arr = bodyParts.filter((bpart) => bpart !== part);
      setBodyParts(arr);
    } else {
      const arr = [...bodyParts, part];
      setBodyParts(arr);
    }
  };

  const modifyTypes = (type: ExerciseType) => {
    //if it is selected already
    if (types.indexOf(type) !== -1) {
      const arr = types.filter((t) => t !== type);
      setTypes(arr);
    } else {
      const arr = [...types, type];
      setTypes(arr);
    }
  };

  const modifyAllChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked;

    if (val) {
      setBodyParts(["ABS", "ARMS", "BACK", "CHEST", "LEGS", "MULTI_JOINT"]);
      setTypes(["STRETCH", "EXERCISE"]);
    } else {
      setBodyParts([]);
      setTypes([]);
    }
  };

  return (
    <AddExerciseSidebarWrapper>
      <Input
        label="search"
        showLabel={false}
        type="search"
        placeholder="Search for exercise..."
      />
      <AddExerciseCheckboxesWrapper spaceBetween>
        {IconButtons.map((item) => (
          <AddExerciseCheckboxWrapper>
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
              onClick={() => modifyBodyParts(item.name)}
              title={item.title}
            />
          </AddExerciseCheckboxWrapper>
        ))}
      </AddExerciseCheckboxesWrapper>
      <AddExerciseCheckboxesWrapper>
        <AddExerciseTypeButton
          isActive={types.indexOf("STRETCH") !== -1}
          onClick={() => modifyTypes("STRETCH")}
        >
          Stretch
        </AddExerciseTypeButton>
        <AddExerciseTypeButton
          isActive={types.indexOf("EXERCISE") !== -1}
          onClick={() => modifyTypes("EXERCISE")}
        >
          Exercise
        </AddExerciseTypeButton>
        <AddExerciseAllCheckboxWrapper>
          <AllCheckboxText>All</AllCheckboxText>
          <CheckboxInput
            type="checkbox"
            defaultChecked
            onChange={modifyAllChecked}
          />
          <StyledTick />
        </AddExerciseAllCheckboxWrapper>
      </AddExerciseCheckboxesWrapper>
      {isPending && <Loader />}
    </AddExerciseSidebarWrapper>
  );
};

export default AddExerciseSidebar;
