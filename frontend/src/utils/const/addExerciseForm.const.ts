const MAX_LENGTH_MSSG = (field: string, value: number) =>
  `${field} cannot be more than ${value} characters long!`;

const MIN_LENGTH_MSSG = (field: string, value: number) =>
  `${field} cannot be less than ${value} characters long!`;

export const EXERCISE_NAME_MAX_LENGTH = 45;
export const EXERCISE_NAME_MAX_LENGTH_MSSG = MAX_LENGTH_MSSG(
  "Exercise name",
  EXERCISE_NAME_MAX_LENGTH
);

export const EXERCISE_NAME_MIN_LENGTH = 5;
export const EXERCISE_NAME_MIN_LENGTH_MSSG = MIN_LENGTH_MSSG(
  "Exercise name",
  EXERCISE_NAME_MIN_LENGTH
);

export const EXERCISE_DESCRIPTION_MAX_LENGTH = 150;
export const EXERCISE_DESCRIPTION_MAX_LENGTH_MSSG = MAX_LENGTH_MSSG(
  "Exercise description",
  EXERCISE_DESCRIPTION_MAX_LENGTH
);

export const EXERCISE_DESCRIPTION_MIN_LENGTH = 5;
export const EXERCISE_DESCRIPTION_MIN_LENGTH_MSSG = MIN_LENGTH_MSSG(
  "Exercise description",
  EXERCISE_DESCRIPTION_MIN_LENGTH
);

export const REQUIRED_MSSG = "This field is required!";

export const AT_LEAST_ONE_BODY_PART_MSSG = "Provide at least one body part!";
