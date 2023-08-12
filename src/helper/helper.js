import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";

export function attempts_Number(result) {
  return result.filter((r) => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point) {
  //this statement will give us all true and false
  // return result.map((element, i)=> answers[i] == element)

  //this statement will give us all true
  //return result.map((element, i)=> answers[i] == element).filter(i=> i)

  //this statement will give 10 points to all true questions
  //return result.map((element, i)=> answers[i] == element).filter(i=> i).map(i=>10)

  //this statement will give sum of the corrected answer
  return result
    .map((element, i) => answers[i] == element)
    .filter((i) => i)
    .map((i) => point)
    .reduce((prev, curr) => prev + curr, 0);
}

export function flagResult(totalPoints, earnedPoints) {
  return (totalPoints * 50) / 100 < earnedPoints; //earn 50%
}

export function CheckUserExist({ children }) {
  const auth = useSelector((state) => state.result.userId);
  return auth ? children : <Navigate to={"/"} replace={true}></Navigate>;
}

// get server data
export async function getServerData(url, callback) {
  // const data = await axios.get(url)
  // console.log(data)
  const data = await (await axios.get(url))?.data;
  return callback ? callback(data) : data;
}
// getServerData("http://localhost:5000/api/result")

//post server data
export async function postServerData(url, result, callback) {
  const data = await (await axios.post(url, result))?.data;
  return callback ? callback(data) : data;
}
