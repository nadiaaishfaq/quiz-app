import React, { useEffect, useState } from 'react'
import Questions from './Questions'

import { MoveNextAction, MovePrevAction } from '../hooks/FetchQuestions'
import { PushAnswer } from '../hooks/setResult'

//redux-store import
import { useSelector, useDispatch } from 'react-redux'

import { Navigate } from 'react-router-dom'

export default function Quiz() {

  const [check, setCheck] = useState(undefined)
  // const state = useSelector(state => state)
  const result = useSelector(state=> state.result.result)
  const { queue, trace} = useSelector(state => state.questions)
  const dispatch = useDispatch()

  useEffect(()=>{
    // console.log(queue)
    // console.log(trace)
    // console.log(state)
    // console.log(result)
  })

  //next button handler
  function onNext(){
    // console.log("on the next page")

    if(trace < queue.length){
      //update the trace value by one using move next action
      dispatch(MoveNextAction())

      // dispatch(PushAnswer(1))         checked by giving hard coded value

      //push only when result length is less than or equal to trace, because user can go back and update his answer
      if(result.length <= trace){
        dispatch(PushAnswer(check))
      }
    }
    //reset the value of the checked variable
    setCheck(undefined)
  }

   //previous button handler
  function onPrev(){
    // console.log("on the prev page")
    if(trace>0){

      //update the trace value by one using move prev action
      dispatch(MovePrevAction( ))
    }
  }

  function onChecked(check){
    console.log(check)
    setCheck(check)
  }

  //finished the exam after last question
  if(result.length && result.length >= queue.length){
    return <Navigate to={'/result'} replace= 'true'></Navigate>
  }

  return (
   <>
     <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

         {/* display questions */}
         <Questions onChecked= {onChecked}/>

        <div className='grid'>
          { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
          <button className='btn next' onClick={onNext}>Next</button>
        </div>
       </div>
   </>
  )
}
