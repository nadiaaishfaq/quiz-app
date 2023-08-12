import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import ResultTable from "./ResultTable";
import '../styles/Result.css'

import { useDispatch, useSelector } from "react-redux";

//import actions
import { resetAllAction } from '../redux/questions_reducers'
import { resetResultAction } from '../redux/result_reducers'
import { attempts_Number, earnPoints_Number, flagResult } from "../helper/helper";
import { usePublishResult } from "../hooks/setResult";



export default function Result() {

  const dispatch = useDispatch()
  const {questions: {queue, answers}, result: { result, userId}} = useSelector( state => state)

  // useEffect(()=>{
  //   console.log(flag)
  //   // console.log(earnedPoints)
  //   // console.log(attempts)
  //   // console.log(result)
  // })

  const totalPoints = queue.length * 10
  const attempts = attempts_Number(result)
  const earnedPoints = earnPoints_Number(result, answers, 10)
  const flag = flagResult(totalPoints, earnedPoints)


  //store user result
  usePublishResult({result, username : userId, attempts, points : earnedPoints, achieved : flag ? "Passed" : "Fail"})
  // console.log({result, username : userId, attempts, points : earnedPoints, achieved : flag ? "Passed" : "Fail"})

  function onRestart(){
    console.log("on Restart Click")
    dispatch(resetAllAction())
    dispatch(resetResultAction())
  }

  return (
    <>
      <div className="container">
        <h1 className="title text-light">Quiz Application</h1>
        <div className="result flex-center">
          <div className="flex">
            <span>Username: </span>
            <span className="bold">nadia ishfaq</span>
          </div>
          <div className="flex">
            <span>Total Quiz Points: </span>
            <span className="bold">{totalPoints || 0}</span>
          </div>
          <div className="flex">
            <span>Total Questions: </span>
            <span className="bold">{ queue.length || 0}</span>
          </div>
          <div className="flex">
            <span>Total Attempts: </span>
            <span className="bold">{attempts || 0}</span>
          </div>
          <div className="flex">
            <span>Total Earned Points: </span>
            <span className="bold">{earnedPoints || 0}</span>
          </div>
          <div className="flex">
            <span>Quiz Result: </span>
            <span style={{color : `${flag ? "green" : "red"}`}} className="bold">{flag ? "PASSED" : "FAILED"}</span>
          </div>
        </div>
        
        <div className="start">
          <Link className="btn" to={"/"} onClick={onRestart}>Restart</Link>
        </div>

        <div className="container">
          <ResultTable></ResultTable>
        </div>
      </div>
    </>
  );
}
