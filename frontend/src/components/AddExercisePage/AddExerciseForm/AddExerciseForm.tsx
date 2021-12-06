import React, { FunctionComponent, useEffect, useMemo } from "react";
import Header from "components/shared/Header";
import {
  AddExerciseFieldset,
  AddExerciseCheckboxesWrapper,
  AddExerciseFormContent,
  AddExerciseFormElement,
  AddExerciseFormWrapper,
  StyledPlainButton,
  TypeOfExerciseSelect,
  AddExerciseFileInput,
  AddExerciseFakeFileInput,
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
import {
  ADD_EXERCISE_ERROR,
  BODY_PARTS_NUMBER_ERROR,
} from "utils/const/toast.ids";
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
import { ExerciseAddFormT, ExerciseType } from "utils/types/exercise";
import axios from "axios";
import { EXERCISES_URL, UPDATE_EXERCISES_URL } from "utils/backend.endpoints";
import { handleErrorWithToast } from "utils/functions/handleErrorWithToast";
import { isDtoError } from "utils/typeGuards/isDtoError.guard";
import { useHistory } from "react-router-dom";

type Inputs = {
  name: string;
  description: string;
  bodyParts: BodyPart[];
  type: ExerciseType;
  file: FileList;
};

interface Props {
  name?: string;
  description?: string;
  bodyParts?: BodyPart[];
  type?: ExerciseType;
  resetProps: () => void | Promise<void>;
}

const AddExerciseForm: FunctionComponent<Props> = ({
  name,
  description,
  bodyParts,
  type,
  resetProps,
}) => {
  const history = useHistory();

  const defaultValues = useMemo<ExerciseAddFormT | { bodyParts: BodyPart[] }>(
    () => ({
      bodyParts: bodyParts ?? [],
      name,
      description,
      type,
    }),
    [bodyParts, description, name, type]
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data.bodyParts.length) {
      toast.error(AT_LEAST_ONE_BODY_PART_MSSG, {
        toastId: BODY_PARTS_NUMBER_ERROR,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", data.file.item(0) as Blob);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("bodyParts", JSON.stringify(data.bodyParts));
    if (name) formData.append("originalName", name);

    try {
      await axios.post(name ? UPDATE_EXERCISES_URL : EXERCISES_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      history.go(0);
    } catch (e) {
      if (!(e instanceof Error) || !e) return;

      if (isDtoError<keyof Inputs>(e)) {
        e.response?.data.errors.forEach((err) => {
          if (err.property === "name" || err.property === "description") {
            setError(
              err.property,
              { message: err.message },
              { shouldFocus: true }
            );
          } else {
            toast.error(err.message, {
              toastId: ADD_EXERCISE_ERROR + err.property,
            });
          }
        });
        return;
      }
      handleErrorWithToast(e, ADD_EXERCISE_ERROR);
    }
  };

  return (
    <AddExerciseFormWrapper>
      <AddExerciseFormContent>
        <Header text={`${name ? "Modify your" : "Add new"} exercise`} stretch />
        <StyledPlainButton
          onClick={() => {
            resetProps();
            reset();
          }}
        >
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
                value: false,
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
            <Label>Image</Label>
            <AddExerciseFileInput
              type="file"
              accept="image/png, image/gif, image/jpeg"
              {...register("file", { required: false })}
            />
            <AddExerciseFakeFileInput>Browse file...</AddExerciseFakeFileInput>
          </AddExerciseFieldset>
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
          <Button type="submit">{name ? "Modify" : "Add"}</Button>
        </AddExerciseFormElement>
      </AddExerciseFormContent>
    </AddExerciseFormWrapper>
  );
};

export default AddExerciseForm;
