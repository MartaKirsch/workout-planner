import {
  mixedRawArmsChestExercises,
  rawArmsExercises,
} from "./rawExercises/arms.raw";
import { rawBackExercises } from "./rawExercises/back.raw";
import {
  mixedRawLegsBackExercises,
  rawLegsExercises,
} from "./rawExercises/legs.raw";

type exerciseType = {
  name: string;
  description: string;
  image: string;
  author: { connect: { id: string } };
  type: "STRETCH" | "EXERCISE";
  body_parts: {
    connect:
      | { name: "ARMS" | "LEGS" | "ABS" | "BACK" | "MULTI_JOINT" | "CHEST" }
      | { name: "ARMS" | "LEGS" | "ABS" | "BACK" | "MULTI_JOINT" | "CHEST" }[];
  };
};

type exerciseNoType = {
  name: string;
  description: string;
  image: string;
};

type exerciseWithType = {
  name: string;
  description: string;
  image: string;
  type: "STRETCH" | "EXERCISE";
};

type BodyPart = "ARMS" | "LEGS" | "BACK" | "ABS" | "MULTI_JOINT" | "CHEST";

const attachType = (
  arr: exerciseNoType[],
  type: "EXERCISE" | "STRETCH",
): exerciseWithType[] => {
  arr = arr.map((item) => ({
    ...item,
    type: type,
  }));
  return arr as exerciseWithType[];
};

const attachAuthor = (arr): exerciseType[] => {
  arr = arr.map((item) => ({
    ...item,
    author: { connect: { id: "global" } },
  }));
  return arr;
};

const attachBodyPart = (
  arr: exerciseWithType[],
  bpart: BodyPart | BodyPart[],
) => {
  if (Array.isArray(bpart)) {
    arr = arr.map((item) => ({
      ...item,
      body_parts: {
        connect: [
          ...bpart.map((part) => ({
            name: part,
          })),
        ],
      },
    }));
  } else {
    arr = arr.map((item) => ({
      ...item,
      body_parts: { connect: { name: bpart } },
    }));
  }
  return arr;
};

const armExercises = attachAuthor(
  attachBodyPart(attachType(rawArmsExercises, "EXERCISE"), "ARMS"),
);

const mixedArmsChestExercises = attachAuthor(
  attachBodyPart(attachType(mixedRawArmsChestExercises, "EXERCISE"), [
    "ARMS",
    "CHEST",
  ]),
);

const legsExercises = attachAuthor(
  attachBodyPart(attachType(rawLegsExercises, "EXERCISE"), "LEGS"),
);

const mixedLegsBackExercises = attachAuthor(
  attachBodyPart(attachType(mixedRawLegsBackExercises, "EXERCISE"), [
    "LEGS",
    "BACK",
  ]),
);

const backExercises = attachAuthor(
  attachBodyPart(attachType(rawBackExercises, "EXERCISE"), "BACK"),
);

export const exercisesData: exerciseType[] = [
  ...armExercises,
  ...mixedArmsChestExercises,
  ...legsExercises,
  ...mixedLegsBackExercises,
  ...backExercises,
];
