import React, { FunctionComponent } from "react";
import Header from "components/shared/Header";
import {
  AddExerciseFieldset,
  AddExerciseCheckboxesWrapper,
  AddExerciseFormContent,
  AddExerciseFormElement,
  AddExerciseFormWrapper,
  StyledPlainButton,
  TypeOfExerciseSelect,
} from "./AddExerciseForm.components";
import Input from "components/shared/Input";
import Textarea from "components/shared/Textarea";
import { BodyPart } from "utils/types/bodyParts";
import { useForm, SubmitHandler } from "react-hook-form";
import { IconButtons } from "utils/const/iconButtons.const";
import CheckboxWithIcon from "components/shared/CheckboxWithIcon";
import Label from "components/shared/Label";
import Button from "components/shared/Button";
import { toast } from "react-toastify";
import { BODY_PARTS_NUMBER_ERROR } from "utils/const/toast.ids";
import {
  AT_LEAST_ONE_BODY_PART_MSSG,
  EXERCISE_DESCRIPTION_MAX_LENGTH,
  EXERCISE_DESCRIPTION_MAX_LENGTH_MSSG,
  EXERCISE_DESCRIPTION_MIN_LENGTH,
  EXERCISE_DESCRIPTION_MIN_LENGTH_MSSG,
  EXERCISE_NAME_MAX_LENGTH,
  EXERCISE_NAME_MAX_LENGTH_MSSG,
  EXERCISE_NAME_MIN_LENGTH,
  EXERCISE_NAME_MIN_LENGTH_MSSG,
  REQUIRED_MSSG,
} from "utils/const/addExerciseForm.const";
import { ExerciseType } from "utils/types/exercise";

type Inputs = {
  name: string;
  description: string;
  bodyParts: BodyPart[];
  type: ExerciseType;
};

const AddExerciseForm: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { bodyParts: [] },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data.bodyParts.length) {
      toast.error(AT_LEAST_ONE_BODY_PART_MSSG, {
        toastId: BODY_PARTS_NUMBER_ERROR,
      });
      return;
    }
    console.log(data);
  };

  return (
    <AddExerciseFormWrapper>
      <AddExerciseFormContent>
        <Header text="Add new exercise" stretch />
        <StyledPlainButton onClick={() => reset()}>
          Reset form
        </StyledPlainButton>
        <AddExerciseFormElement onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Exercise name"
            errorMssg={errors.name?.message}
            register={register("name", {
              minLength: {
                value: EXERCISE_NAME_MIN_LENGTH,
                message: EXERCISE_NAME_MIN_LENGTH_MSSG,
              },
              maxLength: {
                value: EXERCISE_NAME_MAX_LENGTH,
                message: EXERCISE_NAME_MAX_LENGTH_MSSG,
              },
              required: {
                value: true,
                message: REQUIRED_MSSG,
              },
            })}
          />
          <Textarea
            biggerMargin
            label="Description"
            errorMssg={errors.description?.message}
            register={register("description", {
              minLength: {
                value: EXERCISE_DESCRIPTION_MIN_LENGTH,
                message: EXERCISE_DESCRIPTION_MIN_LENGTH_MSSG,
              },
              maxLength: {
                value: EXERCISE_DESCRIPTION_MAX_LENGTH,
                message: EXERCISE_DESCRIPTION_MAX_LENGTH_MSSG,
              },
            })}
          />
          <AddExerciseFieldset>
            <Label>Body parts affected</Label>
            <AddExerciseCheckboxesWrapper>
              {IconButtons.map((item) => (
                <CheckboxWithIcon
                  item={item}
                  key={item.name}
                  register={register("bodyParts")}
                  borderColor={
                    watch("bodyParts").indexOf(item.name) !== -1
                      ? "orange"
                      : "darkBlue"
                  }
                />
              ))}
            </AddExerciseCheckboxesWrapper>
          </AddExerciseFieldset>
          <AddExerciseFieldset>
            <Label>Type of exercise</Label>
            <AddExerciseCheckboxesWrapper alignLeft>
              <TypeOfExerciseSelect {...register("type")}>
                <option value="EXERCISE">Exercise</option>
                <option value="STRETCH">Stretch</option>
              </TypeOfExerciseSelect>
            </AddExerciseCheckboxesWrapper>
          </AddExerciseFieldset>
          <Button type="submit">Add</Button>
        </AddExerciseFormElement>
      </AddExerciseFormContent>
    </AddExerciseFormWrapper>
  );
};

export default AddExerciseForm;
