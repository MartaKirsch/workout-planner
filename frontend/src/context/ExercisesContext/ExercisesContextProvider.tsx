import React, {
  FunctionComponent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import axios, { CancelTokenSource, CancelTokenStatic } from "axios";
import { LOAD_EXERCISES_URL } from "utils/backend.endpoints";
import { LOADING_EXERCISES_ERROR } from "utils/const/toast.ids";
import {
  ExerciseResponseT,
  ExerciseT,
  ExerciseType,
} from "utils/types/exercise";
import ExercisesContext from "./ExercisesContext";
import { BodyPart } from "utils/types/bodyParts";
import { handleErrorWithToast } from "utils/functions/handleErrorWithToast";

const ExercisesContextProvider: FunctionComponent = ({ children }) => {
  const [isPending, setIsPending] = useState(true);
  const [exercises, setExercises] = useState<ExerciseT[]>([]);
  const [skip, setSkip] = useState(0);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([
    "ABS",
    "ARMS",
    "BACK",
    "CHEST",
    "LEGS",
    "MULTI_JOINT",
  ]);
  const [types, setTypes] = useState<ExerciseType[]>(["STRETCH", "EXERCISE"]);

  const oldExercises = useRef<ExerciseT[]>([]);
  const cancelToken = useRef<CancelTokenStatic | CancelTokenSource>();
  const init = useRef(true);

  const loadExercises = useCallback(
    async (newSkip?: number) => {
      setIsPending(true);
      console.log("load");

      //Check if there are any previous pending requests
      if (typeof cancelToken.current != typeof undefined) {
        (
          cancelToken as unknown as MutableRefObject<CancelTokenSource>
        ).current.cancel("Operation canceled due to new request.");
      }

      //Save the cancel token for the current request
      cancelToken.current = axios.CancelToken.source();

      try {
        const res = await axios.post<ExerciseResponseT[]>(
          LOAD_EXERCISES_URL,
          {
            skip: newSkip ?? skip,
            pattern: searchPhrase,
            bodyParts,
            types,
          },
          {
            cancelToken: cancelToken.current.token,
          }
        );

        // console.log(newSkip ?? skip);

        console.log(res.data);
        // console.log(oldExercises.current);

        const arrangedData = res.data.map((e) => ({
          ...e,
          body_parts: e.body_parts.map((part) => ({ name: part.bPartId })),
        }));

        oldExercises.current = [...oldExercises.current, ...arrangedData];
        if (skip !== 0) setExercises([...oldExercises.current]);
        else if (newSkip && newSkip !== 0)
          setExercises([...oldExercises.current]);
        else setExercises([...arrangedData]);
      } catch (e) {
        if (!(e instanceof Error)) return;

        handleErrorWithToast(e, LOADING_EXERCISES_ERROR);
      } finally {
        setIsPending(false);
      }
    },
    [searchPhrase, skip, bodyParts, types]
  );

  useEffect(() => {
    if (init.current) {
      loadExercises();
      init.current = false;
    }
  }, [loadExercises]);

  useEffect(() => {
    setSkip(0);
    // setExercises([]);
    oldExercises.current = [];
  }, [searchPhrase, bodyParts, types]);

  return (
    <ExercisesContext.Provider
      value={{
        exercises,
        bodyParts,
        types,
        setBodyParts,
        isPending,
        setTypes,
        setSkip,
        loadExercises,
        searchPhrase,
        setSearchPhrase,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesContextProvider;
