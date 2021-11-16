import React, { ChangeEvent, FunctionComponent, useState } from "react";
import Input from "components/shared/Input";
import {
  AddExerciseAllCheckboxWrapper,
  AddExerciseCheckboxesWrapper,
  AddExerciseCheckboxWrapper,
  AddExerciseSidebarWrapper,
  AddExerciseFilters,
  AddExerciseTypeButton,
  AllCheckboxText,
  CheckboxInput,
  ExercisesList,
  FilterArrowButton,
  StyledSearchButton,
  StyledTick,
} from "./AddExerciseSidebar.components";
import IconButton from "components/shared/IconButton";
import { ReactComponent as ArmsIcon } from "images/bodyParts/arms.svg";
import { ReactComponent as LegsIcon } from "images/bodyParts/legs.svg";
import { ReactComponent as AbsIcon } from "images/bodyParts/abs.svg";
import { ReactComponent as ChestIcon } from "images/bodyParts/chest.svg";
import { ReactComponent as BackIcon } from "images/bodyParts/back.svg";
import { ReactComponent as MultiIcon } from "images/bodyParts/multiJoint.svg";
import { ReactComponent as DownArrowIcon } from "images/down.svg";
import { ReactComponent as UpArrowIcon } from "images/up.svg";
import { useExercisesContext } from "../ExercisesContext/useExercisesContext";
import { BodyPart } from "utils/types/bodyParts";
import Loader from "components/Loader";
import { ExerciseType } from "utils/types/exercise";
import { checkIsUlElement } from "utils/functions/checkIsUlElement";
import ExerciseTile from "components/AddExercisePage/AddExerciseSidebar/ExerciseTile";

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
  const [isFilterHidden, setIsFilterHidden] = useState(false);
  const {
    isPending,
    bodyParts,
    setBodyParts,
    types,
    setTypes,
    exercises,
    setSkip,
    loadExercises,
    searchPhrase,
    setSearchPhrase,
  } = useExercisesContext();

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

  const handleScroll: React.UIEventHandler<HTMLUListElement> = (e) => {
    if (
      checkIsUlElement(e.target) &&
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    ) {
      setSkip(exercises.length);
      loadExercises(exercises.length);
    }
  };

  return (
    <AddExerciseSidebarWrapper>
      <AddExerciseFilters
        isHidden={isFilterHidden}
        onSubmit={(e) => {
          e.preventDefault();
          loadExercises();
        }}
      >
        <Input
          label="search"
          showLabel={false}
          type="search"
          placeholder="Search for exercise..."
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
        />
        <AddExerciseCheckboxesWrapper spaceBetween>
          {IconButtons.map((item) => (
            <AddExerciseCheckboxWrapper key={item.name}>
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
            type="button"
            isActive={types.indexOf("STRETCH") !== -1}
            onClick={() => modifyTypes("STRETCH")}
          >
            Stretch
          </AddExerciseTypeButton>
          <AddExerciseTypeButton
            type="button"
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
        <StyledSearchButton type="submit">Search</StyledSearchButton>
      </AddExerciseFilters>

      <FilterArrowButton
        onClick={() => setIsFilterHidden(!isFilterHidden)}
        title={`${isFilterHidden ? "Show" : "Hide"} filters`}
        isHidden={isFilterHidden}
      >
        {isFilterHidden ? <DownArrowIcon /> : <UpArrowIcon />}
      </FilterArrowButton>
      <ExercisesList isHidden={isFilterHidden} onScroll={handleScroll}>
        {exercises &&
          exercises.map((exercise) => (
            <ExerciseTile
              key={exercise.id}
              name={exercise.name}
              imgSrc={exercise.image}
              type={exercise.type}
              bodyParts={exercise.body_parts}
            />
          ))}
        {isPending && <Loader key="loader" />}
      </ExercisesList>
    </AddExerciseSidebarWrapper>
  );
};

export default AddExerciseSidebar;
