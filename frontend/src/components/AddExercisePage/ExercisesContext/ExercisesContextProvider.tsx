import React, {
  FunctionComponent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import axios, { CancelTokenSource, CancelTokenStatic } from "axios";
import { toast } from "react-toastify";
import { LOAD_EXERCISES_URL } from "utils/backend.endpoints";
import { LOADING_EXERCISES_ERROR } from "utils/const/toast.ids";
import { isAxiosError } from "utils/typeGuards/isAxiosError.guard";
import { ExerciseT, ExerciseType } from "utils/types/exercise";
import ExercisesContext from "./ExercisesContext";
import { BodyPart } from "utils/types/bodyParts";

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

  const loadExercises = useCallback(async () => {
    setIsPending(true);

    //Check if there are any previous pending requests
    if (typeof cancelToken.current != typeof undefined) {
      (
        cancelToken as unknown as MutableRefObject<CancelTokenSource>
      ).current.cancel("Operation canceled due to new request.");
    }

    //Save the cancel token for the current request
    cancelToken.current = axios.CancelToken.source();

    try {
      const res = await axios.post<ExerciseT[]>(LOAD_EXERCISES_URL, {
        skip,
        pattern: searchPhrase,
        bodyParts,
        types,
        cancelToken: cancelToken.current.token,
      });

      console.log(res.data);

      oldExercises.current = [...oldExercises.current, ...res.data];
      if (skip !== 0) setExercises([...oldExercises.current]);
      else setExercises([...res.data]);
    } catch (e) {
      if (!(e instanceof Error)) return;

      if (isAxiosError(e)) {
        toast.error(e.response?.data.message, {
          toastId: LOADING_EXERCISES_ERROR,
        });
        return;
      }

      toast.error(e.message, { toastId: LOADING_EXERCISES_ERROR });
    } finally {
      setIsPending(false);
    }
  }, [searchPhrase, skip, bodyParts, types]);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  useEffect(() => {
    setSkip(0);
    setExercises([]);
    oldExercises.current = [];
  }, [searchPhrase, bodyParts, types]);

  // const handleScroll: React.UIEventHandler<HTMLUListElement> = (e) => {
  //   if (
  //     checkIsUlElement(e.target) &&
  //     e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
  //   ) {
  //     setSkip(todos.length);
  //   }
  // };

  return (
    <ExercisesContext.Provider
      value={{ exercises, bodyParts, types, setBodyParts, isPending, setTypes }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesContextProvider;
