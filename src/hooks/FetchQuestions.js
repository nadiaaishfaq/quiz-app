import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//redux actions
import * as Action from "../redux/questions_reducers";
import { getServerData } from "../helper/helper";

//custom fetch question hook to fetch api data to set value to store
export const useFetchQuestions = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    //async function to fetch backend data
    (async () => {
      try {

        const [{ questions, answers}] = await getServerData(
        //   `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`
          "http://localhost:5000/api/questions",
          (data) => data
        );
        console.log({ questions, answers});
        if (questions.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: { questions} }));

          //dispatch an action
          dispatch(Action.startExamAction({ question : questions, answers }));
        } else {
          throw new Error("No Questions");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  return [getData, setGetData];
};

//moveNextAction Dispatch Function
export const MoveNextAction = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.log(error);
  }
};

//MovePrevAction Dispatch Function
export const MovePrevAction = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.log(error);
  }
};
