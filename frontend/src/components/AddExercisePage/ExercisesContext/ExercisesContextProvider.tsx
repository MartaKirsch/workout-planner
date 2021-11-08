import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import Loader from "components/Loader";
import { toast } from "react-toastify";
import { LOAD_EXERCISES_URL } from "utils/backend.endpoints";
import { LOADING_EXERCISES_ERROR } from "utils/const/toast.ids";
import { isAxiosError } from "utils/typeGuards/isAxiosError.guard";
import { ExerciseT, ExerciseType } from "utils/types/exercise";
import ExercisesContext from "./ExercisesContext";
import { BodyPart } from "utils/types/bodyParts";

const ExercisesContextProvider: FunctionComponent = ({ children }) => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | boolean>(false);
  const [exercises, setExercises] = useState<ExerciseT[]>([]);
  const [skip, setSkip] = useState(0);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
  const [types, setTypes] = useState<ExerciseType[]>([]);

  const oldExercises = useRef<ExerciseT[]>([]);

  const loadExercises = useCallback(async () => {
    setIsPending(true);
    setError(false);
    try {
      const res = await axios.post<ExerciseT[]>(LOAD_EXERCISES_URL, {
        skip,
        pattern: searchPhrase,
        bodyParts,
        types,
      });

      console.log(res.data);

      // oldExercises.current = [...oldExercises.current, ...res.data];
      // if (skip !== 0) setExercises([...oldExercises.current]);
      // else setExercises([...res.data]);
    } catch (e) {
      if (!(e instanceof Error)) return;

      if (isAxiosError(e)) {
        setError(e.response?.data.message ?? "");
        toast.error(e.response?.data.message, {
          toastId: LOADING_EXERCISES_ERROR,
        });
        return;
      }

      setError(e.message);
      toast.error(e.message, { toastId: LOADING_EXERCISES_ERROR });
    } finally {
      setIsPending(false);
    }
  }, [searchPhrase, skip]);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  useEffect(() => {
    setSkip(0);
    setExercises([]);
    oldExercises.current = [];
  }, [searchPhrase]);

  // const handleScroll: React.UIEventHandler<HTMLUListElement> = (e) => {
  //   if (
  //     checkIsUlElement(e.target) &&
  //     e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
  //   ) {
  //     setSkip(todos.length);
  //   }
  // };

  return (
    <ExercisesContext.Provider value={{ exercises }}>
      {isPending && <Loader />}
      {!isPending && !error && children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesContextProvider;
