import React, { ChangeEvent, FunctionComponent, useState } from "react";
import Input from "components/shared/Input";
import {
  ExerciseAllCheckboxWrapper,
  ExerciseCheckboxesWrapper,
  ExerciseSidebarWrapper,
  ExerciseFilters,
  ExerciseTypeButton,
  AllCheckboxText,
  ExercisesList,
  FilterArrowButton,
  StyledSearchButton,
  StyledTick,
  CheckboxInput,
} from "./ExerciseSidebar.components";
import { ReactComponent as DownArrowIcon } from "images/down.svg";
import { ReactComponent as UpArrowIcon } from "images/up.svg";
import { useExercisesContext } from "../../../context/ExercisesContext/useExercisesContext";
import { BodyPart } from "utils/types/bodyParts";
import Loader from "components/Loader";
import { ExerciseT, ExerciseType } from "utils/types/exercise";
import { checkIsUlElement } from "utils/typeGuards/checkIsUlElement.guard";
import ExerciseTile from "components/shared/ExerciseSidebar/ExerciseTile";
import CheckboxWithIcon from "../CheckboxWithIcon";
import { IconButtons } from "utils/const/iconButtons.const";

interface Props {
  onTileClick?: (e: ExerciseT) => void | Promise<void>;
}

const ExerciseSidebar: FunctionComponent<Props> = ({ onTileClick }) => {
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
    <ExerciseSidebarWrapper>
      <ExerciseFilters
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
        <ExerciseCheckboxesWrapper spaceBetween>
          {IconButtons.map((item) => (
            <CheckboxWithIcon
              key={item.name}
              item={item}
              onClick={() => modifyBodyParts(item.name)}
              bodyParts={bodyParts}
            />
          ))}
        </ExerciseCheckboxesWrapper>
        <ExerciseCheckboxesWrapper>
          <ExerciseTypeButton
            type="button"
            isActive={types.indexOf("STRETCH") !== -1}
            onClick={() => modifyTypes("STRETCH")}
          >
            Stretch
          </ExerciseTypeButton>
          <ExerciseTypeButton
            type="button"
            isActive={types.indexOf("EXERCISE") !== -1}
            onClick={() => modifyTypes("EXERCISE")}
          >
            Exercise
          </ExerciseTypeButton>
          <ExerciseAllCheckboxWrapper>
            <AllCheckboxText>All</AllCheckboxText>
            <CheckboxInput
              type="checkbox"
              defaultChecked
              onChange={modifyAllChecked}
            />
            <StyledTick />
          </ExerciseAllCheckboxWrapper>
        </ExerciseCheckboxesWrapper>
        <StyledSearchButton type="submit">Search</StyledSearchButton>
      </ExerciseFilters>

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
              onClick={() => onTileClick && onTileClick(exercise)}
            />
          ))}
        {isPending && <Loader key="loader" />}
      </ExercisesList>
    </ExerciseSidebarWrapper>
  );
};

export default ExerciseSidebar;
